import express from 'express';
import { getAllAdmin } from '../controllers/AdminCtl.js';

const router = express.Router();

router.get('/', getAllAdmin);

export default router;
