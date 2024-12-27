import {errorHandler} from '../utils/error.js'
export const  userSignUp=async(req, res, next)=>{
    try {
        const {username, email,address, phone, password}=req.body

        if(!username || !email || !address || !phone || !password || username==='' || email==='' || address==='' || phone==='' || password===''){
            next(errorHandler(400, "All fields are required"))
        }

        res.json({
            username,
            email,
            address,
            phone
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