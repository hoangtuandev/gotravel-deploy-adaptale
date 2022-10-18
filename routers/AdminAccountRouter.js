import express from 'express';
import {
    createAccountAdmin,
    getAccountAdminByUsername,
    getActivedAccountAdmin,
    getAllAdminAccount,
    handleSignIn,
} from '../controllers/AdminAccountCtl.js';

const router = express.Router();

router.get('/getAllAdminAccount', getAllAdminAccount);

router.get('/getActivedAccountAdmin', getActivedAccountAdmin);

router.post('/SignIn', handleSignIn);

router.post('/InforAdmin', handleSignIn);

router.post('/createAccountAdmin', createAccountAdmin);

router.post('/getAccountAdminByUsername', getAccountAdminByUsername);

export default router;
