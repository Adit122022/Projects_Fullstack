import { Request, Response, NextFunction } from 'express';
import { OrdersService } from './orders.service';

export class OrdersController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrdersService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const updatedOrder = await OrdersService.updateOrderStatus(id, status);
      return res.status(200).json(updatedOrder);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Failed to update order status' });
    }
  }
}
