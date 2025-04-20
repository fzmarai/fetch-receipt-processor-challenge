import { Request, Response } from "express";
import * as receiptService from '../services/receiptService';

export const processReceipt = async (req: Request, res: Response) => {
    try {
        const id = await receiptService.processReceipt(req.body);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Error in processReceipt controller:', error);
        res.status(500).json({ error: 'Failed to process receipt'});
    }
};

export const getPoints = async (req: Request,  res: Response) => {
    try {
        const { id } = req.params;
        const points = await receiptService.getPoints(id);
        res.json({ points });
    } catch (error) {
        console.error('Error in getPoints controller: ', error);
        if (error instanceof Error && error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error'});
    }
};