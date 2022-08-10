import { BookingTourModel } from '../models/BookingTourModel.js';

export const getAllBookingTour = async (req, res) => {
    try {
        const result = await BookingTourModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
