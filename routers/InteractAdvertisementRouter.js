import express from 'express';
import {
    createInteractAdvertisement,
    getAllInteractAdvertisement,
    getInteractAdvertisementByAccount,
    getInteractAdvertisementByParams,
    updateLikeInteractAdvertisement,
} from '../controllers/InteractAdvertisementCtrl.js';

const router = express.Router();

router.get('/', getAllInteractAdvertisement);

router.post(
    '/getInteractAdvertisementByAccount',
    getInteractAdvertisementByAccount
);

router.post(
    '/getInteractAdvertisementByParams',
    getInteractAdvertisementByParams
);

router.post('/createInteractAdvertisement', createInteractAdvertisement);

router.post(
    '/updateLikeInteractAdvertisement',
    updateLikeInteractAdvertisement
);

export default router;
