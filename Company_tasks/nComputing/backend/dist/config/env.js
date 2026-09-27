"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.env = {
    PORT: process.env.PORT || '5000',
    DATABASE_URL: process.env.DATABASE_URL || '',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkeyid123',
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mocksecret123',
    RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || 'whsec_mockwebhooksecret123',
    RESEND_API_KEY: process.env.RESEND_API_KEY || 're_mockresendkey123',
    JWT_SECRET: process.env.JWT_SECRET || 'ncomputing_super_secret_jwt_key_123',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@ncomputing.in'
};
