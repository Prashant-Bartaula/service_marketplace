import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import {createService, getServices} from '../controller/serviceController.js'

const router=express.Router();

router.post('/create', verifyUser, createService);
router.get('/getServices', getServices);

export default router;