// tests/unit/services/receiptService.test.ts
import * as receiptService from '../../src/services/receiptService';
import * as receiptModel from '../../src/models/receiptModel';
import { validReceipt } from '../fixtures/receipts';

// Mock the receiptModel
jest.mock('../../src/models/receiptModel');
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid-1234')
}));

describe('Receipt Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processReceipt', () => {
    it('should process a valid receipt and return an ID', async () => {
      // Mock the createReceipt function
      (receiptModel.createReceipt as jest.Mock).mockResolvedValue(undefined);
      
      const id = await receiptService.processReceipt(validReceipt);
      
      expect(id).toBe('test-uuid-1234');
      expect(receiptModel.createReceipt).toHaveBeenCalledWith('test-uuid-1234', validReceipt);
    });

    it('should throw an error if receipt creation fails', async () => {
      // Mock the createReceipt function to throw an error
      (receiptModel.createReceipt as jest.Mock).mockRejectedValue(new Error('DB error'));
      
      await expect(receiptService.processReceipt(validReceipt)).rejects.toThrow('DB error');
    });
  });

  describe('getPoints', () => {
    it('should return points for a valid receipt ID', async () => {
      // Mock the getReceiptById function
      (receiptModel.getReceiptById as jest.Mock).mockResolvedValue(validReceipt);
      
      const points = await receiptService.getPoints('test-uuid-1234');
      
      expect(typeof points).toBe('number');
      expect(receiptModel.getReceiptById).toHaveBeenCalledWith('test-uuid-1234');
    });

    it('should throw an error if receipt not found', async () => {
      // Mock the getReceiptById function to return null
      (receiptModel.getReceiptById as jest.Mock).mockResolvedValue(null);
      
      await expect(receiptService.getPoints('invalid-id')).rejects.toThrow('not found');
    });
  });
});