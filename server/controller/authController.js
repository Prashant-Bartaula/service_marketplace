import User from "../models/userModel.js";
import Worker from "../models/workerModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const userSignUp = async (req, res, next) => {
  const { username, email, address, phone, password } = req.body;

  if (
    !username ||
    !email ||
    !address ||
    !phone ||
    !password ||
    username === "" ||
    email === "" ||
    address === "" ||
    phone === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const existingCustomer=await User.findOne({
    $or:[{username}, {phone}, {email}]
  })

  const existingWorker=await Worker.findOne({
    $or:[{username}, {phone}, {email}]
  })

  if(existingCustomer || existingWorker){
    return next(errorHandler(400, "user already exists"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    address,
    phone,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const workerSignUp = async (req, res, next) => {
  const { username, email, address, phone, password, workingHour, age, gender } = req.body;

  if (
    !username ||
    !email ||
    !address ||
    !phone ||
    !password ||
    !workingHour ||
    !age ||
    !gender ||
    username === "" ||
    email === "" ||
    address === "" ||
    phone === "" ||
    password === "" ||
    workingHour === "" ||
    age === "" ||
    gender === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const existingCustomer=await User.findOne({
    $or:[{username}, {phone}, {email}]
  })

  const existingWorker=await Worker.findOne({
    $or:[{username}, {phone}, {email}]
  })

  if(existingCustomer || existingWorker){
    return next(errorHandler(400, "user already exists"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Worker({
    username,
    email,
    address,
    phone,
    password: hashedPassword,
    workingHour,
    age,
    gender
  });

  try {
    await newUser.save();
    res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email === "" || !password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    const worker=await Worker.findOne({email});
    if(!user && !worker) {
      return next(errorHandler(400, "user not found"));
    }

    let token='';
    let roleBasedUser=[]
    if(user){
      if(!bcryptjs.compareSync(password, user.password)) {
        return next(errorHandler(401, "invalid username or password"));
      }
      token = jwt.sign({
        id:user._id,
        role:user.role
      }, process.env.JWT_SECRET);
      roleBasedUser=user._doc
    }else{
      if(!bcryptjs.compareSync(password, worker.password)) {
        return next(errorHandler(401, "invalid username or password"));
      }
      token = jwt.sign({
        id:worker._id,
        role:worker.role
      }, process.env.JWT_SECRET);

      roleBasedUser=worker._doc
    }
    
    const {password:pass, ...rest}=roleBasedUser

    res.status(200).cookie("access_token", token, { httpOnly: true }).json({
      success: true,
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
