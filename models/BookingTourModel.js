import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    bt_ma: {
        type: String,
        require: true,
    },
    bt_tour: {
        type: Object,
    },
    bt_lichkhoihanh: {
        type: Object,
    },
    bt_thongtinlienhe: {
        type: Object,
    },
    bt_thongtinthanhtoan: {
        type: Object,
    },
    bt_ngaydat: {
        type: Date,
    },
    bt_soluonghanhkhach: {
        type: Object,
    },
    bt_giamgia: {
        type: Object,
    },
    bt_tongthanhtoan: {
        type: Number,
    },
    bt_trangthai: {
        type: Number,
    },
});

export const BookingTourModel = mongoose.model('BookingTour', schema);
