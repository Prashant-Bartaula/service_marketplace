import express from 'express'
import { verifyUser } from '../utils/verifyUser.js';
import {createService, getServices, getCustomerServices, getWorkerServices, deleteService, updateService} from '../controller/serviceController.js'

const router=express.Router();

router.post('/create', verifyUser, createService);
router.get('/getServices', getServices);
router.post('/getCustomerServices', verifyUser, getCustomerServices);
router.post("/getWorkerServices", verifyUser, getWorkerServices);
router.delete('/deleteService/:serviceId/:workerId', verifyUser, deleteService);
router.put('/updateService/:serviceId/:workerId', verifyUser, updateService);

export default router;