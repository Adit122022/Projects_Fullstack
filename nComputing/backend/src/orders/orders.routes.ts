import { Router } from 'express';
import { OrdersController } from './orders.controller';
import { authenticateJWT, requireAdmin } from '../middlewares/auth';

const router = Router();

// Protected admin routes
router.get('/', authenticateJWT, requireAdmin, OrdersController.list);
router.patch('/:id', authenticateJWT, requireAdmin, OrdersController.updateStatus);

export default router;
