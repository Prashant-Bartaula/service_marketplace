import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    workerId: {
      type: String,
      required: true,
    },
    workerUsername:{
      type:String,
      required:true,
    },
    description: {
      type: String,
      required: true,
    },
    isBooked:{
      type:Boolean,
      default:false
    },
    bookerId: {
      type: String,
      default: "",
    },
    serviceDate:{
      type:Date,
      required:true
    },
    serviceTime:{
      type:String,
      required:true,
    },
    servicePic: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7826.jpg",
    },
    price: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    slug:{
      type:String,
      required:true,
      unique:true,
    },
    views:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

export default mongoose.model("service", serviceSchema);
