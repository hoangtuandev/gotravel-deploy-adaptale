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

export const get30NextDayCalendarGuide = async (req, res) => {
    try {
        const current = new Date();
        const calendars = await CalendarGuideModel.find();

        const filterCalendar = (calendar) => {
            const departureDate = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            );

            if (departureDate > current) {
                return calendar;
            }
        };

        const result = calendars.filter(filterCalendar);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAvairiableCalendarGuide = async (req, res) => {
    try {
        const calendars = await CalendarGuideModel.find();

        const filterCalendarAvaiable = (calendar) => {
            if (
                calendar.ldt_tour.t_soluonghuongdanvien >
                calendar.ldt_huongdanvien.length
            ) {
                return calendar;
            }
        };
        const result = calendars.filter(filterCalendarAvaiable);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getCalendarGuideByAccount = async (req, res) => {
    try {
        const calendars = await CalendarGuideModel.find();
        const filterCalendarByAccount = (calendar) => {
            for (let i = 0; i < calendar.ldt_huongdanvien.length; i++) {
                if (calendar.ldt_huongdanvien[i]._id === req.body.idAccount) {
                    return calendar;
                }
            }
        };
        const result = calendars.filter(filterCalendarByAccount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getCalendarGuideByDeparture = async (req, res) => {
    try {
        const idDeparture = req.body._id;
        const calendars = await CalendarGuideModel.find();

        const filterCalendar = (calendar) => {
            if (idDeparture === calendar.ldt_lichkhoihanh._id.toString()) {
                return calendar;
            }
        };

        const result = calendars.filter(filterCalendar);
        res.status(200).json(result);
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

export const getGuideTimesByAccount = async (req, res) => {
    try {
        const username = req.body.username;
        const current = new Date();

        const calendars = await CalendarGuideModel.find();
        const filterCalendarsGuided = (calendar) => {
            const finishDate = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngayketthuc
            );
            for (let i = 0; i < calendar.ldt_huongdanvien.length; i++) {
                if (
                    calendar.ldt_huongdanvien[i].tkhdv_tendangnhap ===
                        username &&
                    finishDate < current
                ) {
                    return calendar;
                }
            }
        };
        const result = calendars.filter(filterCalendarsGuided);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getStatusCurrentOfGuide = async (req, res) => {
    try {
        const username = req.body.username;
        const calendars = await CalendarGuideModel.find();
        const current = new Date();

        const filterHappenningCalendar = (calendar) => {
            const startDate = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            );
            const finishDate = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngayketthuc
            );
            for (let i = 0; i < calendar.ldt_huongdanvien.length; i++) {
                if (
                    calendar.ldt_huongdanvien[i].tkhdv_tendangnhap ===
                        username &&
                    startDate <= current &&
                    finishDate >= current
                ) {
                    return calendar;
                }
            }
        };
        const result = calendars.filter(filterHappenningCalendar);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// parseInt(
//                         calendar.ldt_lichkhoihanh.lkh_ngayketthuc.getTime()
//                     ) > parseInt(current.getTime())
