import { type Response } from 'express';
import { recordSchema } from '../utils/validation.js';
import { type AuthRequest } from '../middlewares/auth.middleware.js';
import * as recordService from '../services/record.service.js';

export const createRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const parsedData = recordSchema.parse(req.body);
        const record = await recordService.createFinancialRecord(parsedData, req.user!.id);
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input data' });
    }
};

export const getRecords = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { type, category } = req.query;

        const filter: any = {};
        if (type) filter.type = String(type);
        if (category) filter.category = String(category);

        const records = await recordService.getFinancialRecords(filter);
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
};

export const getRecordById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        const record = await recordService.getFinancialRecordById(id);

        if (!record) {
            res.status(404).json({ error: 'Record not found' });
            return;
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch record' });
    }
};

export const updateRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        const parsedData = recordSchema.partial().parse(req.body);
        const record = await recordService.updateFinancialRecord(id, parsedData);
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input data or record not found' });
    }
};

export const deleteRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        await recordService.deleteFinancialRecord(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Record not found or failed to delete' });
    }
};