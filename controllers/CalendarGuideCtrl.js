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

export const registerCalendarGuideTour = async (req, res) => {
    try {
        const newGuide = req.body.guide;
        const idCalendar = req.body.idCalendar;
        const calendar = await CalendarGuideModel.find({ _id: idCalendar });

        var guideCurrent = calendar[0].ldt_huongdanvien;
        guideCurrent.push(newGuide);

        const result = await CalendarGuideModel.updateOne(
            {
                _id: idCalendar,
            },
            {
                $set: {
                    ldt_huongdanvien: guideCurrent,
                },
            }
        );
        const newCalendars = await CalendarGuideModel.find();
        res.status(200).json(newCalendars);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const cancelCalendarGuideTour = async (req, res) => {
    try {
        const idAccount = req.body.guide._id;
        const idCalendar = req.body.idCalendar;
        const calendar = await CalendarGuideModel.find({ _id: idCalendar });
        const registedGuides = calendar[0].ldt_huongdanvien;

        const filterRegistedGuides = (guide) => {
            return guide._id.toString() !== idAccount.toString();
        };
        // const result = registedGuides.filter(filterRegistedGuides);

        const result = await CalendarGuideModel.updateOne(
            {
                _id: idCalendar,
            },
            {
                $set: {
                    ldt_huongdanvien:
                        registedGuides.filter(filterRegistedGuides),
                },
            }
        );
        const newCalendars = await CalendarGuideModel.find();
        res.status(200).json(newCalendars);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
