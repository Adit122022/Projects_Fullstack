import { prisma } from '../config/prisma';
import { OrderStatus, PaymentStatus } from '@prisma/client';

export class OrdersService {
  static async createOrder(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    companyName?: string;
    quantity: number;
    unitPrice?: number;
    totalAmount: number;
    razorpayOrderId?: string;
  }) {
    return prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        companyName: data.companyName || null,
        quantity: data.quantity,
        unitPrice: data.unitPrice || 12000.0,
        totalAmount: data.totalAmount,
        razorpayOrderId: data.razorpayOrderId || null,
        paymentStatus: PaymentStatus.PENDING,
        orderStatus: OrderStatus.PENDING
      }
    });
  }

  static async getAllOrders() {
    return prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateOrderStatus(id: string, status: string) {
    const validStatuses = Object.values(OrderStatus);
    if (!validStatuses.includes(status as any)) {
      throw new Error(`Invalid order status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return prisma.order.update({
      where: { id },
      data: { orderStatus: status as OrderStatus }
    });
  }

  static async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id }
    });
  }
}
