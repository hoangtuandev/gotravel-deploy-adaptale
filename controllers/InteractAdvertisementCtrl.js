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
        const user = req.body.ttbqb_taikhoan;
        const interacts = await InteractAdvertisementModel.find({
            ttbqb_taikhoan: user,
        });
        res.status(200).json(interacts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getInteractAdvertisementByParams = async (req, res) => {
    try {
        const userID = req.body.userID;
        const advertisement = req.body.advertisement;
        const interacts = await InteractAdvertisementModel.find({
            ttbqb_taikhoan: userID,
            ttbqb_baiviet: advertisement,
        });
        res.status(200).json(interacts);
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
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
