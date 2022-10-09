import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    dghdv_ma: {
        type: String,
    },
    dghdv_huongdanvien: {
        type: String,
    },
    dghdv_booking: {
        type: Object,
    },
    dghdv_thoigian: {
        type: Date,
    },
    dghdv_saodanhgia: {
        type: Number,
    },
    dghdv_nhanxet: {
        type: String,
    },
});

export const RatingGuideModel = mongoose.model('DanhGiaHuongDanVien', schema);
