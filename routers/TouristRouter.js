import express from 'express';
import {
    createTourist,
    getAllTourist,
    updateProfileTourist,
} from '../controllers/Tourist.js';

const router = express.Router();

router.get('/', getAllTourist);

router.post('/', createTourist);

router.post('/updateProfileTourist', updateProfileTourist);

export default router;
