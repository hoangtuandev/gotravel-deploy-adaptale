import express from 'express';
import { getAllVoucher } from '../controllers/VoucherCtrl.js';

const router = express.Router();

router.get('/', getAllVoucher);

export default router;
