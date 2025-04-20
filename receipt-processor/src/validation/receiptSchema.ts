import { body } from 'express-validator';

export const ReceiptSchema = [
    body('retailer').isString().notEmpty().withMessage('Retailer name is required'),
    body('purchaseDate').isDate({ format: 'YYYY-MM-DD'}).withMessage('Purchase date mmust be in YYYY-MM-DD format'),
    body('purchaseTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Purchase time must be in HH:MM format'),
    body('items').isArray().notEmpty().withMessage('At least one item is required'),
    body('items.*.shortDescription').isString().notEmpty().withMessage('Item description is required'),
    body('items.*.price').matches(/^\d+\.\d{2}$/).withMessage('Price must be in format XX.XX'),
    body('total').matches(/^\d+\.\d{2}$/).withMessage('Total must be in format XX.XX')
];