import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    bvqb_ma: {
        type: String,
        require: true,
    },
    bvqb_tieude: {
        type: String,
    },
    bvqb_noidung: {
        type: String,
    },
    bvqb_ngaydang: {
        type: Date,
    },
    bvqb_luotthich: {
        type: Number,
    },
    bvqb_thoihan: {
        type: Date,
    },
    bvqb_hinhanh: {
        type: Array,
    },
    bvqb_trangthai: {
        type: Number,
        // 1: Đang đăng
        // 0: Đã gỡ
    },
});

export const AdvertisementModel = mongoose.model('BaiVietQuangBa', schema);
