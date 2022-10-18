import { AdminAccountModel } from '../models/AdminAccountModel.js';
import jwt from 'jsonwebtoken';

export const getAllAdminAccount = async (req, res) => {
    try {
        const adminAccountList = await AdminAccountModel.find();
        res.status(200).json(adminAccountList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const handleSignIn = async (req, res) => {
    try {
        const account = await AdminAccountModel.find({
            tkqtv_tendangnhap: req.body.tkqtv_tendangnhap,
        });
        if (account) {
            const payload = {
                username: account[0].tkqtv_tendangnhap,
                password: account[0].tkqtv_matkhau,
            };
            jwt.sign(
                payload,
                'Admin SignIn',
                { expiresIn: '10h' },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json(token);
                }
            );
        }
    } catch (error) {
        res.status(200).json({ error: true });
    }
};

export const getInforAdmin = async (req, res) => {
    try {
        const user = await AdminAccountModel.findById(
            req.body.tkqtv_tendangnhap
        );
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createAccountAdmin = async (req, res) => {
    try {
        const newAccount = req.body;
        const result = new AdminAccountModel(newAccount);
        await result.save();

        res.status(200).json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getActivedAccountAdmin = async (req, res) => {
    try {
        const result = await AdminAccountModel.find({ tkqtv_trangthai: 1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAccountAdminByUsername = async (req, res) => {
    try {
        const username = req.body.username;
        const result = await AdminAccountModel.find({
            tkqtv_tendangnhap: username,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
