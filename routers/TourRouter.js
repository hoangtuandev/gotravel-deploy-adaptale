import express from 'express';

import {
    bookingTour,
    createTour,
    deleteDepartureFromTour,
    deleteScheduleFromTour,
    filterTourByDeparture,
    filterTourByParams,
    filterTourByPrice,
    filterTourByTime,
    getAllActiveTour,
    getAllTour,
    getPreferTour,
    getStopedTour,
    getTourById,
    getTourByParamsFilter,
    getTourByTypeTourism,
    searchingTour,
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

router.post('/getTourByTypeTourism', getTourByTypeTourism);

router.get('/getPreferTour', getPreferTour);

router.post('/bookingTour', bookingTour);

router.post('/getTourByParamsFilter', getTourByParamsFilter);

router.post('/searchingTour', searchingTour);

router.post('/updateWithDeparture', updateTourWithDeparture);

router.post('/deleteDepartureFromTour', deleteDepartureFromTour);

router.post('/updateTourWithScheduleTour', updateTourWithScheduleTour);

router.post('/deleteScheduleFromTour', deleteScheduleFromTour);

router.post('/updateStopTour', updateStopTour);

router.post('/updateActiveTour', updateActiveTour);

router.post('/filterTourByParams', filterTourByParams);

router.post('/filterTourByPrice', filterTourByPrice);

router.post('/filterTourByDeparture', filterTourByDeparture);

router.post('/filterTourByTime', filterTourByTime);

// router.get('/takeThirtyNextDateDeparture', takeThirtyNextDateDeparture);

export default router;
