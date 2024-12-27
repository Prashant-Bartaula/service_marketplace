import express from 'express'
import {workerSignUp, userSignUp} from '../controller/authController.js'

const router = express.Router()

router.post('/user-sign-up', userSignUp)
router.post('/worker-sign-up', workerSignUp)

export default router