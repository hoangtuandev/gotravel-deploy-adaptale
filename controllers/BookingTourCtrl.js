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
    try {
        const status = req.body.bt_trangthai;
        const result = await BookingTourModel.find({
            bt_trangthai: status,
        }).sort({ bt_ngaydat: -1 });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getBookingTourByTouristAccount = async (req, res) => {
    try {
        const idAccount = req.body._id;
        const bookings = await BookingTourModel.find().sort({ bt_ngaydat: -1 });

        const filterBooking = (booking) =>
            booking.bt_taikhoan._id === idAccount;

        const result = bookings.filter(filterBooking);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterBookingTourByParams = async (req, res) => {
    try {
        const params = req.body.params;
        const status = req.body.bt_trangthai;
        const departureFilter = new Date(req.body.params.departure);
        const timeFilter = new Date(req.body.params.time);

        const filterByDeparture = (booking) => {
            const date = new Date(booking.bt_lichkhoihanh.lkh_ngaykhoihanh);
            return (
                date.toLocaleDateString() ===
                departureFilter.toLocaleDateString()
            );
        };

        const filterByBookingDate = (booking) => {
            const date = new Date(booking.bt_ngaydat);
            return (
                date.toLocaleDateString() === timeFilter.toLocaleDateString()
            );
        };

        var bookings = await BookingTourModel.find({
            bt_tongthanhtoan: { $gte: params.price[0], $lte: params.price[1] },
            bt_trangthai: status,
        });

        if (!params.allDeparture) {
            const newBooking = [...bookings];
            const filterBookings = newBooking.filter(filterByDeparture);
            bookings = [...filterBookings];
        }

        if (!params.allTime) {
            const newBooking = [...bookings];
            const filterBookings = newBooking.filter(filterByBookingDate);
            bookings = [...filterBookings];
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterBookingTourByPrice = async (req, res) => {
    try {
        const params = req.body;
        const result = await BookingTourModel.find({
            bt_tongthanhtoan: { $gte: params.price[0], $lte: params.price[1] },
            bt_trangthai: params.bt_trangthai,
        }).sort({ bt_tongthanhtoan: 1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterBookingTourByDeparture = async (req, res) => {
    try {
        const params = req.body;
        const bookings = await BookingTourModel.find({
            bt_trangthai: params.bt_trangthai,
        });
        const filterDeparture = new Date(params.departure);

        const filterByDeparture = (booking) => {
            const departure = new Date(
                booking.bt_lichkhoihanh.lkh_ngaykhoihanh
            );
            return (
                departure.toLocaleDateString() ===
                filterDeparture.toLocaleDateString()
            );
        };

        const result = bookings.filter(filterByDeparture);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterBookingTourByBookingDate = async (req, res) => {
    try {
        const params = req.body;
        const bookings = await BookingTourModel.find({
            bt_trangthai: params.bt_trangthai,
        });
        const bookingDate = new Date(params.time);

        const filterByBookingDate = (booking) => {
            const date = new Date(booking.bt_ngaydat);
            return (
                date.toLocaleDateString() === bookingDate.toLocaleDateString()
            );
        };

        const result = bookings.filter(filterByBookingDate);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateBookingTourWorking = async (req, res) => {
    try {
        const status = req.body.bt_trangthai;
        const currentDate = new Date();
        const bookings = await BookingTourModel.find({
            bt_trangthai: { $gte: 2 },
        });

        for (let i = 0; i < bookings.length; i++) {
            const start = new Date(
                bookings[i].bt_lichkhoihanh.lkh_ngaykhoihanh
            );
            const end = new Date(bookings[i].bt_lichkhoihanh.lkh_ngayketthuc);

            if (currentDate >= start && currentDate <= end) {
                const update = await BookingTourModel.updateOne(
                    { _id: bookings[i]._id },
                    {
                        $set: {
                            bt_trangthai: 3,
                        },
                    }
                );
                res.status(200).json(update);
                return update;
            }
        }

        // res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateBookingTourFinish = async (req, res) => {
    try {
        const currentDate = new Date();

        const bookings = await BookingTourModel.find({
            bt_trangthai: { $gte: 2 },
        });

        for (let i = 0; i < bookings.length; i++) {
            const end = new Date(bookings[i].bt_lichkhoihanh.lkh_ngayketthuc);

            if (currentDate >= end) {
                const update = await BookingTourModel.updateOne(
                    { _id: bookings[i]._id },
                    {
                        $set: {
                            bt_trangthai: 4,
                        },
                    }
                );
                res.status(200).json(update);
                return update;
            }
        }

        // res.status(200).json();
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
                    bt_trangthai: booking.bt_trangthai,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
