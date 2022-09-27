import express from 'express';
import { getAllGuide } from '../controllers/GuideCtrl.js';

const router = express.Router();

router.get('/', getAllGuide);

export default router;
