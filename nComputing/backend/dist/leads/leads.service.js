"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const prisma_1 = require("../config/prisma");
const email_1 = require("../utils/email");
class LeadsService {
    static async createLead(data) {
        const lead = await prisma_1.prisma.lead.create({
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
        (0, email_1.sendLeadNotificationEmail)(lead).catch((err) => {
            console.error('Error sending lead notification email:', err);
        });
        return lead;
    }
    static async getAllLeads() {
        return prisma_1.prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    static async updateLeadStatus(id, status) {
        // Valid statuses: NEW, CONTACTED, CLOSED
        if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
            throw new Error('Invalid lead status. Must be NEW, CONTACTED, or CLOSED.');
        }
        return prisma_1.prisma.lead.update({
            where: { id },
            data: { status }
        });
    }
}
exports.LeadsService = LeadsService;
