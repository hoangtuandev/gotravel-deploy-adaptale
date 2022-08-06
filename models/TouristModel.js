import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    kdl_ma: {
        type: String,
        required: true,
    },
    kdl_hoten: {
        type: String,
    },
    kdl_cccd: {
        type: String,
    },
    kdl_gioitinh: {
        type: Number,
    },
    kdl_sotaikhoan: {
        type: String,
    },
    kdl_sodienthoai: {
        type: String,
    },
    kdl_email: {
        type: String,
    },
});

export const TouristModel = mongoose.model('KhachDuLich', schema);
