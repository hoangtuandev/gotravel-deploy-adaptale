import { SharePostsModel } from '../models/SharePosts.js';

export const getAllSharePosts = async (req, res) => {
    try {
        const result = await SharePostsModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getRejectSharePosts = async (req, res) => {
    try {
        const result = await SharePostsModel.find({
            bvcs_trangthai: 0,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAcceptedSharePosts = async (req, res) => {
    try {
        const result = await SharePostsModel.find({
            bvcs_trangthai: 2,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getWaitingSharePosts = async (req, res) => {
    try {
        const result = await SharePostsModel.find({
            bvcs_trangthai: 1,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const acceptSharePost = async (req, res) => {
    try {
        const idPosts = req.body.idPosts;

        const result = await SharePostsModel.updateOne(
            {
                bvcs_ma: idPosts,
            },
            {
                $set: {
                    bvcs_trangthai: 2,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const rejectSharePost = async (req, res) => {
    try {
        const idPosts = req.body.idPosts;

        const result = await SharePostsModel.updateOne(
            {
                bvcs_ma: idPosts,
            },
            {
                $set: {
                    bvcs_trangthai: 0,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
