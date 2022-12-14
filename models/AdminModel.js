import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    qtv_ma: {
        type: String,
        require: true,
    },
    qtv_hoten: {
        type: String,
        required: true,
    },
    qtv_namsinh: {
        type: Number,
    },
    qtv_gioitinh: {
        type: String,
    },
    qtv_sodienthoai: {
        type: String,
    },
    qtv_email: {
        type: String,
    },
    qtv_diachi: {
        type: String,
    },
    qtv_chucvu: {
        type: String,
    },
});

export const AdminModel = mongoose.model('QuanTriVien', schema);
