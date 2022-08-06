import express from 'express';
import { createTourist, getAllTourist } from '../controllers/Tourist.js';

const router = express.Router();

router.get('/', getAllTourist);

router.post('/', createTourist);

export default router;
