import express from 'express';
import {
    createAdmin,
    getAdminById,
    getAllAdmin,
} from '../controllers/AdminCtl.js';

const router = express.Router();

router.get('/', getAllAdmin);

router.post('/createAdmin', createAdmin);

router.post('/getAdminById', getAdminById);

export default router;
