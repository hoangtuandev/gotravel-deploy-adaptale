import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    t_ma: {
        type: String,
        require: true,
    },
    t_ten: {
        type: String,
    },
    t_loaihinh: {
        type: Object,
    },
    t_thoigian: {
        type: Number,
    },
    t_gia: {
        type: Number,
    },
    t_soluongkhach: {
        type: Number,
    },
    t_soluonghuongdanvien: {
        type: Number,
    },
    t_hinhanh: {
        type: Array,
    },
    t_lichkhoihanh: {
        type: Array,
    },
    t_lichtrinhtour: {
        type: Array,
    },
    t_trangthai: {
        type: Number,
    },
    t_danhgia: {
        type: Number,
    },
});

export const TourModel = mongoose.model('Tour', schema);
