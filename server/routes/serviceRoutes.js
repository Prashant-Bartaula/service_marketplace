import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import {createService, getServices, getCustomerServices, getWorkerServices, deleteService, updateService, getTrendingServices, bookService,getWorkerPostedServices } from '../controller/serviceController.js'

const router=express.Router();

router.post('/create/:username', verifyUser, createService);
router.get('/getServices', getServices);
router.get('/getTrendingServices', getTrendingServices)
router.post('/getCustomerServices', verifyUser, getCustomerServices);
router.post("/getWorkerServices", verifyUser, getWorkerServices);
router.delete('/deleteService/:serviceId/:workerId', verifyUser, deleteService);
router.put('/bookService/:serviceId/:userId', verifyUser, bookService);
router.put('/updateService/:serviceId/:workerId', verifyUser, updateService);
router.post('/getWorkerPostedServices/:workerId', getWorkerPostedServices);

export default router;