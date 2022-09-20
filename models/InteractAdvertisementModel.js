import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ttbqb_taikhoan: {
        type: String,
    },
    ttbqb_baiviet: {
        type: Object,
    },
    ttbqb_daluu: {
        type: Boolean,
    },
    ttbqb_dathich: {
        type: Boolean,
    },
});

export const InteractAdvertisementModel = mongoose.model(
    'TuongTacBaiQuangBa',
    schema
);
