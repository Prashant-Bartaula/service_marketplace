import User from "../models/userModel.js";
import Worker from "../models/workerModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "unauthorized"));
  }
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if(req.body.hasOwnProperty('username')){
    if (req.body.username.length<7 || req.body.username.length>15) {
      return next(errorHandler(400, "username must be between 7 and 15 characters long"));
    }
  }

  if(req.body.hasOwnProperty('profilePic')){
    if(req.body.profilePic===''){
      return next(errorHandler(400, "profilePic is required"));
    }
  }

  if(req.body.hasOwnProperty('password')){
    if (!passwordRegex.test(req.body.password)){
      return next(
        errorHandler(
          400,
          "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }


  try {
    let updatedUser = {};
    if (req.user.role === "worker") {
      updatedUser = await Worker.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            profilePic: req.body.profilePic,
            password: req.body.password,
          },
        },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            profilePic: req.body.profilePic,
            password: req.body.password,
          },
        },
        { new: true }
      );
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      message: "user updated successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if(req.user.id!==req.params.userId){
    return next(errorHandler(401, "unauthorized"));
  }
  
  try {
    if(req.user.role==="worker"){
      await Worker.findByIdAndDelete(req.params.userId);
    }else{
      await User.findByIdAndDelete(req.params.userId);
    }

    res.status(200).clearCookie("access_token").json({
      message: "user deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      message: "user has been signed out",
    });
  } catch (error) {
    next(error);
  }
};

export const getWorker=async(req, res, next)=>{
  try {
    const worker=await Worker.findById(req.params.workerId);{
      if(!worker){
       return  next(errorHandler(400, "worker not found"));
      }
      const {password, ...rest}=worker._doc;
      res.status(200).json({
        worker:rest,
      })
    }
  } catch (error) {
    next(error);
  }
}
 