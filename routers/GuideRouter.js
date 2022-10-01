import express from 'express';
import {
    createGuide,
    getAllGuide,
    updateProfileGuide,
} from '../controllers/GuideCtrl.js';

const router = express.Router();

router.get('/', getAllGuide);

router.post('/', createGuide);

router.post('/updateProfileGuide', updateProfileGuide);

export default router;
