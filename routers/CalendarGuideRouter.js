import express from 'express';
import {
    getCalendarGuide,
    addCalendarGuide,
    registerCalendarGuideTour,
    cancelCalendarGuideTour,
    getCalendarGuideByAccount,
    getAvairiableCalendarGuide,
} from '../controllers/CalendarGuideCtrl.js';

const router = express.Router();

router.get('/', getCalendarGuide);

router.post('/', addCalendarGuide);

router.post('/registerCalendarGuideTour', registerCalendarGuideTour);

router.post('/cancelCalendarGuideTour', cancelCalendarGuideTour);

router.post('/getCalendarGuideByAccount', getCalendarGuideByAccount);

router.get('/getAvairiableCalendarGuide', getAvairiableCalendarGuide);

export default router;
