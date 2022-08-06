import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import TypeTourismRouter from './routers/TypeTourismRouter.js';
import AdminRouter from './routers/AdminRouter.js';
import AdminAccountRouter from './routers/AdminAccountRouter.js';
import TouristAccountRouter from './routers/TouristAccountRouter.js';
import TouristRouter from './routers/TouristRouter.js';
import VehicleRouter from './routers/VehicleRouter.js';
import TourRouter from './routers/TourRouter.js';
import DepartureRouter from './routers/DepartureRouter.js';

const app = express();
const PORT = process.env.port || 5000;
const URI =
    'mongodb+srv://admin:PHTuan_2807@cluster0.rawux.mongodb.net/GoTravelDB?retryWrites=true&w=majority';

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json());
app.use(cors());

// Router
app.use('/TypeTourism', TypeTourismRouter);
app.use('/Admin', AdminRouter);
app.use('/AdminAccount', AdminAccountRouter);
app.use('/TouristAccount', TouristAccountRouter);
app.use('/Tourist', TouristRouter);
app.use('/Vehicle', VehicleRouter);
app.use('/Tour', TourRouter);
app.use('/Departure', DepartureRouter);

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to GoTravelDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('err', err);
    });
