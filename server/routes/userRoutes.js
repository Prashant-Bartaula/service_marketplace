import express from 'express'
import {signOut} from '../controller/userController.js'

const router=express.Router()

router.get('/sign-out', signOut)

export default router