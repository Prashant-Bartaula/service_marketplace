import User from "../models/userModel.js";
import {errorHandler} from "../utils/error.js";

export const signOut=async(req, res, next)=>{
    try {
        res.clearCookie("access_token").status(200).json({
            message:'user signed out successfully'
        })
    } catch (error) {
        next(error)
    }
}