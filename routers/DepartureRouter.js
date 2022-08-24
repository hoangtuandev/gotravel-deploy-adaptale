import express from 'express';
import {
    createDeparture,
    deleteDeparture,
    getAllDeparture,
    getDepartureById,
} from '../controllers/DepartureCtrl.js';

const router = express.Router();

router.get('/', getAllDeparture);

router.post('/getDepartureById', getDepartureById);

router.post('/', createDeparture);

router.post('/deleteDeparture', deleteDeparture);

export default router;
