import User from "../models/userModel.js";
import Worker from '../models/workerModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";


export const updateUser=async(req, res, next)=>{
  if(req.user.id!==req.params.userId){
    return next(errorHandler(401, "unauthorized"));
  }

  if(req.body.username){
    if(req.body.username.length <8 || req.body.username >15){
      return next(errorHandler(400, 'username must be 8 to 15 characters long'))
    }
  }
  const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if(req.body.password){
    if(!passwordRegex.test(req.body.password)){
      return next(errorHandler(400, 'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'))
    }
    req.body.password=bcryptjs.hashSync(req.body.password, 10);
  }
  
  try {
    let updatedUser={}
      if(req.user.role==='worker'){
         updatedUser=await Worker.findByIdAndUpdate(req.params.userId, {
          $set:{
              username: req.body.username,
              profilePic: req.body.profilePic,
              password:req.body.password
          }
      }, {new:true});
      }else{
        updatedUser=await User.findByIdAndUpdate(req.params.userId, {
          $set:{
            username:req.body.username,
            profilePic:req.body.profilePic,
            password:req.body.password
          }
        }, {new:true})
      }

      const {password, ...rest}=updatedUser._doc

      res.status(200).json({
        message:"user updated successfully",
        user:rest
      })
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({
      message:"user has been signed out",
  })
  } catch (error) {
    next(error);
  }
};
