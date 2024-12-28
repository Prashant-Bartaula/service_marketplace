import express from 'express'
import {updateUser,deleteUser, signOut} from '../controller/userController.js'
import { verifyUser } from '../utils/verifyUser.js'

const router=express.Router()

router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.post('/sign-out', signOut)

export default router