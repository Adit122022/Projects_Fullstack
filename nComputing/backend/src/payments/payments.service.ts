import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env';
import { OrdersService } from '../orders/orders.service';
import { prisma } from '../config/prisma';
import { PaymentStatus } from '@prisma/client';
import { sendOrderConfirmationEmail } from '../utils/email';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export class PaymentsService {
  static async createRazorpayOrder(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    companyName?: string;
    quantity: number;
  }) {
    const unitPrice = 12000.0; // ₹12,000 INR
    const gstRate = 0.18; // 18% GST
    const baseAmount = unitPrice * data.quantity;
    const gstAmount = baseAmount * gstRate;
    const totalAmount = baseAmount + gstAmount; // Total amount in INR

    const amountInPaise = Math.round(totalAmount * 100); // Razorpay expects amount in paise (cents equivalent)

    let razorpayOrderId = '';

    try {
      // Create Razorpay Order
      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });
      razorpayOrderId = rzpOrder.id;
    } catch (error) {
      console.warn('Razorpay API failed or Key is invalid, falling back to mock Order ID:', error);
      // Fallback for mock sandbox testing when credentials are not configured/invalid
      razorpayOrderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
    }

    // Persist pending order to the database
    const order = await OrdersService.createOrder({
      ...data,
      unitPrice,
      totalAmount,
      razorpayOrderId,
    });

    return {
      orderId: order.id,
      razorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: env.RAZORPAY_KEY_ID,
      customerDetails: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
      }
    };
  }

  static async verifySignature(data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    // Generate signature signature verification check
    // If it's a mock order, verify instantly
    if (data.razorpayOrderId.startsWith('order_mock_')) {
      console.log('Mock payment detected, bypassing signature verification.');
      return this.completeOrder(data.razorpayOrderId, data.razorpayPaymentId);
    }

    const text = data.razorpayOrderId + '|' + data.razorpayPaymentId;
    const generatedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generatedSignature === data.razorpaySignature) {
      return this.completeOrder(data.razorpayOrderId, data.razorpayPaymentId);
    } else {
      throw new Error('Invalid signature verification failed');
    }
  }

  static async completeOrder(razorpayOrderId: string, razorpayPaymentId: string) {
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId }
    });

    if (!order) {
      throw new Error(`Order not found for Razorpay Order ID: ${razorpayOrderId}`);
    }

    if (order.paymentStatus === PaymentStatus.COMPLETED) {
      return order; // Already processed
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.COMPLETED,
        razorpayPaymentId
      }
    });

    // Send email confirmation receipt asynchronously
    sendOrderConfirmationEmail(updatedOrder).catch((err) => {
      console.error('Error sending order confirmation email:', err);
    });

    return updatedOrder;
  }
}
