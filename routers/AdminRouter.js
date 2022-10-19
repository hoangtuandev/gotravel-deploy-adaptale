import express from 'express';
import {
    createAdmin,
    getAdminById,
    getAllAdmin,
    updateAdmin,
} from '../controllers/AdminCtl.js';

const router = express.Router();

router.get('/', getAllAdmin);

router.post('/createAdmin', createAdmin);

router.post('/getAdminById', getAdminById);

router.post('/updateAdmin', updateAdmin);

export default router;
