import express from 'express';
import { getAllGuideCard } from '../controllers/GuideCardCtrl.js';

const router = express.Router();

router.get('/', getAllGuideCard);

export default router;
