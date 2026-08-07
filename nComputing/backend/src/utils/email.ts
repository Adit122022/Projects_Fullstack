import { Resend } from 'resend';
import { env } from '../config/env';

// If API key is a mock or doesn't exist, we run in console fallback mode
const isMockKey = !env.RESEND_API_KEY || env.RESEND_API_KEY.startsWith('re_mock');
const resend = isMockKey ? null : new Resend(env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order: {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  companyName: string | null;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus: string;
}) {
  const subject = `Order Confirmed - NComputing RX420 Thin Client (Order #${order.id})`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Order Confirmation</h2>
      <p>Dear <strong>${order.customerName}</strong>,</p>
      <p>Thank you for choosing NComputing India. Your payment of <strong>₹${order.totalAmount.toLocaleString('en-IN')}</strong> has been successfully processed, and your order is now confirmed.</p>
      
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1e293b;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #475569;">Order ID:</td>
            <td style="padding: 6px 0; font-weight: bold;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Product:</td>
            <td style="padding: 6px 0;">NComputing RX420 Thin Client</td>
          </tr>
          ${order.companyName ? `
          <tr>
            <td style="padding: 6px 0; color: #475569;">Company Name:</td>
            <td style="padding: 6px 0;">${order.companyName}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 6px 0; color: #475569;">Quantity:</td>
            <td style="padding: 6px 0;">${order.quantity} units</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Unit Price:</td>
            <td style="padding: 6px 0;">₹${order.unitPrice.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569; font-weight: bold;">Total Amount (incl. 18% GST):</td>
            <td style="padding: 6px 0; font-weight: bold; color: #10b981;">₹${order.totalAmount.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Payment Status:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #10b981;">${order.paymentStatus}</td>
          </tr>
        </table>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Shipping & Contact Details</h3>
        <p style="margin: 4px 0;"><strong>Address:</strong> ${order.shippingAddress}</p>
        <p style="margin: 4px 0;"><strong>Phone:</strong> ${order.customerPhone}</p>
      </div>

      <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
        For any support, please reach out to us at sales@ncomputing.in or reply directly to this email.
      </p>
      <p style="color: #64748b; font-size: 14px;">Best regards,<br><strong>NComputing India Team</strong></p>
    </div>
  `;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'NComputing India <orders@resend.dev>', // If using custom domain, update here. Else resend.dev fallback is used
        to: order.customerEmail,
        subject,
        html,
      });
      console.log(`Order confirmation email sent to ${order.customerEmail}`);
    } catch (error) {
      console.error('Failed to send order email via Resend:', error);
    }
  } else {
    console.log('\n--- EMAIL MOCK LOG (Resend Key Missing/Mock) ---');
    console.log(`To: ${order.customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Body Snippet:\n${html.substring(0, 500)}...\n-------------------------------------------------\n`);
  }
}

export async function sendLeadNotificationEmail(lead: {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  requiredSeats: number;
  message: string | null;
}) {
  const subject = `New B2B Demo Request - ${lead.organization} (${lead.requiredSeats} Seats)`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Demo Lead Captured</h2>
      <p>A new lead has requested a bulk demo of the NComputing RX420 Thin Client.</p>
      
      <div style="background-color: #fffbeb; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #fef3c7;">
        <h3 style="margin-top: 0; color: #b45309;">Lead details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #475569; width: 40%;">Name:</td>
            <td style="padding: 6px 0; font-weight: bold;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Phone:</td>
            <td style="padding: 6px 0;">${lead.phone}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Organization:</td>
            <td style="padding: 6px 0; font-weight: bold;">${lead.organization}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Required Seats:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #b45309;">${lead.requiredSeats} seats</td>
          </tr>
          ${lead.message ? `
          <tr>
            <td style="padding: 6px 0; color: #475569; vertical-align: top;">Message:</td>
            <td style="padding: 6px 0; font-style: italic;">"${lead.message}"</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <p><a href="${env.FRONTEND_URL}/admin" style="background-color: #3b82f6; color: white; padding: 10px 18px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">View in Admin Dashboard</a></p>
    </div>
  `;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'NComputing Leads <leads@resend.dev>',
        to: env.ADMIN_EMAIL,
        subject,
        html,
      });
      console.log(`Admin lead notification email sent to ${env.ADMIN_EMAIL}`);
    } catch (error) {
      console.error('Failed to send lead email via Resend:', error);
    }
  } else {
    console.log('\n--- EMAIL MOCK LOG (Resend Key Missing/Mock) ---');
    console.log(`To Admin: ${env.ADMIN_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Body Snippet:\n${html.substring(0, 500)}...\n-------------------------------------------------\n`);
  }
}
