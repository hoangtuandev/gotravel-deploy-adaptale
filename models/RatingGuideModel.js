import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    dghdv_huongdanvien: {
        type: Object,
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
