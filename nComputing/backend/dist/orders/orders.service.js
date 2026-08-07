"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const prisma_1 = require("../config/prisma");
const client_1 = require("@prisma/client");
class OrdersService {
    static async createOrder(data) {
        return prisma_1.prisma.order.create({
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
                paymentStatus: client_1.PaymentStatus.PENDING,
                orderStatus: client_1.OrderStatus.PENDING
            }
        });
    }
    static async getAllOrders() {
        return prisma_1.prisma.order.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    static async updateOrderStatus(id, status) {
        const validStatuses = Object.values(client_1.OrderStatus);
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid order status. Must be one of: ${validStatuses.join(', ')}`);
        }
        return prisma_1.prisma.order.update({
            where: { id },
            data: { orderStatus: status }
        });
    }
    static async getOrderById(id) {
        return prisma_1.prisma.order.findUnique({
            where: { id }
        });
    }
}
exports.OrdersService = OrdersService;
