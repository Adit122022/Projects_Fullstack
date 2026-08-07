"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const leads_routes_1 = __importDefault(require("./leads/leads.routes"));
const orders_routes_1 = __importDefault(require("./orders/orders.routes"));
const payments_routes_1 = __importDefault(require("./payments/payments.routes"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
// Configure CORS
app.use((0, cors_1.default)({
    origin: [env_1.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Parse request bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});
// Mount routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/leads', leads_routes_1.default);
app.use('/api/orders', orders_routes_1.default);
app.use('/api/payments', payments_routes_1.default);
// Global Error Handler
app.use(error_1.errorHandler);
exports.default = app;
