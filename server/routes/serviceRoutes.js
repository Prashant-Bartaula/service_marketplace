import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import {createService} from '../controller/serviceController.js'

const router=express.Router();

router.post('/create', verifyUser, createService);

export default router;