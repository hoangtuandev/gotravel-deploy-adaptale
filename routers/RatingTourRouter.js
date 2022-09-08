import express from 'express';
import {
    createRatingTour,
    getAllRatingTour,
} from '../controllers/RatingTourCtrl.js';

const router = express.Router();

router.get('/', getAllRatingTour);

router.post('/', createRatingTour);

export default router;
