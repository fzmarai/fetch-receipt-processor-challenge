import { Receipt } from "../types/receipt";

// In-memory storage
const receipts: Map<string, Receipt> = new Map();

export const getReceiptById = async (id: string): Promise<Receipt | null> => {
    return receipts.get(id) || null;
};

export const createReceipt = async (id: string, data: Receipt): Promise<Receipt> => {
    receipts.set(id, data);
    return data;
};

export const deleteReceipt = async (id: string): Promise<boolean> => {
    return receipts.delete(id);
};