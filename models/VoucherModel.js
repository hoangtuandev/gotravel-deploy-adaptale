import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    pgg_ma: {
        type: String,
        require: true,
    },
    pgg_giatri: {
        type: Number,
    },
    pgg_dieukien: {
        type: Number,
    },
    pgg_ngaybatdau: {
        type: Date,
    },
    pgg_ngayketthuc: {
        type: Date,
    },
});

export const VoucherModel = mongoose.model('PhieuGiamGia', schema);
