import { type Response } from 'express';
import { type AuthRequest } from '../middlewares/auth.middleware.js';
import * as dashboardService from '../services/dashboard.service.js';

export const getDashboardSummary = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const summary = await dashboardService.getSummaryData();
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
};