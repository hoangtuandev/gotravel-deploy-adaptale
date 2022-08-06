import { TourModel } from '../models/TourModel.js';

export const getAllTour = async (req, res) => {
    try {
        const result = await TourModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTourById = async (req, res) => {
    try {
        const result = await TourModel.findOne({ t_ma: req.body.t_ma });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createTour = async (req, res) => {
    try {
        const newTour = req.body;
        const tour = new TourModel(newTour);
        await tour.save();

        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateTour = async (req, res) => {
    try {
        const tour = req.body;
        const result = await TourModel.updateOne(
            { _id: tour._id },
            {
                $set: {
                    t_ten: tour.t_ten,
                    t_loaihinh: tour.t_loaihinh,
                    t_thoigian: tour.t_thoigian,
                    t_gia: tour.t_gia,
                    t_hinhanh: tour.t_hinhanh,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateTourWithDeparture = async (req, res) => {
    try {
        const tour = req.body;
        const result = await TourModel.updateOne(
            { _id: tour._id },
            {
                $set: {
                    t_lichkhoihanh: tour.t_lichkhoihanh,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
