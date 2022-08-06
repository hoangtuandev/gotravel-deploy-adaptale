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
