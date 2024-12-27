import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'

export const  userSignUp=async(req, res, next)=>{
    const {username, email,address, phone, password}=req.body
    
    if(!username || !email || !address || !phone || !password || username==='' || email==='' || address==='' || phone==='' || password===''){
       return next(errorHandler(400, "All fields are required"))
    }
    
    const hashedPassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({
        username, 
        email, 
        address, 
        phone,
        password:hashedPassword
    })

    try {
        await newUser.save();
        res.status(200).json({
            message:'user created successfully',
        })
    } catch (error) {
        next(error)
    }
}
export const  workerSignUp=async(req, res, next)=>{
    try {
        if(true){
            return next(errorHandler(404, "User already exist"))
        }
    } catch (error) {
        next(error)
    }
}