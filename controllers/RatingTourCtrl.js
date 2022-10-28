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
        const tour = req.body.tour;

        const result = await RatingTourModel.find({
            dgt_khachdulich: tourist,
            dgt_tour: tour,
        });
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

export const updateRatingTour = async (req, res) => {
    try {
        const rating = req.body;

        const result = await RatingTourModel.updateOne(
            {
                _id: rating._id,
            },
            {
                $set: {
                    dgt_saodanhgia: rating.dgt_saodanhgia,
                    dgt_nhanxet: rating.dgt_nhanxet,
                    dgt_thoigian: rating.dgt_thoigian,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAllRatingTourByTour = async (req, res) => {
    try {
        const idTour = req.body.idTour;
        const result = await RatingTourModel.find({ dgt_tour: idTour });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
