"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const PORT = parseInt(env_1.env.PORT, 10) || 5000;
app_1.default.listen(PORT, '0.0.0.0', () => {
    console.log(`===================================================`);
    console.log(`  NComputing B2B Backend Server running on port ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Frontend URL config: ${env_1.env.FRONTEND_URL}`);
    console.log(`===================================================`);
});
