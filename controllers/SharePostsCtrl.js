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
        }).sort({
            bvcs_thoigian: -1,
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
        }).sort({
            bvcs_thoigian: -1,
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
        }).sort({
            bvcs_thoigian: -1,
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

export const handleFavoriteSharePost = async (req, res) => {
    try {
        const user = req.body.user;
        const idPosts = req.body.idPosts;

        const posts = await SharePostsModel.find({
            bvcs_ma: idPosts,
        });

        const favoriteTimes = posts[0].bvcs_luotthich;
        favoriteTimes.push(user);

        await SharePostsModel.updateOne(
            {
                bvcs_ma: idPosts,
            },
            {
                $set: {
                    bvcs_luotthich: favoriteTimes,
                },
            }
        );
        const result = await SharePostsModel.find({
            bvcs_ma: idPosts,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const handleDisFavoriteSharePost = async (req, res) => {
    try {
        const user = req.body.user;
        const idPosts = req.body.idPosts;

        const posts = await SharePostsModel.find({
            bvcs_ma: idPosts,
        });

        const favoriteTimes = posts[0].bvcs_luotthich.filter((favorite) => {
            return (
                favorite.tkkdl_khachdulich.kdl_ma !==
                user.tkkdl_khachdulich.kdl_ma
            );
        });

        await SharePostsModel.updateOne(
            {
                bvcs_ma: idPosts,
            },
            {
                $set: {
                    bvcs_luotthich: favoriteTimes,
                },
            }
        );
        const result = await SharePostsModel.find({
            bvcs_ma: idPosts,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
