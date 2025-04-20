import { Router } from 'express';
import { processReceipt, getPoints } from '@/controllers/receiptController';
import { ReceiptSchema } from '@/validation/receiptSchema';
import { validate } from '@/validation/validationMiddleware';

const router = Router();

// POST /receipts/process
router.post('/process', validate(ReceiptSchema), processReceipt);

//GET /receipt/:id/points
router.get('/:id/points', getPoints);

export default router;