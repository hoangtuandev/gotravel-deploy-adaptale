import express from 'express';
import {
    createCommentSharePosts,
    getAllPostsComment,
} from '../controllers/PostsCommentCtrl.js';
const router = express.Router();

router.get('/', getAllPostsComment);

router.post('/createCommentSharePosts', createCommentSharePosts);

export default router;
