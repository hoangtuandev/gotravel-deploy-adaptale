import { PostsCommentModel } from '../models/PostsComment.js';

export const getAllPostsComment = async (req, res) => {
    try {
        const result = await PostsCommentModel.find();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
