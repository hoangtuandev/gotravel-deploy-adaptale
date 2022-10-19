import { AdminModel } from '../models/AdminModel.js';

export const getAllAdmin = async (req, res) => {
    try {
        const adminList = await AdminModel.find();
        res.status(200).json(adminList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const newAdmin = req.body;
        const result = new AdminModel(newAdmin);
        await result.save();

        res.status(200).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const idAdmin = req.body.idAdmin;
        const result = await AdminModel.find({
            qtv_ma: idAdmin,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const profile = req.body;

        await AdminModel.updateOne(
            {
                qtv_ma: profile.qtv_ma,
            },
            {
                qtv_hoten: profile.qtv_hoten,
                qtv_namsinh: profile.qtv_namsinh,
                qtv_gioitinh: profile.qtv_gioitinh,
                qtv_sodienthoai: profile.qtv_sodienthoai,
                qtv_email: profile.qtv_email,
                qtv_diachi: profile.qtv_diachi,
            }
        );

        const result = await AdminModel.find({ qtv_ma: profile.qtv_ma });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
