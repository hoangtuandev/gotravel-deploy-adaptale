import { AdminModel } from '../models/AdminModel.js';

export const getAllAdmin = async (req, res) => {
    try {
        const adminList = await AdminModel.find();
        res.status(200).json(adminList);
    } catch (error) {
        res.status(200).json({ error: error });
    }
};
