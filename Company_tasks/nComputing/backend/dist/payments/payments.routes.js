"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const router = (0, express_1.Router)();
router.post('/create-order', payments_controller_1.PaymentsController.createOrder);
router.post('/verify', payments_controller_1.PaymentsController.verifyPayment);
router.post('/webhook', payments_controller_1.PaymentsController.handleWebhook);
exports.default = router;
