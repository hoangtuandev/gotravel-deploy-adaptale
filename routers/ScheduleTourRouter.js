import express from 'express';
import {
    createScheduleTour,
    deleteScheduleTour,
    getAllScheduleTour,
} from '../controllers/ScheduleTourCtrl.js';

const router = express.Router();

router.get('/', getAllScheduleTour);

router.post('/', createScheduleTour);

router.post('/deleteScheduleTour', deleteScheduleTour);

export default router;
