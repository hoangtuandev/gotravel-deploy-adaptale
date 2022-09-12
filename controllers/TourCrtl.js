import { TourModel } from '../models/TourModel.js';

export const getAllTour = async (req, res) => {
    try {
        const result = await TourModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAllActiveTour = async (req, res) => {
    try {
        const result = await TourModel.find({ t_trangthai: 1 });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getStopedTour = async (req, res) => {
    try {
        const result = await TourModel.find({ t_trangthai: 0 });

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

export const getTourByTypeTourism = async (req, res) => {
    try {
        const typeTourism = req.body.type_tourism;
        const result = await TourModel.find({ t_loaihinh: typeTourism });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getPreferTour = async (req, res) => {
    try {
        const result = await TourModel.find({ t_trangthai: 1 }).limit(9);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const searchingTour = async (req, res) => {
    try {
        const key = req.body.keySearch;

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
        const tours = await TourModel.find();
        const convertKey = removeVietnameseTones(key).toLowerCase();

        const fillterTourByKey = (tour) => {
            return removeVietnameseTones(tour.t_ten)
                .toLowerCase()
                .includes(convertKey.toLowerCase());
        };

        const result = tours.filter(fillterTourByKey);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTourByParamsFilter = async (req, res) => {
    try {
        const params = req.body;
        const departure = new Date(params.departure);

        const result = await TourModel.find({
            t_thoigian: true,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterTourByPrice = async (req, res) => {
    try {
        const params = req.body;
        const result = await TourModel.find({
            t_gia: { $gte: params.price[0], $lte: params.price[1] },
        }).sort({ t_gia: 1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterTourByDeparture = async (req, res) => {
    try {
        const params = req.body;
        const tours = await TourModel.find();
        const filterDeparture = new Date(params.departure);

        const filterByDeparture = (tour) => {
            for (let i = 0; i < tour.t_lichkhoihanh.length; i++) {
                const departure = new Date(
                    tour.t_lichkhoihanh[i].lkh_ngaykhoihanh
                );

                return (
                    departure.toLocaleDateString() ===
                    filterDeparture.toLocaleDateString()
                );
            }
        };

        const result = tours.filter(filterByDeparture);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const filterTourByTime = async (req, res) => {
    try {
        const time = req.body.time;
        const result = await TourModel.find({ t_thoigian: time });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const bookingTour = async (req, res) => {
    try {
        const inforBooking = req.body;
        const bookingTour = new TourModel(inforBooking);
        await bookingTour.save();

        res.status(200).json(bookingTour);
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
                    t_soluongkhach: tour.t_soluongkhach,
                    t_soluonghuongdanvien: tour.t_soluonghuongdanvien,
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

export const updateTourWithScheduleTour = async (req, res) => {
    try {
        const tour = req.body;
        const result = await TourModel.updateOne(
            { _id: tour._id },
            { $set: { t_lichtrinhtour: tour.t_lichtrinhtour } }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteDepartureFromTour = async (req, res) => {
    try {
        const departure = req.body;

        const newUpdate = await TourModel.findOne({ _id: departure.idTour });

        for (let i = 0; i < newUpdate.t_lichkhoihanh.length; i++) {
            if (newUpdate.t_lichkhoihanh[i]._id === departure._id) {
                newUpdate.t_lichkhoihanh.splice(i, 1);
            }
        }

        const result = await TourModel.updateOne(
            { _id: departure.idTour },
            {
                $set: {
                    t_lichkhoihanh: newUpdate.t_lichkhoihanh,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteScheduleFromTour = async (req, res) => {
    try {
        const schedule = req.body;

        const newUpdate = await TourModel.findOne({ _id: schedule.idTour });

        for (let i = 0; i < newUpdate.t_lichtrinhtour.length; i++) {
            if (newUpdate.t_lichtrinhtour[i]._id === schedule._id) {
                newUpdate.t_lichtrinhtour.splice(i, 1);
            }
        }

        const result = await TourModel.updateOne(
            { _id: schedule.idTour },
            {
                $set: {
                    t_lichtrinhtour: newUpdate.t_lichtrinhtour,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateStopTour = async (req, res) => {
    try {
        const tour = req.body;
        const result = await TourModel.updateOne(
            { _id: tour._id },
            { $set: { t_trangthai: 0 } }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateActiveTour = async (req, res) => {
    try {
        const tour = req.body;
        const result = await TourModel.updateOne(
            { _id: tour._id },
            { $set: { t_trangthai: 1 } }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
