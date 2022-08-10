import { ScheduleTourModel } from '../models/ScheduleTourModel.js';

export const getAllScheduleTour = async (req, res) => {
    try {
        const result = await ScheduleTourModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createScheduleTour = async (req, res) => {
    try {
        const schedule = req.body;
        const result = new ScheduleTourModel(schedule);
        await result.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteScheduleTour = async (req, res) => {
    try {
        const schedule = req.body;
        const result = await ScheduleTourModel.deleteOne({
            _id: schedule._id,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
