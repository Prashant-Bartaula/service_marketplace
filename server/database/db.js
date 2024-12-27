import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://marketplace:marketplace12@cluster0.19daf.mongodb.net/')
        console.log('Connected to MongoDB')
    }catch(err){
        console.log(err.message)
    }
}

export default connectDB;