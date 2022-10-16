import { GuideAccountModel } from '../models/GuideAccountModel.js';
import jwt from 'jsonwebtoken';

export const getAllGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getActiveGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find({ tkhdv_trangthai: 1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getLockedGuideAccount = async (req, res) => {
    try {
        const result = await GuideAccountModel.find({ tkhdv_trangthai: 0 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const handleLogin = async (req, res) => {
    try {
        const user = await GuideAccountModel.findOne({
            tkhdv_tendangnhap: req.body.username,
        });

        if (!user) {
            res.status(200).json({ notFoundUsername: true });
        } else if (user && user.tkhdv_matkhau === req.body.password) {
            const jwt_guide = jwt.sign(
                {
                    _id: user._id,
                    tkhdv_tendangnhap: user.tkhdv_tendangnhap,
                },
                process.env.JWT_ACCESS_GUIDE,
                { expiresIn: '30m' }
            );

            const { tkhdv_matkhau, ...others } = user._doc;
            res.status(200).json({ others, jwt_guide });
        } else {
            res.status(200).json({ wrongPassword: true });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createAccountGuide = async (req, res) => {
    try {
        const newAccount = req.body;
        const result = new GuideAccountModel(newAccount);
        await result.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProfileGuideOfAccount = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_huongdanvien: profile.tkhdv_huongdanvien,
                    tkhdv_anhdaidien: profile.tkhdv_anhdaidien,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const lockProfile = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_trangthai: 0,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const activeProfile = async (req, res) => {
    try {
        const profile = req.body;
        const result = await GuideAccountModel.updateOne(
            {
                _id: profile._id,
            },
            {
                $set: {
                    tkhdv_trangthai: 1,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const searchingGuide = async (req, res) => {
    try {
        const key = req.body.keySearch;

        function removeVietnameseTones(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
            str = str.replace(/đ/g, 'd');
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
            str = str.replace(/Đ/g, 'D');

            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
            str = str.replace(/\u02C6|\u0306|\u031B/g, '');
            str = str.replace(/ + /g, ' ');
            str = str.trim();

            str = str.replace(
                /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                ' '
            );
            return str;
        }
        const guideAccounts = await GuideAccountModel.find({
            tkhdv_trangthai: 1,
        });
        const convertKey = removeVietnameseTones(key).toLowerCase();

        const fillterAccountGuide = (account) => {
            return removeVietnameseTones(account.tkhdv_huongdanvien.hdv_hoten)
                .toLowerCase()
                .includes(convertKey.toLowerCase());
        };

        const result = guideAccounts.filter(fillterAccountGuide);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const countAmountGuide = async (req, res) => {
    try {
        const amount = await GuideAccountModel.count();

        res.status(200).json(amount);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
