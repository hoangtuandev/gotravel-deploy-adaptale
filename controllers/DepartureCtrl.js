import { DepartureModel } from '../models/DepartureModel.js';

export const getAllDeparture = async (req, res) => {
    try {
        const result = await DepartureModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getDepartureById = async (req, res) => {
    try {
        const result = await DepartureModel.findOne({ _id: req.body._id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createDeparture = async (req, res) => {
    try {
        const departure = req.body;
        const result = new DepartureModel(departure);
        await result.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteDeparture = async (req, res) => {
    try {
        const departure = req.body;
        const result = await DepartureModel.deleteOne({ _id: departure._id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
