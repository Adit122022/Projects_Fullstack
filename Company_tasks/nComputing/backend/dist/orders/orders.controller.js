"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const orders_service_1 = require("./orders.service");
class OrdersController {
    static async list(req, res, next) {
        try {
            const orders = await orders_service_1.OrdersService.getAllOrders();
            return res.status(200).json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }
            const updatedOrder = await orders_service_1.OrdersService.updateOrderStatus(id, status);
            return res.status(200).json(updatedOrder);
        }
        catch (error) {
            return res.status(400).json({ error: error.message || 'Failed to update order status' });
        }
    }
}
exports.OrdersController = OrdersController;
