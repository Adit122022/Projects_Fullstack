"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leads_controller_1 = require("./leads.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Public route to capture leads
router.post('/', leads_controller_1.LeadsController.create);
// Protected admin routes
router.get('/', auth_1.authenticateJWT, auth_1.requireAdmin, leads_controller_1.LeadsController.list);
router.patch('/:id', auth_1.authenticateJWT, auth_1.requireAdmin, leads_controller_1.LeadsController.updateStatus);
exports.default = router;
