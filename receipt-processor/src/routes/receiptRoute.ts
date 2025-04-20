import { Router, RequestHandler } from 'express';
import { processReceipt, getPoints } from '../controllers/receiptController';
import { ReceiptSchema } from '../validation/receiptSchema';
import { validate } from '../validation/validationMiddleware';

const router = Router();

// POST /receipts/process
router.post('/process', validate(ReceiptSchema), processReceipt as RequestHandler);

//GET /receipt/:id/points
router.get('/:id/points', getPoints as RequestHandler);

export default router;