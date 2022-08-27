import express from 'express';
import {
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

export default router;
