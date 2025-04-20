import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

// Define a type that explicitly matches Express's expectations
type ExpressMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => void;

export const validate = (validations: ValidationChain[]): ExpressMiddleware => {
  return async (req, res, next) => {
    try {
      // Execute all validations
      await Promise.all(validations.map(validation => validation.run(req)));
      
      // Check for validation errors
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next();
        return;
      }
      
      // Return formatted validation errors
      res.status(400).json({
        errors: errors.array().map(err => ({
          field: err.type === 'field' ? err.path : err.type,
          message: err.msg
        }))
      });
    } catch (error) {
      next(error);
    }
  };
};