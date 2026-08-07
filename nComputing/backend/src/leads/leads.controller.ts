import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { LeadsService } from './leads.service';

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organization: z.string().min(2, 'Organization name is too short'),
  requiredSeats: z.number().int().min(1, 'At least 1 seat is required'),
  message: z.string().optional()
});

export class LeadsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedBody = createLeadSchema.parse(req.body);
      const lead = await LeadsService.createLead(parsedBody);
      return res.status(201).json(lead);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation failed', details: error.errors });
      }
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const leads = await LeadsService.getAllLeads();
      return res.status(200).json(leads);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const updatedLead = await LeadsService.updateLeadStatus(id, status);
      return res.status(200).json(updatedLead);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Failed to update lead status' });
    }
  }
}
