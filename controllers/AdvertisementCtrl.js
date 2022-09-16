import { AdvertisementModel } from '../models/AdvertisementModel.js';

export const getAllAdvertisement = async (req, res) => {
    try {
        const advertisements = await AdvertisementModel.find();
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getActiveAdvertisement = async (req, res) => {
    try {
        const advertisements = await AdvertisementModel.find({
            bvqb_trangthai: 1,
        });
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createAdvertisement = async (req, res) => {
    try {
        const advertisement = new AdvertisementModel(req.body);
        await advertisement.save();
        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateAdvertisement = async (req, res) => {
    try {
        const advertisement = req.body;
        const result = await AdvertisementModel.updateOne(
            {
                _id: advertisement._id,
            },
            {
                $set: {
                    bvqb_tieude: advertisement.bvqb_tieude,
                    bvqb_noidung: advertisement.bvqb_noidung,
                    bvqb_thoihan: advertisement.bvqb_thoihan,
                    bvqb_hinhanh: advertisement.bvqb_hinhanh,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
