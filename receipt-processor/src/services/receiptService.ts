import { v4 as uuidv4 } from 'uuid'
import { Receipt } from '@/types/receipt';
import { calculatePoints } from '@/utils/pointCalculator';
import * as receiptModel from '@/models/receiptModel';

/**
 * Process a receipt and return an ID
 */

export const processReceipt = async (receipt: Receipt): Promise<string> => {
    const id = uuidv4();
    await receiptModel.createReceipt(id, receipt);
    return id;
}


/**
 * Get a receipt by ID
 */

export const getReceipt = async (id: string): Promise<Receipt | null> => {
    return await receiptModel.getReceiptById(id);
}

/**
 * Get points for a receipt by ID
 */
export const getPoints = async (id: string): Promise<number> => {
    const receipt = await getReceipt(id);
    if (!receipt) {
        throw new Error(`Receipt with ID ${id} not found`);
    }
    return calculatePoints(receipt);
}