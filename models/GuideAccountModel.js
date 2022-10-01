import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    tkhdv_tendangnhap: {
        type: String,
    },
    tkhdv_matkhau: {
        type: String,
    },
    tkhdv_anhdaidien: {
        type: String,
    },
    tkhdv_trangthai: {
        type: Number,
    },
    tkhdv_huongdanvien: {
        type: Object,
    },
});

export const GuideAccountModel = mongoose.model('TaiKhoanHuongDanVien', schema);
