import express from 'express';
import {
    createRatingTour,
    getAllRatingTour,
    getRatingTourByTourist,
} from '../controllers/RatingTourCtrl.js';

const router = express.Router();

router.get('/', getAllRatingTour);

router.post('/', createRatingTour);

router.post('/getRatingTourByTourist', getRatingTourByTourist);

export default router;
