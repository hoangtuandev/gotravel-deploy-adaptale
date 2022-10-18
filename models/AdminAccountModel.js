import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    tkqtv_tendangnhap: {
        type: String,
        required: true,
    },
    tkqtv_matkhau: {
        type: String,
        required: true,
    },
    tkqtv_anhdaidien: {
        type: String,
    },
    tkqtv_trangthai: {
        type: Number,
    },
    tkqtv_nhanvien: {
        type: Object,
    },
});

export const AdminAccountModel = mongoose.model('TaiKhoanQuanTriVien', schema);
