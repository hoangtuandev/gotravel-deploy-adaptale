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
        }).sort({ bvqb_ngaydang: -1 });
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getLimitActiveAdvertisement = async (req, res) => {
    try {
        const limitAmount = req.body.limitAmount;
        const advertisements = await AdvertisementModel.find({
            bvqb_trangthai: 1,
        })
            .sort({ bvqb_ngaydang: -1 })
            .limit(limitAmount);
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getRemoveAdvertisement = async (req, res) => {
    try {
        const advertisements = await AdvertisementModel.find({
            bvqb_trangthai: 2,
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

export const removeAdvertisement = async (req, res) => {
    try {
        const advertisement = req.body;
        const result = await AdvertisementModel.updateOne(
            { _id: advertisement._id },
            {
                $set: {
                    bvqb_trangthai: 2,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const activeAdvertisement = async (req, res) => {
    try {
        const advertisement = req.body;
        const result = await AdvertisementModel.updateOne(
            { _id: advertisement._id },
            {
                $set: {
                    bvqb_trangthai: 1,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteAdvertisement = async (req, res) => {
    try {
        const id = req.body.id;

        const result = await AdvertisementModel.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const likeAdvertisement = async (req, res) => {
    try {
        const advertisement = req.body;
        const result = await AdvertisementModel.updateOne(
            {
                _id: advertisement._id,
            },
            {
                $set: {
                    bvqb_luotthich: advertisement.bvqb_luotthich + 1,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const dislikeAdvertisement = async (req, res) => {
    try {
        const advertisement = req.body;
        const result = await AdvertisementModel.updateOne(
            {
                _id: advertisement._id,
            },
            {
                $set: {
                    bvqb_luotthich: advertisement.bvqb_luotthich - 1,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
