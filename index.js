import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import multer from 'multer';
// import fs from 'fs';

import TypeTourismRouter from './routers/TypeTourismRouter.js';
import AdminRouter from './routers/AdminRouter.js';
import AdminAccountRouter from './routers/AdminAccountRouter.js';
import TouristAccountRouter from './routers/TouristAccountRouter.js';
import TouristRouter from './routers/TouristRouter.js';
import VehicleRouter from './routers/VehicleRouter.js';
import TourRouter from './routers/TourRouter.js';
import DepartureRouter from './routers/DepartureRouter.js';
import ScheduleTourRouter from './routers/ScheduleTourRouter.js';
import VoucherRouter from './routers/VoucherRouter.js';
import BookingTourRouter from './routers/BookingTourRouter.js';
import CalendarGuideRouter from './routers/CalendarGuideRouter.js';
import RatingTourRouter from './routers/RatingTourRouter.js';
import RatingGuideRouter from './routers/RatingGuideRouter.js';
import AdvertisementRouter from './routers/AdvertisementRouter.js';
import InteractAdvertisementRouter from './routers/InteractAdvertisementRouter.js';
import GuideRouter from './routers/GuideRouter.js';
import GuideAccountRouter from './routers/GuideAccountRouter.js';
import GuideCardRouter from './routers/GuideCardRouter.js';
import QualityGuideRouter from './routers/QualityGuideRouter.js';
import SharePostsRouter from './routers/SharePostsRouter.js';
import PostsCommentRouter from './routers/PostsCommentRouter.js';

const app = express();

dotenv.config();
// const upload = multer({ dest: './uploads' });
// const PORT = process.env.port || 5000;
const port = process.env.PORT || 5000;
// const URI =
//     'mongodb+srv://admin:PHTuan_2807@cluster0.rawux.mongodb.net/GoTravelDB?retryWrites=true&w=majority';
const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json());
app.use(cors());
app.use('/static', express.static('imageUploads'));

// Router
app.use('/TypeTourism', TypeTourismRouter);
app.use('/Admin', AdminRouter);
app.use('/AdminAccount', AdminAccountRouter);
app.use('/TouristAccount', TouristAccountRouter);
app.use('/Tourist', TouristRouter);
app.use('/Vehicle', VehicleRouter);
app.use('/Tour', TourRouter);
app.use('/Departure', DepartureRouter);
app.use('/ScheduleTour', ScheduleTourRouter);
app.use('/Voucher', VoucherRouter);
app.use('/BookingTour', BookingTourRouter);
app.use('/CalendarGuide', CalendarGuideRouter);
app.use('/RatingTour', RatingTourRouter);
app.use('/RatingGuide', RatingGuideRouter);
app.use('/Advertisement', AdvertisementRouter);
app.use('/InteractAdvertisement', InteractAdvertisementRouter);
app.use('/Guide', GuideRouter);
app.use('/GuideAccount', GuideAccountRouter);
app.use('/GuideCard', GuideCardRouter);
app.use('/QualityGuide', QualityGuideRouter);
app.use('/SharePosts', SharePostsRouter);
app.use('/PostsComment', PostsCommentRouter);

// app.post('/uploadFile', upload.single('avatar'), (req, res) => {
//     let fileType = req.file.mimetype.split('/')[1];
//     let newFileName = req.file.filename + '.' + fileType;

//     fs.rename(
//         `./uploads/${req.file.filename}`,
//         `./uploads/${newFileName}`,
//         () => {
//             res.send('200');
//         }
//     );
// });

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to GoTravelDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('err', err);
    });
