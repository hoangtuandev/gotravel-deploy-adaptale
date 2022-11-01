import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    bvcs_ma: {
        type: String,
    },
    bvcs_noidung: {
        type: String,
    },
    bvcs_tieude: {
        type: String,
    },
    bvcs_hinhanhtieude: {
        type: String,
    },
    bvcs_luotthich: {
        type: Array,
    },
    bvcs_binhluan: {
        type: Array,
    },
    bvcs_luotchiase: {
        type: Array,
    },
    bvcs_taikhoan: {
        type: Object,
    },
    bvcs_thoigian: {
        type: Date,
    },
    bvcs_trangthai: {
        type: Number,
    },
});

export const SharePostsModel = mongoose.model('BaiVietChiaSe', schema);
