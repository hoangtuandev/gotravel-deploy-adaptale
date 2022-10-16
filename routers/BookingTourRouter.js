import express from 'express';

import {
    bookingTour,
    countAmountBooking,
    filterBookingTourByBookingDate,
    filterBookingTourByDeparture,
    filterBookingTourByParams,
    filterBookingTourByPrice,
    getAllBookingTour,
    getBookingTourByStatus,
    getBookingTourByTouristAccount,
    getYearsBookingTour,
    revenueBookingTourByMonth,
    totalRevenueBookingTour,
    updateBookingTourFinish,
    updateBookingTourWorking,
    updateStatusBookingTour,
} from '../controllers/BookingTourCtrl.js';

const router = express.Router();

router.get('/', getAllBookingTour);

router.post('/updateBookingTourWorking', updateBookingTourWorking);

router.post('/updateBookingTourFinish', updateBookingTourFinish);

router.post('/getBookingTourByStatus', getBookingTourByStatus);

router.post('/getBookingTourByTouristAccount', getBookingTourByTouristAccount);

router.post('/bookingTour', bookingTour);

router.post('/updateStatusBookingTour', updateStatusBookingTour);

router.post('/filterBookingTourByParams', filterBookingTourByParams);

router.post('/filterBookingTourByPrice', filterBookingTourByPrice);

router.post('/filterBookingTourByDeparture', filterBookingTourByDeparture);

router.post('/filterBookingTourByBookingDate', filterBookingTourByBookingDate);

router.get('/countAmountBooking', countAmountBooking);

router.get('/totalRevenueBookingTour', totalRevenueBookingTour);

router.post('/revenueBookingTourByMonth', revenueBookingTourByMonth);

router.get('/getYearsBookingTour', getYearsBookingTour);

export default router;
