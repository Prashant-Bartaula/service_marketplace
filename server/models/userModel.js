import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
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
    isAdmin:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    }
}, {timestamps:true})

export default mongoose.model('User', userSchema);