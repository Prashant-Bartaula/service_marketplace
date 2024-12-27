import express from 'express'
import {workerSignUp, userSignUp, signIn} from '../controller/authController.js'

const router = express.Router()

router.post('/user-sign-up', userSignUp)
router.post('/worker-sign-up', workerSignUp)
router.post('/sign-in', signIn)

export default router