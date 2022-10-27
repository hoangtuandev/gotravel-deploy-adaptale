import { TouristModel } from '../models/TouristModel.js';

export const getAllTourist = async (req, res) => {
    try {
        const touristList = await TouristModel.find();
        res.status(200).json(touristList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createTourist = async (req, res) => {
    try {
        const newTourist = req.body;
        const tourist = new TouristModel(newTourist);
        await tourist.save();

        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfileTourist = async (req, res) => {
    try {
        const profile = req.body;

        await TouristModel.updateOne(
            {
                kdl_ma: profile.kdl_ma,
            },
            {
                $set: {
                    kdl_hoten: profile.kdl_hoten,
                    kdl_cccd: profile.kdl_cccd,
                    kdl_gioitinh: profile.kdl_gioitinh,
                    kdl_sodienthoai: profile.kdl_sodienthoai,
                    kdl_email: profile.kdl_email,
                    kdl_diachi: profile.kdl_diachi,
                },
            }
        );
        const result = await TouristModel.find({ kdl_ma: profile.kdl_ma });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
