import express from 'express';
import {
    createRatingGuide,
    getAllRatingGuide,
} from '../controllers/RatingGuideCtrl.js';

const router = express.Router();

router.get('/', getAllRatingGuide);

router.post('/createRatingGuide', createRatingGuide);

export default router;
