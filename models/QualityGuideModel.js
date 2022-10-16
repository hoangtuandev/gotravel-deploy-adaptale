import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    clhdv_huongdanvien: {
        type: Object,
    },
    clhdv_saotrungbinh: {
        type: Number,
    },
});

export const QuanlityGuideModel = mongoose.model(
    'ChatLuongHuongDanVien',
    schema
);
