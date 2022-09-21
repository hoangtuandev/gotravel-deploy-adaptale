import { InteractAdvertisementModel } from '../models/InteractAdvertisementModel.js';

export const getAllInteractAdvertisement = async (req, res) => {
    try {
        const interacts = await InteractAdvertisementModel.find();
        res.status(200).json(interacts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getInteractAdvertisementByAccount = async (req, res) => {
    try {
        const userID = req.body.userID;
        const interacts = await InteractAdvertisementModel.find({
            ttbqb_taikhoan: userID,
            ttbqb_daluu: true,
        });
        res.status(200).json(interacts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getInteractAdvertisementByParams = async (req, res) => {
    try {
        const userID = req.body.userID;
        const advertisementID = req.body.advertisement._id;
        const interacts = await InteractAdvertisementModel.find({
            ttbqb_taikhoan: userID,
        });

        const filterByAdvertisement = (advertisement) => {
            return advertisement.ttbqb_baiviet._id === advertisementID;
        };
        const result = interacts.filter(filterByAdvertisement);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createInteractAdvertisement = async (req, res) => {
    try {
        const interact = new InteractAdvertisementModel(req.body);
        await interact.save();
        res.status(200).json(interact);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateLikeInteractAdvertisement = async (req, res) => {
    try {
        const interactID = req.body.interactID;
        const status = req.body.status;
        const result = await InteractAdvertisementModel.updateOne(
            {
                _id: interactID,
            },
            {
                $set: {
                    ttbqb_dathich: status,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateSaveInteractAdvertisement = async (req, res) => {
    try {
        const interactID = req.body.interactID;
        const status = req.body.status;
        const result = await InteractAdvertisementModel.updateOne(
            {
                _id: interactID,
            },
            {
                $set: {
                    ttbqb_daluu: status,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteInteractAdvertisement = async (req, res) => {
    try {
        const result = await InteractAdvertisementModel.deleteOne({
            ttbqb_daluu: false,
            ttbqb_dathich: false,
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
