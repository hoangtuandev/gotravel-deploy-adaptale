import express from 'express';
import {
    activeAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    getActiveAdvertisement,
    getAllAdvertisement,
    getRemoveAdvertisement,
    removeAdvertisement,
    updateAdvertisement,
} from '../controllers/AdvertisementCtrl.js';

const router = express.Router();

router.get('/', getAllAdvertisement);

router.post('/', createAdvertisement);

router.post('/getActiveAdvertisement', getActiveAdvertisement);

router.post('/getRemoveAdvertisement', getRemoveAdvertisement);

router.post('/updateAdvertisement', updateAdvertisement);

router.post('/removeAdvertisement', removeAdvertisement);

router.post('/activeAdvertisement', activeAdvertisement);

router.post('/deleteAdvertisement', deleteAdvertisement);

export default router;
