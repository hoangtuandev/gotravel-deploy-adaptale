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
