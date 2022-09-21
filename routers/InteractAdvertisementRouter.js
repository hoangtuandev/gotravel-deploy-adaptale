import express from 'express';
import {
    createInteractAdvertisement,
    deleteInteractAdvertisement,
    getAllInteractAdvertisement,
    getInteractAdvertisementByAccount,
    getInteractAdvertisementByParams,
    updateLikeInteractAdvertisement,
    updateSaveInteractAdvertisement,
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

router.post('/deleteInteractAdvertisement', deleteInteractAdvertisement);

router.post(
    '/updateSaveInteractAdvertisement',
    updateSaveInteractAdvertisement
);

export default router;
