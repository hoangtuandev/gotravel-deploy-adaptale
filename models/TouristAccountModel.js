import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    tkkdl_tendangnhap: {
        type: String,
        required: true,
    },
    tkkdl_matkhau: {
        type: String,
        required: true,
    },
    tkkdl_anhdaidien: {
        type: String,
    },
    tkkdl_trangthai: {
        type: Number,
    },
    tkkdl_khachdulich: {
        type: Object,
    },
});

export const TouristAccountModel = mongoose.model(
    'TaiKhoanKhachDuLich',
    schema
);
