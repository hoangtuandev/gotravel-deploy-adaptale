import express from 'express';
import {
    activeAdminAccount,
    createAccountAdmin,
    filterAdminAccountByPower,
    getAccountAdminByUsername,
    getActivedAccountAdmin,
    getAllAdminAccount,
    getLockedAccountAdmin,
    handleSignIn,
    lockAdminAccount,
    searchingAdminAccount,
    updateAccountAdmin,
} from '../controllers/AdminAccountCtl.js';

const router = express.Router();

router.get('/getAllAdminAccount', getAllAdminAccount);

router.get('/getActivedAccountAdmin', getActivedAccountAdmin);

router.get('/getLockedAccountAdmin', getLockedAccountAdmin);

router.post('/SignIn', handleSignIn);

router.post('/InforAdmin', handleSignIn);

router.post('/createAccountAdmin', createAccountAdmin);

router.post('/getAccountAdminByUsername', getAccountAdminByUsername);

router.post('/updateAccountAdmin', updateAccountAdmin);

router.post('/lockAdminAccount', lockAdminAccount);

router.post('/activeAdminAccount', activeAdminAccount);

router.post('/filterAdminAccountByPower', filterAdminAccountByPower);

router.post('/searchingAdminAccount', searchingAdminAccount);

export default router;
