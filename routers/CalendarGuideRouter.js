import express from 'express';
import {
    getCalendarGuide,
    addCalendarGuide,
    registerCalendarGuideTour,
    cancelCalendarGuideTour,
    getCalendarGuideByAccount,
    getAvairiableCalendarGuide,
    getCalendarGuideByDeparture,
    getGuideTimesByAccount,
    getStatusCurrentOfGuide,
} from '../controllers/CalendarGuideCtrl.js';

const router = express.Router();

router.get('/', getCalendarGuide);

router.post('/', addCalendarGuide);

router.post('/registerCalendarGuideTour', registerCalendarGuideTour);

router.post('/cancelCalendarGuideTour', cancelCalendarGuideTour);

router.post('/getCalendarGuideByAccount', getCalendarGuideByAccount);

router.get('/getAvairiableCalendarGuide', getAvairiableCalendarGuide);

router.post('/getCalendarGuideByDeparture', getCalendarGuideByDeparture);

router.post('/getGuideTimesByAccount', getGuideTimesByAccount);

router.post('/getStatusCurrentOfGuide', getStatusCurrentOfGuide);

export default router;
