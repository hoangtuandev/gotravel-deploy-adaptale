import express from 'express';
import {
    createRatingTour,
    getAllRatingTour,
    getRatingTourByTourist,
    updateRatingTour,
} from '../controllers/RatingTourCtrl.js';

const router = express.Router();

router.get('/', getAllRatingTour);

router.post('/', createRatingTour);

router.post('/getRatingTourByTourist', getRatingTourByTourist);

router.post('/updateRatingTour', updateRatingTour);

export default router;
