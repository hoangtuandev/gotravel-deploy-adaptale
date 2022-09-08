import { RatingTourModel } from '../models/RatingTourModel.js';

export const getAllRatingTour = async (req, res) => {
    try {
        const result = await RatingTourModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createRatingTour = async (req, res) => {
    try {
        const rating = req.body;
        const newRating = new RatingTourModel(rating);
        await newRating.save();

        res.status(200).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
