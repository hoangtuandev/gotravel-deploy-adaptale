import express from 'express';
import {
    createDeparture,
    getAllDeparture,
} from '../controllers/DepartureCtrl.js';

const router = express.Router();

router.get('/', getAllDeparture);

router.post('/', createDeparture);

export default router;
