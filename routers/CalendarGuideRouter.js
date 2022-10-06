import express from 'express';
import {
    getCalendarGuide,
    addCalendarGuide,
} from '../controllers/CalendarGuideCtrl.js';

const router = express.Router();

router.get('/', getCalendarGuide);

router.post('/', addCalendarGuide);

export default router;
