import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    hdv_ma: {
        type: String,
    },
    hdv_hoten: {
        type: String,
    },
    hdv_gioitinh: {
        type: String,
    },
    hdv_namsinh: {
        type: Number,
    },
    hdv_quequan: {
        type: String,
    },
    hdv_mail: {
        type: String,
    },
    hdv_cccd: {
        type: String,
    },
    hdv_sodienthoai: {
        type: String,
    },
});

export const GuideModel = mongoose.model('HuongDanVien', schema);
