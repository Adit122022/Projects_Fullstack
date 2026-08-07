import { prisma } from '../config/prisma';
import { sendLeadNotificationEmail } from '../utils/email';

export class LeadsService {
  static async createLead(data: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    requiredSeats: number;
    message?: string;
  }) {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        requiredSeats: Number(data.requiredSeats),
        message: data.message || null
      }
    });

    // Send email notification to admin asynchronously (don't block the API response)
    sendLeadNotificationEmail(lead).catch((err) => {
      console.error('Error sending lead notification email:', err);
    });

    return lead;
  }

  static async getAllLeads() {
    return prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateLeadStatus(id: string, status: string) {
    // Valid statuses: NEW, CONTACTED, CLOSED
    if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
      throw new Error('Invalid lead status. Must be NEW, CONTACTED, or CLOSED.');
    }

    return prisma.lead.update({
      where: { id },
      data: { status }
    });
  }
}
