// tests/unit/validationMiddleware.test.ts
import { Request, Response, NextFunction } from 'express';
import { validate } from '../../src/validation/validationMiddleware';
import { ValidationChain } from 'express-validator';

// Mock express-validator
jest.mock('express-validator', () => {
  // Mock validation chain
  const mockRunFn = jest.fn().mockResolvedValue(undefined);
  const mockValidationChain = {
    run: mockRunFn,
    notEmpty: jest.fn().mockReturnThis(),
    isString: jest.fn().mockReturnThis(),
    withMessage: jest.fn().mockReturnThis()
  };
  
  return {
    body: jest.fn().mockReturnValue(mockValidationChain),
    validationResult: jest.fn(),
    ValidationChain: jest.fn().mockImplementation(() => mockValidationChain)
  };
});

// Import after mocking
import { validationResult } from 'express-validator';

describe('Validation Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let mockSchema: ValidationChain[];

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: { retailer: 'Test Store' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    
    // Create a mock schema
    mockSchema = [{ run: jest.fn().mockResolvedValue(undefined) }] as unknown as ValidationChain[];
  });

  it('should call next() when validation passes', async () => {
    // Setup validation result to return no errors
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: () => true,
      array: () => []
    });
    
    const middleware = validate(mockSchema);
    await middleware(req as Request, res as Response, next as NextFunction);
    
    expect(mockSchema[0].run).toHaveBeenCalledWith(req);
    expect(validationResult).toHaveBeenCalledWith(req);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 400 status with errors when validation fails', async () => {
    const mockErrors = [
      { type: 'field', path: 'retailer', msg: 'Retailer is required' }
    ];
    
    // Setup validation result to return errors
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: () => false,
      array: () => mockErrors
    });
    
    const middleware = validate(mockSchema);
    await middleware(req as Request, res as Response, next as NextFunction);
    
    expect(mockSchema[0].run).toHaveBeenCalledWith(req);
    expect(validationResult).toHaveBeenCalledWith(req);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ field: 'retailer', message: 'Retailer is required' }]
    });
  });

  it('should pass error to next() when validation throws an exception', async () => {
    const testError = new Error('Test error');
    (mockSchema[0].run as jest.Mock).mockRejectedValue(testError);
    
    const middleware = validate(mockSchema);
    await middleware(req as Request, res as Response, next as NextFunction);
    
    expect(next).toHaveBeenCalledWith(testError);
  });
});