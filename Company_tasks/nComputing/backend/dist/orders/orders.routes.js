"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Protected admin routes
router.get('/', auth_1.authenticateJWT, auth_1.requireAdmin, orders_controller_1.OrdersController.list);
router.patch('/:id', auth_1.authenticateJWT, auth_1.requireAdmin, orders_controller_1.OrdersController.updateStatus);
exports.default = router;
