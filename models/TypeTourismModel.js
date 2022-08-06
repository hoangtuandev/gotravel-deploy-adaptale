import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    lht_ma: {
        type: String,
        required: true,
    },
    lht_ten: {
        type: String,
        required: true,
    },
});

export const TypeTourismModel = mongoose.model('LoaiHinhTour', schema);
