import express from 'express';

import {
    createVehicle,
    deleteVehicle,
    getAllVehicle,
    updateVehicle,
} from '../controllers/VehicleCtrl.js';

const router = express.Router();

router.get('/', getAllVehicle);

router.post('/', createVehicle);

router.post('/delete', deleteVehicle);

router.post('/update', updateVehicle);

export default router;
