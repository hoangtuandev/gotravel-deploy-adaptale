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

export const getLockedAccountAdmin = async (req, res) => {
    try {
        const result = await AdminAccountModel.find({ tkqtv_trangthai: 0 });
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

export const updateAccountAdmin = async (req, res) => {
    try {
        const profile = req.body;
        const result = await AdminAccountModel.updateOne(
            {
                tkqtv_tendangnhap: profile.tkqtv_tendangnhap,
            },
            {
                $set: {
                    tkqtv_anhdaidien: profile.tkqtv_anhdaidien,
                    tkqtv_nhanvien: profile.tkqtv_nhanvien,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const lockAdminAccount = async (req, res) => {
    try {
        const username = req.body.username;
        const result = await AdminAccountModel.updateOne(
            {
                tkqtv_tendangnhap: username,
            },
            {
                $set: {
                    tkqtv_trangthai: 0,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const activeAdminAccount = async (req, res) => {
    try {
        const username = req.body.username;
        const result = await AdminAccountModel.updateOne(
            {
                tkqtv_tendangnhap: username,
            },
            {
                $set: {
                    tkqtv_trangthai: 1,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterAdminAccountByPower = async (req, res) => {
    try {
        const power = req.body.power;
        const accounts = await AdminAccountModel.find({ tkqtv_trangthai: 1 });

        const result = accounts.filter(
            (account) => account.tkqtv_nhanvien.qtv_chucvu === power
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const searchingAdminAccount = async (req, res) => {
    try {
        const key = req.body.keySearch;

        function removeVietnameseTones(str) {
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
            str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
            str = str.replace(/??|??|???|???|??/g, 'i');
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
            str = str.replace(/???|??|???|???|???/g, 'y');
            str = str.replace(/??/g, 'd');
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
            str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
            str = str.replace(/??|??|???|???|??/g, 'I');
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
            str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
            str = str.replace(/???|??|???|???|???/g, 'Y');
            str = str.replace(/??/g, 'D');

            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
            str = str.replace(/\u02C6|\u0306|\u031B/g, '');
            str = str.replace(/ + /g, ' ');
            str = str.trim();

            str = str.replace(
                /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                ' '
            );
            return str;
        }
        const adminAccounts = await AdminAccountModel.find({
            tkqtv_trangthai: 1,
        });
        const convertKey = removeVietnameseTones(key).toLowerCase();

        const fillterAdminAccount = (account) => {
            return removeVietnameseTones(account.tkqtv_nhanvien.qtv_hoten)
                .toLowerCase()
                .includes(convertKey.toLowerCase());
        };

        const result = adminAccounts.filter(fillterAdminAccount);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updatePositionAdmin = async (req, res) => {
    try {
        const profile = req.body;
        const result = await AdminAccountModel.updateOne(
            {
                tkqtv_tendangnhap: profile.tkqtv_tendangnhap,
            },
            {
                $set: {
                    tkqtv_nhanvien: profile.tkqtv_nhanvien,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
