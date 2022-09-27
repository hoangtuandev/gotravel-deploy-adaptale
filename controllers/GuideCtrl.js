import { GuideModel } from '../models/GuideModel.js';

export const getAllGuide = async (req, res) => {
    try {
        const result = await GuideModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
