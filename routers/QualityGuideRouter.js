import express from 'express';
import {
    addQualityGuide,
    getAllQualityGuide,
    updateStartGuide,
} from '../controllers/QualityGuideCtrl.js';

const router = express.Router();

router.get('/', getAllQualityGuide);

router.post('/', addQualityGuide);

router.post('/updateStartGuide', updateStartGuide);

export default router;
