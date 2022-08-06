import express from 'express';

import {
    createTour,
    getAllTour,
    getTourById,
    updateTour,
    updateTourWithDeparture,
} from '../controllers/TourCrtl.js';

const router = express.Router();

router.get('/', getAllTour);

router.post('/', createTour);

router.post('/update', updateTour);

router.post('/getById', getTourById);

router.post('/updateWithDeparture', updateTourWithDeparture);

export default router;
