import express from 'express';
import {
    createAdvertisement,
    getActiveAdvertisement,
    getAllAdvertisement,
    updateAdvertisement,
} from '../controllers/AdvertisementCtrl.js';

const router = express.Router();

router.get('/', getAllAdvertisement);

router.post('/', createAdvertisement);

router.post('/getActiveAdvertisement', getActiveAdvertisement);

router.post('/updateAdvertisement', updateAdvertisement);

export default router;
