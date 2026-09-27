import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { PaymentsService } from './payments.service';
import { env } from '../config/env';

export class PaymentsController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerName, customerEmail, customerPhone, shippingAddress, companyName, quantity } = req.body;

      if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !quantity) {
        return res.status(400).json({ error: 'Missing required checkout details' });
      }

      const orderData = await PaymentsService.createRazorpayOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        companyName,
        quantity: Number(quantity),
      });

      return res.status(201).json(orderData);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Failed to create payment order' });
    }
  }

  static async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({ error: 'Missing payment signature verification details' });
      }

      const order = await PaymentsService.verifySignature({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });

      return res.status(200).json({ success: true, order });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Payment verification failed' });
    }
  }

  static async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers['x-razorpay-signature'] as string;
      
      // If signature is missing or webhook secret is not set, log and proceed with mock checks
      if (!signature) {
        console.warn('Webhook signature header missing.');
        return res.status(400).json({ error: 'Signature missing' });
      }

      // Verify webhook signature using raw body (Express must parse raw body for webhook verification)
      const shasum = crypto.createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        console.warn('Webhook signature verification failed.');
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }

      const event = req.body.event;
      console.log(`Razorpay Webhook received: ${event}`);

      if (event === 'payment.captured') {
        const paymentEntity = req.body.payload.payment.entity;
        const razorpayOrderId = paymentEntity.order_id;
        const razorpayPaymentId = paymentEntity.id;

        if (razorpayOrderId && razorpayPaymentId) {
          await PaymentsService.completeOrder(razorpayOrderId, razorpayPaymentId);
          console.log(`Webhook successfully completed order for Razorpay Order ID: ${razorpayOrderId}`);
        }
      }

      return res.status(200).json({ status: 'ok' });
    } catch (error: any) {
      console.error('Error handling webhook:', error);
      return res.status(500).json({ error: error.message || 'Webhook internal error' });
    }
  }
}
