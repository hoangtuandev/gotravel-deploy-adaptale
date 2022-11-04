import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {
    acceptSharePost,
    getAcceptedSharePosts,
    getAllSharePosts,
    getRejectSharePosts,
    getWaitingSharePosts,
    handleDisFavoriteSharePost,
    handleFavoriteSharePost,
    historySharePostsByTourist,
    rejectSharePost,
    searchingSharePosts,
} from '../controllers/SharePostsCtrl.js';
import { SharePostsModel } from '../models/SharePosts.js';

const router = express.Router();
const upload = multer({ dest: 'imageUploads' });

router.get('/', getAllSharePosts);

router.get('/getRejectSharePosts', getRejectSharePosts);

router.get('/getAcceptedSharePosts', getAcceptedSharePosts);

router.get('/getWaitingSharePosts', getWaitingSharePosts);

router.post('/acceptSharePost', acceptSharePost);

router.post('/rejectSharePost', rejectSharePost);

router.post('/handleFavoriteSharePost', handleFavoriteSharePost);

router.post('/handleDisFavoriteSharePost', handleDisFavoriteSharePost);

router.post('/searchingSharePosts', searchingSharePosts);

router.post('/historySharePostsByTourist', historySharePostsByTourist);

router.post('/createSharePosts', upload.single('image'), async (req, res) => {
    const datas = JSON.parse(req.query.datas);

    if (req.file) {
        let fileType = req.file.mimetype.split('/')[1];
        let newFileName = req.file.filename + '.' + fileType;
        fs.rename(
            `./imageUploads/${req.file.filename}`,
            `./imageUploads/${newFileName}`,
            async () => {
                const newData = {
                    bvcs_ma: datas.bvcs_ma,
                    bvcs_noidung: datas.bvcs_noidung,
                    bvcs_tieude: datas.bvcs_tieude,
                    bvcs_hinhanhtieude: newFileName,
                    bvcs_luotthich: [],
                    bvcs_binhluan: [],
                    bvcs_luotchiase: [],
                    bvcs_taikhoan: datas.bvcs_taikhoan,
                    bvcs_thoigian: new Date(),
                    bvcs_trangthai: 1,
                };

                const newPosts = new SharePostsModel(newData);
                await newPosts.save();
                res.status(200).json(newPosts);
            }
        );
    }
});

export default router;
