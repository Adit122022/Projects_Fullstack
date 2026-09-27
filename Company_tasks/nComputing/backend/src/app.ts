import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './auth/auth.routes';
import leadsRoutes from './leads/leads.routes';
import ordersRoutes from './orders/orders.routes';
import paymentsRoutes from './payments/payments.routes';
import { errorHandler } from './middlewares/error';

const app = express();

// Configure CORS
app.use(cors({
  origin: [env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
