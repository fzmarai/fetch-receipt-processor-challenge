import { v4 as uuidv4 } from 'uuid'
import { Receipt } from '../types/receipt';
import { calculatePoints } from '../utils/pointCalculator';
import * as receiptModel from '../models/receiptModel';
import logger from '../config/logger';

/**
 * Process a receipt and return an ID
 */

export const processReceipt = async (receipt: Receipt): Promise<string> => {

    try {
        const id = uuidv4();
        await receiptModel.createReceipt(id, receipt);
        logger.info(`Receipt with ID: ${id} processed successfully`);
        return id;
    } catch (error) {
        logger.error('Error processing receipt: ', error);
        throw error;
    }
    
};


/**
 * Get a receipt by ID
 */

export const getReceipt = async (id: string): Promise<Receipt | null> => {
    try {
        const receipt = await receiptModel.getReceiptById(id);
        if (!receipt) {
            throw new Error(`Receipt with ID: ${id} not found`);
        }
        return receipt;
    } catch (error) {
        logger.error(`Error retrieving receipt with ID: ${id}`, error);
        throw error;
    }
    
};

/**
 * Get points for a receipt by ID
 */
export const getPoints = async (id: string): Promise<number> => {
    try {
        const receipt = await getReceipt(id);
        if (!receipt) {
            throw new Error(`Receipt with ID: ${id} not found`);
        }
        const points = calculatePoints(receipt);
        logger.info(`Points calculated for receipt with ID: ${id}: ${points}`);
        return points;
    } catch (error) {
        logger.error(`Error calculating points for receipt with ID: ${id}`, error);
        throw error;
    }
    
};