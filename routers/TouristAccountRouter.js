import express from 'express';
import {
    createTouristAccount,
    getAllTouristAccount,
    getTouristAccountByUsername,
} from '../controllers/TouristAccountCtl.js';

const router = express.Router();

router.get('/', getAllTouristAccount);

router.post('/TouristAccountByUserName', getTouristAccountByUsername);

router.post('/', createTouristAccount);

export default router;
