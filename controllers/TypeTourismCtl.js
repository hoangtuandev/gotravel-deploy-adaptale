import { TypeTourismModel } from '../models/TypeTourismModel.js';

export const getAllTypeTourism = async (req, res) => {
    try {
        const typeTourismList = await TypeTourismModel.find();
        res.status(200).json(typeTourismList);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getTypeTourismById = async (req, res) => {
    try {
        const typeTourism = await TypeTourismModel.findOne({
            lht_ma: req.body.lht_ma,
        });

        res.status(200).json(typeTourism);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createTypeTourism = async (req, res) => {
    try {
        const newTypeTourism = req.body;
        const typesTourism = new TypeTourismModel(newTypeTourism);
        await typesTourism.save();

        res.status(200).json(typesTourism);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateTypeTourism = async (req, res) => {
    try {
        const typeTourism = req.body;

        const result = await TypeTourismModel.updateOne(
            { _id: typeTourism.id },
            {
                $set: {
                    lht_ma: typeTourism.lht_ma,
                    lht_ten: typeTourism.lht_ten,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteTypeTourism = async (req, res) => {
    try {
        const typeTourism = req.body;
        const result = await TypeTourismModel.deleteOne({
            _id: typeTourism._id,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
