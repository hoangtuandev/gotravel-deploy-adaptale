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
                await BookingTourModel.updateOne(
                    { _id: bookings[i]._id },
                    {
                        $set: {
                            bt_trangthai: 3,
                        },
                    }
                );
            }
        }
        res.status(200).json();
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
                await BookingTourModel.updateOne(
                    { _id: bookings[i]._id },
                    {
                        $set: {
                            bt_trangthai: 4,
                        },
                    }
                );
            }
        }

        res.status(200).json();
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

export const countAmountBooking = async (req, res) => {
    try {
        const amount = await BookingTourModel.count();

        res.status(200).json(amount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getYearsBookingTour = async (req, res) => {
    try {
        const years = await BookingTourModel.aggregate([
            { $group: { _id: { $year: '$bt_ngaydat' } } },
            {
                $sort: { _id: 1 },
            },
        ]);

        const result = [];

        for (let i = 0; i < years.length; i++) {
            result.push({ value: years[i]._id, label: years[i]._id });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const totalRevenueBookingTour = async (req, res) => {
    try {
        const revenue = await BookingTourModel.aggregate([
            { $match: { bt_trangthai: 4 } },
            {
                $group: {
                    _id: null,
                    totalPayment: { $sum: '$bt_tongthanhtoan' },
                },
            },
        ]);
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const revenueBookingTourByMonth = async (req, res) => {
    try {
        const currentYear = req.body.currentYear;

        const bookings = await BookingTourModel.aggregate([
            { $match: { bt_trangthai: 4 } },
            {
                $group: {
                    _id: {
                        year: { $year: '$bt_ngaydat' },
                        month: { $month: '$bt_ngaydat' },
                    },
                    total_revenue_month: { $sum: '$bt_tongthanhtoan' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const bookingsByYear = bookings.filter((booking) => {
            if (booking._id.year === currentYear) {
                return booking;
            }
        });

        const revenuesMonth = [];

        for (let i = 1; i <= 12; i++) {
            var mark = null;
            for (let n = 0; n < bookingsByYear.length; n++) {
                if (i.toString() === bookingsByYear[n]._id.month.toString()) {
                    mark = bookingsByYear[n];
                }
            }

            if (mark) {
                revenuesMonth.push(mark.total_revenue_month);
            } else {
                revenuesMonth.push(0);
            }
        }

        res.status(200).json(revenuesMonth);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const compareRevenueBookingTour = async (req, res) => {
    try {
        const revenues = await BookingTourModel.aggregate([
            { $match: { bt_trangthai: 4 } },
            {
                $group: {
                    _id: {
                        year: { $year: '$bt_ngaydat' },
                    },
                    total_revenue_month: { $sum: '$bt_tongthanhtoan' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const result = [];

        for (let i = 0; i < revenues.length; i++) {
            result.push(revenues[i].total_revenue_month);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const revenueBookingByTour = async (req, res) => {
    try {
        const bookings = await BookingTourModel.aggregate([
            { $match: { bt_trangthai: 4 } },
            {
                $group: {
                    _id: '$bt_tour',
                    total_revenue: { $sum: '$bt_tongthanhtoan' },
                },
            },
            {
                $sort: { total_revenue: -1 },
            },
            { $limit: 5 },
        ]);

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const revenueBookingByTourist = async (req, res) => {
    try {
        const bookings = await BookingTourModel.aggregate([
            { $match: { bt_trangthai: 4 } },
            {
                $group: {
                    _id: '$bt_taikhoan',
                    total_revenue: { $sum: '$bt_tongthanhtoan' },
                },
            },
            {
                $sort: { total_revenue: -1 },
            },
            { $limit: 5 },
        ]);

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterBookingTourByStatus = async (req, res) => {
    try {
        const idAccount = req.body.idAccount;
        const status = req.body.status;

        const bookings = await BookingTourModel.find({
            bt_trangthai: status,
        });

        const filterBooking = (booking) =>
            booking.bt_taikhoan._id === idAccount;

        const result = bookings.filter(filterBooking);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const searchingBookingByTour = async (req, res) => {
    try {
        const key = req.body.keySearch;
        const idAccount = req.body.idAccount;

        function removeVietnameseTones(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
            str = str.replace(/đ/g, 'd');
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
            str = str.replace(/Đ/g, 'D');

            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
            str = str.replace(/\u02C6|\u0306|\u031B/g, '');
            str = str.replace(/ + /g, ' ');
            str = str.trim();

            str = str.replace(
                /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                ' '
            );
            return str;
        }
        const bookings = await BookingTourModel.find();
        const convertKey = removeVietnameseTones(key).toLowerCase();

        const filterBookings = (booking) => {
            return (
                removeVietnameseTones(booking.bt_tour.t_ten)
                    .toLowerCase()
                    .includes(convertKey.toLowerCase()) &&
                booking.bt_taikhoan._id === idAccount
            );
        };

        const result = bookings.filter(filterBookings);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getWorkingBookingTour = async (req, res) => {
    try {
        const idAccount = req.body.idAccount;
        const bookings = await BookingTourModel.find({ bt_trangthai: 3 });

        const result = bookings.filter((booking) => {
            if (idAccount.toString() === booking.bt_taikhoan._id.toString()) {
                return booking;
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getFutureBookingTour = async (req, res) => {
    try {
        const idAccount = req.body.idAccount;
        const bookings = await BookingTourModel.find({ bt_trangthai: 2 });

        const result = bookings.filter((booking) => {
            if (idAccount.toString() === booking.bt_taikhoan._id.toString()) {
                return booking;
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTouristByDeparture = async (req, res) => {
    try {
        const calendar = req.body.calendar;
        var amountTourist = 0;
        const bookings = await BookingTourModel.find();

        const filterByCalendar = bookings.filter((booking) => {
            return (
                calendar._id.toString() ===
                booking.bt_lichkhoihanh._id.toString()
            );
        });

        for (let i = 0; i < filterByCalendar.length; i++) {
            amountTourist +=
                filterByCalendar[i].bt_soluonghanhkhach.adult +
                filterByCalendar[i].bt_soluonghanhkhach.children +
                filterByCalendar[i].bt_soluonghanhkhach.baby;
        }

        res.status(200).json({ filterByCalendar, amountTourist });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const totalTouristSatistic = async (req, res) => {
    try {
        const bookings = await BookingTourModel.find();

        var result = 0;

        for (let i = 0; i < bookings.length; i++) {
            result +=
                bookings[i].bt_soluonghanhkhach.adult +
                bookings[i].bt_soluonghanhkhach.children +
                bookings[i].bt_soluonghanhkhach.baby;
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
