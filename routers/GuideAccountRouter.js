import express from 'express';
import {
    createAccountGuide,
    getAllGuideAccount,
    handleLogin,
    updateProfileGuideOfAccount,
} from '../controllers/GuideAccountCtrl.js';

const router = express.Router();

router.get('/', getAllGuideAccount);

router.post('/login', handleLogin);

router.post('/', createAccountGuide);

router.post('/updateProfileGuideOfAccount', updateProfileGuideOfAccount);

export default router;
