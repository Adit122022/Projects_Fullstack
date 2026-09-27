"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const env_1 = require("../config/env");
class AuthService {
    static async login(email, passwordPlain) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(passwordPlain, user.passwordHash);
        if (!isPasswordMatch) {
            throw new Error('Invalid email or password');
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, env_1.env.JWT_SECRET, { expiresIn: '7d' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };
    }
}
exports.AuthService = AuthService;
