import express from 'express';
import { getAllPostsComment } from '../controllers/PostsCommentCtrl.js';
const router = express.Router();

router.get('/', getAllPostsComment);

export default router;
