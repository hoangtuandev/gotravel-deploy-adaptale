import { RatingGuideModel } from '../models/RatingGuideModel.js';

export const getAllRatingGuide = async (req, res) => {
    try {
        const result = await RatingGuideModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getRatingGuideByBooking = async (req, res) => {
    try {
        const idBooking = req.body._id;

        const ratings = await RatingGuideModel.find();

        const filterRatings = (rating) => {
            return rating.dghdv_booking._id === idBooking;
        };

        const result = ratings.filter(filterRatings);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getRatingGuideByGuideAccount = async (req, res) => {
    try {
        const idAccount = req.body._id;

        const ratings = await RatingGuideModel.find();

        const filterRatings = (rating) => {
            return rating.dghdv_huongdanvien._id === idAccount;
        };

        const result = ratings.filter(filterRatings);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

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

export const updateRatingGuide = async (req, res) => {
    try {
        const idRating = req.body._id;
        const star = req.body.dghdv_saodanhgia;
        const comment = req.body.dghdv_nhanxet;

        const result = await RatingGuideModel.updateOne(
            {
                _id: idRating,
            },
            {
                $set: {
                    dghdv_saodanhgia: star,
                    dghdv_nhanxet: comment,
                },
            }
        );
        res.status(200).json(result);
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
