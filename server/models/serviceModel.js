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
    description: {
      type: String,
      required: true,
    },
    bookerId: {
      type: String,
      default: "",
    },
    serviceDate:{
      type:Date,
      required:true
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("service", serviceSchema);
