"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsController = void 0;
const zod_1 = require("zod");
const leads_service_1 = require("./leads.service");
const createLeadSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name is too short'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits'),
    organization: zod_1.z.string().min(2, 'Organization name is too short'),
    requiredSeats: zod_1.z.number().int().min(1, 'At least 1 seat is required'),
    message: zod_1.z.string().optional()
});
class LeadsController {
    static async create(req, res, next) {
        try {
            const parsedBody = createLeadSchema.parse(req.body);
            const lead = await leads_service_1.LeadsService.createLead(parsedBody);
            return res.status(201).json(lead);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ error: 'Validation failed', details: error.errors });
            }
            return res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }
    static async list(req, res, next) {
        try {
            const leads = await leads_service_1.LeadsService.getAllLeads();
            return res.status(200).json(leads);
        }
        catch (error) {
            return res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }
            const updatedLead = await leads_service_1.LeadsService.updateLeadStatus(id, status);
            return res.status(200).json(updatedLead);
        }
        catch (error) {
            return res.status(400).json({ error: error.message || 'Failed to update lead status' });
        }
    }
}
exports.LeadsController = LeadsController;
