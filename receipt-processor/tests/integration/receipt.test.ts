// tests/integration/routes/receipt.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import * as receiptModel from '../../src/models/receiptModel';
import { validReceipt } from '../fixtures/receipts';

// Mock the model to avoid actual data persistence
jest.mock('../../src/models/receiptModel');

describe('Receipt API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /receipts/process', () => {
    it('should process a valid receipt and return an ID', async () => {
      // Mock the createReceipt function
      (receiptModel.createReceipt as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app)
        .post('/receipts/process')
        .send(validReceipt);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(typeof res.body.id).toBe('string');
    });

    it('should return 400 for invalid receipt data', async () => {
      const res = await request(app)
        .post('/receipts/process')
        .send({
          // Missing required fields
          retailer: 'Target'
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /receipts/:id/points', () => {
    it('should return points for a valid receipt ID', async () => {
      // Mock getReceiptById to return a receipt
      (receiptModel.getReceiptById as jest.Mock).mockResolvedValue(validReceipt);

      const res = await request(app)
        .get('/receipts/test-uuid/points');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('points');
      expect(typeof res.body.points).toBe('number');
    });

    it('should return 404 for non-existent receipt ID', async () => {
      // Mock getReceiptById to return null
      (receiptModel.getReceiptById as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .get('/receipts/non-existent-id/points');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});