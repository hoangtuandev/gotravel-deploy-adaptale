import { CalendarGuideModel } from '../models/CalendarGuideModel.js';

export const getCalendarGuide = async (req, res) => {
    try {
        const calendar = await CalendarGuideModel.aggregate([
            { $sort: { ldt_lichkhoihanh: 1 } },
        ]);
        // const calendar = await CalendarGuideModel.find();
        res.status(200).json(calendar);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addCalendarGuide = async (req, res) => {
    try {
        const data = req.body;
        const calendar = new CalendarGuideModel(data);
        await calendar.save();

        res.status(200).json(calendar);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
