import { GuideCardModel } from '../models/GuideCardModel.js';

export const getAllGuideCard = async (req, res) => {
    try {
        const result = await GuideCardModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
