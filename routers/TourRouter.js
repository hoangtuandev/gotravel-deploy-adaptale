import express from 'express';

import {
    createTour,
    deleteDepartureFromTour,
    deleteScheduleFromTour,
    getAllActiveTour,
    getAllTour,
    getPreferTour,
    getStopedTour,
    getTourById,
    updateActiveTour,
    updateStopTour,
    updateTour,
    updateTourWithDeparture,
    updateTourWithScheduleTour,
} from '../controllers/TourCrtl.js';

const router = express.Router();

router.get('/', getAllTour);

router.get('/stoped', getStopedTour);

router.get('/actived', getAllActiveTour);

router.post('/', createTour);

router.post('/update', updateTour);

router.post('/getById', getTourById);

router.get('/getPreferTour', getPreferTour);

router.post('/updateWithDeparture', updateTourWithDeparture);

router.post('/deleteDepartureFromTour', deleteDepartureFromTour);

router.post('/updateTourWithScheduleTour', updateTourWithScheduleTour);

router.post('/deleteScheduleFromTour', deleteScheduleFromTour);

router.post('/updateStopTour', updateStopTour);

router.post('/updateActiveTour', updateActiveTour);

export default router;
