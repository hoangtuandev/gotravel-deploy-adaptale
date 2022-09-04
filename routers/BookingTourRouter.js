import express from 'express';

import {
    bookingTour,
    getAllBookingTour,
    getBookingTourByStatus,
    updateStatusBookingTour,
} from '../controllers/BookingTourCtrl.js';

const router = express.Router();

router.get('/', getAllBookingTour);

router.post('/getBookingTourByStatus', getBookingTourByStatus);

router.post('/bookingTour', bookingTour);

router.post('/updateStatusBookingTour', updateStatusBookingTour);

export default router;
