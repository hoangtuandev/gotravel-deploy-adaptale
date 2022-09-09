import { RatingTourModel } from '../models/RatingTourModel.js';

export const getAllRatingTour = async (req, res) => {
    try {
        const result = await RatingTourModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getRatingTourByTourist = async (req, res) => {
    try {
        const tourist = req.body.tourist;
        const result = await RatingTourModel.find({
            dgt_khachdulich: tourist,
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createRatingTour = async (req, res) => {
    try {
        const rating = req.body;
        console.log(rating);
        const newRating = new RatingTourModel(rating);
        await newRating.save();

        res.status(200).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
