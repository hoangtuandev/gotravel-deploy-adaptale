import express from 'express';
import {
    getAllTypeTourism,
    createTypeTourism,
    deleteTypeTourism,
    updateTypeTourism,
    getTypeTourismById,
} from '../controllers/TypeTourismCtl.js';

const router = express.Router();

router.get('/', getAllTypeTourism);

router.post('/', createTypeTourism);

router.post('/getById', getTypeTourismById);

router.post('/Delete', deleteTypeTourism);

router.post('/Update', updateTypeTourism);

export default router;
