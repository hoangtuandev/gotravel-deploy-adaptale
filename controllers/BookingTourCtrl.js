import { BookingTourModel } from '../models/BookingTourModel.js';

export const getAllBookingTour = async (req, res) => {
    try {
        const result = await BookingTourModel.find().sort({ bt_ngaydat: 1 });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getBookingTourByStatus = async (req, res) => {
    const status = req.body.bt_trangthai;
    try {
        const result = await BookingTourModel.find({
            bt_trangthai: status,
        }).sort({ bt_ngaydat: -1 });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const bookingTour = async (req, res) => {
    try {
        const inforBooking = req.body;
        const bookingTour = new BookingTourModel(inforBooking);
        await bookingTour.save();

        res.status(200).json(bookingTour);
        console.log(inforBooking);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateStatusBookingTour = async (req, res) => {
    try {
        const booking = req.body;
        const result = await BookingTourModel.updateOne(
            { _id: booking._id },
            {
                $set: {
                    bt_trangthai: 2,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
