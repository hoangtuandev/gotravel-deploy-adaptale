import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    pt_ma: {
        type: String,
        required: true,
    },
    pt_ten: {
        type: String,
    },
});

export const VehicleModel = mongoose.model('PhuongTien', schema);
