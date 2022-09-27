import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    thdv_ma: {
        type: String,
    },
    thdv_hoten: {
        type: String,
    },
    thdv_ngayhethan: {
        type: Date,
    },
    thdv_loaithe: {
        type: String,
    },
    thdv_ngoaingu: {
        type: Array,
    },
});

export const GuideCardModel = mongoose.model('TheHuongDanVien', schema);
