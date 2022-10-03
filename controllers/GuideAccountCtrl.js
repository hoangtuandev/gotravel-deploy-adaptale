import { GuideAccountModel } from '../models/GuideAccountModel.js';
import jwt from 'jsonwebtoken';

export const getAllGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getActiveGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find({ tkhdv_trangthai: 1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getLockedGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find({ tkhdv_trangthai: 0 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const handleLogin = async (req, res) => {
    try {
        const user = await GuideAccountModel.findOne({
            tkhdv_tendangnhap: req.body.username,
        });

        if (!user) {
            res.status(200).json({ notFoundUsername: true });
        } else if (user && user.tkhdv_matkhau === req.body.password) {
            const jwt_guide = jwt.sign(
                {
                    _id: user._id,
                    tkhdv_tendangnhap: user.tkhdv_tendangnhap,
                },
                process.env.JWT_ACCESS_GUIDE,
                { expiresIn: '30m' }
            );

            const { tkhdv_matkhau, ...others } = user._doc;
            res.status(200).json({ others, jwt_guide });
        } else {
            res.status(200).json({ wrongPassword: true });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createAccountGuide = async (req, res) => {
    try {
        const newAccount = req.body;
        const result = new GuideAccountModel(newAccount);
        await result.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfileGuideOfAccount = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_huongdanvien: profile.tkhdv_huongdanvien,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const lockProfile = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_trangthai: 0,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const activeProfile = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_trangthai: 1,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
