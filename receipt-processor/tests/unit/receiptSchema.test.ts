// tests/unit/receiptSchema.test.ts
import { ReceiptSchema } from '../../src/validation/receiptSchema';
import { validationResult } from 'express-validator';

// No need to mock express-validator - use it directly

describe('Receipt Schema', () => {
  // Create a lightweight request mock that works with express-validator
  const createMockRequest = (body: Record<string, unknown>) => {
    return {
      body,
      cookies: {},
      params: {},
      query: {},
    };
  };

  // Run all validators on a request
  const runValidation = async (body: Record<string, unknown>) => {
    const req = createMockRequest(body);
    
    // Run each validation chain
    for (const validator of ReceiptSchema) {
      await validator.run(req);
    }
    
    // Check validation results
    return validationResult(req);
  };

  it('should accept valid receipt data', async () => {
    const validReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [
        {
          shortDescription: "Mountain Dew 12PK",
          price: "6.49"
        }
      ],
      total: "6.49"
    };
    
    const result = await runValidation(validReceipt);
    expect(result.isEmpty()).toBe(true);
  });

  it('should reject missing retailer', async () => {
    const invalidReceipt = {
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [{ shortDescription: "Item", price: "5.00" }],
      total: "5.00"
    };
    
    const result = await runValidation(invalidReceipt);
    expect(result.isEmpty()).toBe(false);
    
    const errors = result.array();
    const retailerError = errors.find(err => err.type === 'field' && err.path === 'retailer');
    expect(retailerError).toBeDefined();
  });

  it('should reject invalid date format', async () => {
    const invalidReceipt = {
      retailer: "Target",
      purchaseDate: "01/01/2022", // Wrong format
      purchaseTime: "13:01",
      items: [{ shortDescription: "Item", price: "5.00" }],
      total: "5.00"
    };
    
    const result = await runValidation(invalidReceipt);
    expect(result.isEmpty()).toBe(false);
    
    const errors = result.array();
    const dateError = errors.find(err => err.type === 'field' && err.path === 'purchaseDate');
    expect(dateError).toBeDefined();
  });
});
