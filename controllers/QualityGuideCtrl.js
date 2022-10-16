import { QuanlityGuideModel } from '../models/QualityGuideModel.js';
import { RatingGuideModel } from '../models/RatingGuideModel.js';

export const getAllQualityGuide = async (req, res) => {
    try {
        const result = await QuanlityGuideModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addQualityGuide = async (req, res) => {
    try {
        const newQuality = req.body;
        const result = new QuanlityGuideModel(newQuality);
        result.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateStartGuide = async (req, res) => {
    try {
        console.log(req.body.username);
        const username = req.body.username;
        const ratings = await RatingGuideModel.find();
        const qualitys = await QuanlityGuideModel.find();

        const filterRatings = (rating) => {
            return rating.dghdv_huongdanvien.tkhdv_tendangnhap === username;
        };
        const filtedRating = ratings.filter(filterRatings);

        const averageStar =
            filtedRating.reduce(
                (previousValue, currentValue) =>
                    previousValue + currentValue.dghdv_saodanhgia,
                0
            ) / filtedRating.length;

        const updatedGuide = qualitys.filter((quality) => {
            return quality.clhdv_huongdanvien.tkhdv_tendangnhap === username;
        });

        const result = await QuanlityGuideModel.updateOne(
            {
                _id: updatedGuide,
            },
            {
                $set: {
                    clhdv_saotrungbinh: averageStar,
                },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
