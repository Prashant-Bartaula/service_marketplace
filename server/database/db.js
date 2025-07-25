import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongodb database')
    }catch(err){
        console.log(err.message)
    }
}

export default connectDB;