import { CalendarGuideModel } from '../models/CalendarGuideModel.js';
import moment from 'moment';

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

export const getCalendarGuidebyDeaprtureDate = async (req, res) => {
    try {
        const date = moment(req.body.date).format('DD/MM/YYYY');
        const calendars = await CalendarGuideModel.find();

        const filterCalendar = (calendar) => {
            const departureDate = moment(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            ).format('DD/MM/YYYY');

            if (date === departureDate) {
                return calendar;
            }
        };

        const result = calendars.filter(filterCalendar);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const searchingCalendarGuideByTourName = async (req, res) => {
    try {
        const key = req.body.keySearching;
        console.log(key);
        function removeVietnameseTones(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
            str = str.replace(/đ/g, 'd');
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
            str = str.replace(/Đ/g, 'D');

            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
            str = str.replace(/\u02C6|\u0306|\u031B/g, '');
            str = str.replace(/ + /g, ' ');
            str = str.trim();

            str = str.replace(
                /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                ' '
            );
            return str;
        }
        // get 30 next day calendar guide
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
        const filtedCalendar = calendars.filter(filterCalendar);

        const convertKey = removeVietnameseTones(key).toLowerCase();

        const fillterCalendarByKey = (calendar) => {
            return removeVietnameseTones(calendar.ldt_tour.t_ten)
                .toLowerCase()
                .includes(convertKey.toLowerCase());
        };

        const result = filtedCalendar.filter(fillterCalendarByKey);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAvairiableCalendarGuide = async (req, res) => {
    try {
        const current = new Date();
        const calendars = await CalendarGuideModel.find();

        const filterCalendarAvaiable = (calendar) => {
            const departure = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            );
            if (
                calendar.ldt_tour.t_soluonghuongdanvien >
                    calendar.ldt_huongdanvien.length &&
                departure > current
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
        const current = new Date();
        const calendars = await CalendarGuideModel.find();
        const filterCalendarByAccount = (calendar) => {
            const departure = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            );
            for (let i = 0; i < calendar.ldt_huongdanvien.length; i++) {
                if (
                    calendar.ldt_huongdanvien[i]._id === req.body.idAccount &&
                    departure > current
                ) {
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
        const current = new Date();
        const newGuide = req.body.guide;
        const idCalendar = req.body.idCalendar;
        const calendar = await CalendarGuideModel.find({ _id: idCalendar });

        var guideCurrent = calendar[0].ldt_huongdanvien;
        guideCurrent.push(newGuide);

        await CalendarGuideModel.updateOne(
            {
                _id: idCalendar,
            },
            {
                $set: {
                    ldt_huongdanvien: guideCurrent,
                },
            }
        );

        const calendars = await CalendarGuideModel.find();
        const filterCalendarAvaiable = (calendar) => {
            const departure = new Date(
                calendar.ldt_lichkhoihanh.lkh_ngaykhoihanh
            );
            if (
                calendar.ldt_tour.t_soluonghuongdanvien >
                    calendar.ldt_huongdanvien.length &&
                departure > current
            ) {
                return calendar;
            }
        };
        const result = calendars.filter(filterCalendarAvaiable);
        // const newCalendars = await CalendarGuideModel.find();
        res.status(200).json(result);
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

export const deleteRegistedGuide = async (req, res) => {
    try {
        const username = req.body.username;
        const idCalendar = req.body.idCalendar;

        const calendar = await CalendarGuideModel.find({ _id: idCalendar });

        const updateGuides = calendar[0].ldt_huongdanvien.filter((guide) => {
            if (username !== guide.tkhdv_tendangnhap) {
                return guide;
            }
        });

        const result = await CalendarGuideModel.updateOne(
            {
                _id: idCalendar,
            },
            {
                $set: {
                    ldt_huongdanvien: updateGuides,
                },
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
