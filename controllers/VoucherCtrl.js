import { VoucherModel } from '../models/VoucherModel.js';

export const getAllVoucher = async (req, res) => {
    try {
        const result = await VoucherModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
