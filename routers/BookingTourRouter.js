import express from 'express';

import { getAllBookingTour } from '../controllers/BookingTourCtrl.js';

const router = express.Router();

router.get('/', getAllBookingTour);

export default router;
