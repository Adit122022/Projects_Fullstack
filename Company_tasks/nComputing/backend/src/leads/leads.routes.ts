import { Router } from 'express';
import { LeadsController } from './leads.controller';
import { authenticateJWT, requireAdmin } from '../middlewares/auth';

const router = Router();

// Public route to capture leads
router.post('/', LeadsController.create);

// Protected admin routes
router.get('/', authenticateJWT, requireAdmin, LeadsController.list);
router.patch('/:id', authenticateJWT, requireAdmin, LeadsController.updateStatus);

export default router;
