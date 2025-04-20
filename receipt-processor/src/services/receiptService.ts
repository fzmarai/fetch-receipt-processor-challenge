import { v4 as uuidv4 } from 'uuid'
import { Receipt } from '../types/receipt';
import { calculatePoints } from '../utils/pointCalculator';
import * as receiptModel from '../models/receiptModel';

/**
 * Process a receipt and return an ID
 */

export const processReceipt = async (receipt: Receipt): Promise<string> => {

    try {
        const id = uuidv4();
        await receiptModel.createReceipt(id, receipt);
        console.log(`Receipt with ID: ${id} processed successfully`);
        return id;
    } catch (error) {
        console.error('Error processing receipt: ', error);
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
        console.error(`Error retrieving receipt with ID: ${id}`, error);
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
        console.log(`Points calculated for receipt with ID: ${id}: ${points}`);
        return points;
    } catch (error) {
        console.error(`Error calculating points for receipt with ID: ${id}`, error);
        throw error;
    }
    
};