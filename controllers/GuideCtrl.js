import { GuideModel } from '../models/GuideModel.js';

export const getAllGuide = async (req, res) => {
    try {
        const result = await GuideModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createGuide = async (req, res) => {
    try {
        const result = new GuideModel(req.body);
        await result.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfileGuide = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    hdv_hoten: profile.hdv_hoten,
                    hdv_gioitinh: profile.hdv_gioitinh,
                    hdv_namsinh: profile.hdv_namsinh,
                    hdv_quequan: profile.hdv_quequan,
                    hdv_mail: profile.hdv_mail,
                    hdv_cccd: profile.hdv_cccd,
                    hdv_sodienthoai: profile.hdv_sodienthoai,
                },
            }
        );
        const newProfile = await GuideModel.find({ _id: profile._id });
        res.status(200).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
