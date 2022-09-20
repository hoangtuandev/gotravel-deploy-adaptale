import express from 'express';
import {
    activeAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    dislikeAdvertisement,
    getActiveAdvertisement,
    getAllAdvertisement,
    getRemoveAdvertisement,
    likeAdvertisement,
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

router.post('/likeAdvertisement', likeAdvertisement);

router.post('/dislikeAdvertisement', dislikeAdvertisement);

export default router;
