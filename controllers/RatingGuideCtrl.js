import { RatingGuideModel } from '../models/RatingGuideModel.js';

export const getAllRatingGuide = async (req, res) => {
    try {
        const result = await RatingGuideModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// export const getRatingGuideByTourist = async (req, res) => {
//     try {
//         const tourist = req.body.tourist;
//         const tour = req.body.tour;

//         const result = await RatingGuideModel.find({
//             dgt_khachdulich: tourist,
//             dgt_tour: tour,
//         });
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// };

export const createRatingGuide = async (req, res) => {
    try {
        const rating = req.body;

        const newRating = new RatingGuideModel(rating);
        await newRating.save();

        res.status(200).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// export const updateRatingTour = async (req, res) => {
//     try {
//         const rating = req.body;

//         const result = await RatingGuideModel.updateOne(
//             {
//                 _id: rating._id,
//             },
//             {
//                 $set: {
//                     dgt_saodanhgia: rating.dgt_saodanhgia,
//                     dgt_nhanxet: rating.dgt_nhanxet,
//                     dgt_thoigian: rating.dgt_thoigian,
//                 },
//             }
//         );
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// };
