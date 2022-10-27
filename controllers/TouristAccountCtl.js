import { TouristAccountModel } from '../models/TouristAccountModel.js';
import { TypeTourismModel } from '../models/TypeTourismModel.js';
import jwt from 'jsonwebtoken';

export const getAllTouristAccount = async (req, res) => {
    try {
        const touristAccountList = await TouristAccountModel.find();
        res.status(200).json(touristAccountList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTouristAccountByUsername = async (req, res) => {
    try {
        const touristAccount = await TouristAccountModel.find({
            tkkdl_tendangnhap: req.body.tkkdl_tendangnhap,
        });

        res.status(200).json(touristAccount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createTouristAccount = async (req, res) => {
    try {
        const newAccount = req.body;
        const touristAccount = new TouristAccountModel(newAccount);
        await touristAccount.save();
        res.status(200).json(touristAccount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const signInTourist = async (req, res) => {
    try {
        const user = await TouristAccountModel.findOne({
            tkkdl_tendangnhap: req.body.tkkdl_tendangnhap,
        });
        if (!user) {
            res.status(200).json({ notFoundUsername: true });
        }
        // const validPassword = await user.tkkdl_matkhau == ;
        else if (user && user.tkkdl_matkhau === req.body.tkkdl_matkhau) {
            const jwtTourist = jwt.sign(
                {
                    _id: user._id,
                    tkkdl_tendangnhap: user.tkkdl_tendangnhap,
                },
                process.env.JWT_ACCESS_TOURIST,
                { expiresIn: '30m' }
            );

            const { tkkdl_matkhau, ...others } = user._doc;
            res.status(200).json({ others, jwtTourist });
        } else {
            res.status(200).json({ wrongPassword: true });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const countAmountTouristAccount = async (req, res) => {
    try {
        const amount = await TouristAccountModel.count();

        res.status(200).json(amount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTouristAccountById = async (req, res) => {
    try {
        const idAccount = req.body.idAccount;
        const result = await TouristAccountModel.find({ _id: idAccount });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfileTouristAccount = async (req, res) => {
    try {
        const idAccount = req.body.idAccount;
        const profile = req.body.profile;

        await TouristAccountModel.updateOne(
            {
                _id: idAccount,
            },
            {
                $set: {
                    tkkdl_khachdulich: profile,
                },
            }
        );

        const result = await TouristAccountModel.find({ _id: idAccount });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
