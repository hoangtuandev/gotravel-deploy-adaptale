import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ltt_ten: {
        type: String,
    },
    ltt_ngay: {
        type: Number,
    },
    ltt_noidung: {
        type: String,
    },
    ltt_hinhanh: {
        type: String,
    },
    ltt_phuongtien: {
        type: Object,
    },
});

export const ScheduleTour = mongoose.model('LichTrinhTour', schema);
