import express from 'express';
import {
    countAmountTouristAccount,
    createTouristAccount,
    getAllTouristAccount,
    getTouristAccountByUsername,
    signInTourist,
} from '../controllers/TouristAccountCtl.js';

const router = express.Router();

router.get('/', getAllTouristAccount);

router.post('/TouristAccountByUserName', getTouristAccountByUsername);

router.post('/', createTouristAccount);

router.post('/signInTourist', signInTourist);

router.get('/countAmountTouristAccount', countAmountTouristAccount);

export default router;
