import { Receipt } from "../types/receipt";
import logger from '../config/logger';

// In-memory storage
const receipts: Map<string, Receipt> = new Map();

export const getReceiptById = async (id: string): Promise<Receipt | null> => {
    const receipt = receipts.get(id) || null;
    if (receipt) {
        logger.debug(`Retrieved receipt with ID: ${id}`);
    } else {
        logger.debug(`Receipt with ID: ${id} not found`);
    }
    return receipt;
};

export const createReceipt = async (id: string, data: Receipt): Promise<Receipt> => {
    receipts.set(id, data);
    logger.debug(`Created receipt with ID: ${id}`);
    return data;
};

export const deleteReceipt = async (id: string): Promise<boolean> => {
    const result = receipts.delete(id);
    if (result) {
        logger.debug(`Deleted receipt with ID: ${id}`);
    } else {
        logger.debug(`Failed to delete receipt with ID: ${id} - not found`);
    }
    return result;
};