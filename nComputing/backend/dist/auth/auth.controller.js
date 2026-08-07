"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const result = await auth_service_1.AuthService.login(email, password);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error.message || 'Authentication failed' });
        }
    }
}
exports.AuthController = AuthController;
