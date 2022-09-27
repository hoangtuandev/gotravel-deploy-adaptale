import express from 'express';
import {
    getAllGuideAccount,
    handleLogin,
} from '../controllers/GuideAccountCtrl.js';

const router = express.Router();

router.get('/', getAllGuideAccount);

router.post('/login', handleLogin);

export default router;
