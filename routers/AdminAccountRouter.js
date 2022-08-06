import express from 'express';
import {
    getAllAdminAccount,
    handleSignIn,
} from '../controllers/AdminAccountCtl.js';

const router = express.Router();

router.get('/', getAllAdminAccount);

router.post('/SignIn', handleSignIn);

router.post('/InforAdmin', handleSignIn);

export default router;
