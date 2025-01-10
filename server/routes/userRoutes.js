import express from 'express'
import {updateUser,deleteUser, signOut, getWorker, rateWorker} from '../controller/userController.js'
import { verifyUser } from '../utils/verifyUser.js'

const router=express.Router()

router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.post('/sign-out', signOut)
router.get('/getWorker/:workerId', getWorker);
router.post('/rateWorker/:workerId', rateWorker);

export default router