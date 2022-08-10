import express from 'express';
import {
    addCalendarGuide,
    getCalendarGuide,
} from '../controllers/CalendarGuideCtrl.js';

const router = express.Router();

router.get('/', getCalendarGuide);

router.post('/', addCalendarGuide);

export default router;
