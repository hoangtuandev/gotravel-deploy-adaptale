import express from 'express';
import {
    createRatingGuide,
    getAllRatingGuide,
    getRatingGuideByBooking,
    getRatingGuideByGuideAccount,
    updateRatingGuide,
} from '../controllers/RatingGuideCtrl.js';

const router = express.Router();

router.get('/', getAllRatingGuide);

router.post('/createRatingGuide', createRatingGuide);

router.post('/getRatingGuideByBooking', getRatingGuideByBooking);

router.post('/getRatingGuideByGuideAccount', getRatingGuideByGuideAccount);

router.post('/updateRatingGuide', updateRatingGuide);

export default router;
