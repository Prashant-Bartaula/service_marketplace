import mongoose from 'mongoose'

const workerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'worker'
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    workingHour:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    profilePic:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
}, {timestamps:true})

export default mongoose.model('worker', workerSchema);