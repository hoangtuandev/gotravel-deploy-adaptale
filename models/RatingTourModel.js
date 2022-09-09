import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    dgt_ma: {
        type: String,
    },
    dgt_khachdulich: {
        type: Object,
    },
    dgt_tour: {
        type: Object,
    },
    dgt_thoigian: {
        type: Date,
    },
    dgt_saodanhgia: {
        type: Number,
    },
    dgt_nhanxet: {
        type: String,
    },
});

export const RatingTourModel = mongoose.model('DanhGiaTour', schema);
