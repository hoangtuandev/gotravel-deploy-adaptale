import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    blbv_ma: {
        type: String,
        required: true,
    },
    blbv_noidung: {
        type: String,
    },
    blbv_taikhoan: {
        type: Object,
    },
    blbv_thoigian: {
        type: Date,
    },
});

export const PostsCommentModel = mongoose.model('BinhLuanBaiViet', schema);
