import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {
    countAmountTouristAccount,
    createTouristAccount,
    getAllTouristAccount,
    getTouristAccountById,
    getTouristAccountByUsername,
    signInTourist,
    updateProfileTouristAccount,
} from '../controllers/TouristAccountCtl.js';
import { TouristAccountModel } from '../models/TouristAccountModel.js';

const router = express.Router();
const upload = multer({ dest: 'imageUploads' });

router.get('/', getAllTouristAccount);

router.post('/TouristAccountByUserName', getTouristAccountByUsername);

router.post('/', createTouristAccount);

router.post('/signInTourist', signInTourist);

router.post('/getTouristAccountById', getTouristAccountById);

router.get('/countAmountTouristAccount', countAmountTouristAccount);

router.post('/updateProfileTouristAccount', updateProfileTouristAccount);

router.post(
    '/changeAvatarAccountTourist',
    upload.single('avatar'),
    async (req, res) => {
        if (req.file) {
            let fileType = req.file.mimetype.split('/')[1];
            let newFileName = req.file.filename + '.' + fileType;

            fs.rename(
                `./imageUploads/${req.file.filename}`,
                `./imageUploads/${newFileName}`,
                async () => {
                    await TouristAccountModel.updateOne(
                        {
                            _id: req.query.accountID,
                        },
                        {
                            tkkdl_anhdaidien: newFileName,
                        }
                    );
                    const result = await TouristAccountModel.find({
                        _id: req.query.accountID,
                    });
                    res.status(200).json(result);
                }
            );
        } else {
            const result = await TouristAccountModel.find({
                _id: req.query.accountID,
            });
            res.status(200).json(result);
        }
    }
);

export default router;
