import express from 'express';

import {
    bookingTour,
    compareRevenueBookingTour,
    countAmountBooking,
    filterBookingTourByBookingDate,
    filterBookingTourByDeparture,
    filterBookingTourByParams,
    filterBookingTourByPrice,
    filterBookingTourByStatus,
    getAllBookingTour,
    getBookingTourByStatus,
    getBookingTourByTouristAccount,
    getFutureBookingTour,
    getTouristByDeparture,
    getWorkingBookingTour,
    getYearsBookingTour,
    revenueBookingByTour,
    revenueBookingByTourist,
    revenueBookingTourByMonth,
    searchingBookingByTour,
    totalRevenueBookingTour,
    totalTouristSatistic,
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

router.get('/revenueBookingByTour', revenueBookingByTour);

router.get('/revenueBookingByTourist', revenueBookingByTourist);

router.post('/searchingBookingByTour', searchingBookingByTour);

router.post('/filterBookingTourByStatus', filterBookingTourByStatus);

router.get('/compareRevenueBookingTour', compareRevenueBookingTour);

router.post('/getWorkingBookingTour', getWorkingBookingTour);

router.post('/getFutureBookingTour', getFutureBookingTour);

router.post('/getTouristByDeparture', getTouristByDeparture);

router.get('/totalTouristSatistic', totalTouristSatistic);

export default router;
