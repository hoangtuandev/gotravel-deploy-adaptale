import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    lkh_ngaykhoihanh: {
        type: Date,
    },
    lkh_ngayketthuc: {
        type: Date,
    },
    lkh_diadiem: {
        type: String,
    },
    lkh_phuongtien: {
        type: Array,
    },
});

export const DepartureModel = mongoose.model('LichKhoiHanh', schema);
