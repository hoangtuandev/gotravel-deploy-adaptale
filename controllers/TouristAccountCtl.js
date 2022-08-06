import { TouristAccountModel } from '../models/TouristAccountModel.js';
import { TypeTourismModel } from '../models/TypeTourismModel.js';

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
