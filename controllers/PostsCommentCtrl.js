import { PostsCommentModel } from '../models/PostsComment.js';
import { SharePostsModel } from '../models/SharePosts.js';

export const getAllPostsComment = async (req, res) => {
    try {
        const result = await PostsCommentModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createCommentSharePosts = async (req, res) => {
    try {
        const comment = req.body.newComment;
        const idPosts = req.body.idPosts;

        const newComment = new PostsCommentModel(comment);
        await newComment.save();

        const posts = await SharePostsModel.find({ bvcs_ma: idPosts });

        const currentComment = posts[0].bvcs_binhluan;

        currentComment.push(newComment);

        await SharePostsModel.updateOne(
            {
                bvcs_ma: idPosts,
            },
            {
                $set: {
                    bvcs_binhluan: currentComment,
                },
            }
        );

        const result = await SharePostsModel.find({ bvcs_ma: idPosts });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
