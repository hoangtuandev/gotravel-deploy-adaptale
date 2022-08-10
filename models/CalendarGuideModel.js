import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    ldt_tour: {
        type: Object,
    },
    ldt_lichkhoihanh: {
        type: Object,
    },
    ldt_huongdanvien: {
        type: Array,
    },
    ldt_soluonghdv: {
        type: Number,
    },
});

export const CalendarGuideModel = mongoose.model('LichDanTour', schema);
