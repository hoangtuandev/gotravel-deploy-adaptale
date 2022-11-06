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
    bt_taikhoan: {
        type: Object,
    },
    bt_ngaydat: {
        type: Date,
    },
    bt_soluonghanhkhach: {
        type: Object,
    },
    bt_nguoilon: {
        type: Array,
    },
    bt_treem: {
        type: Array,
    },
    bt_embe: {
        type: Array,
    },
    bt_tongthanhtoan: {
        type: Number,
    },
    bt_trangthai: {
        type: Number,
        // 0:Bị hủy
        // 1: chờ xác nhận
        // 2: đã xác nhận
        // 3: Đang diễn ra
        // 3: Đã kết thúc
    },
});

export const BookingTourModel = mongoose.model('BookingTour', schema);
