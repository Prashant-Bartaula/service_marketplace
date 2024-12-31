import Service from "../models/serviceModel.js";
import { errorHandler } from "../utils/error.js";

export const createService=async(req,res, next)=>{
    const {title, category, description, serviceDate, servicePic, gallery, price}=req.body

    if(!req.user ||!req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"))
    }
    
    if(!title || !category || !description || !serviceDate || !price || title==='' || category==='' || description==='' || serviceDate==='' || price===''){
        return next(errorHandler(400, "fill all the required fields..."));
    }

    const slug=`${title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-")}${new Date().toLocaleDateString()}`

    const newService=new Service({
        title, category, description, serviceDate, servicePic, gallery, price, workerId:req.user.id, slug
    });

    try {
        await newService.save();
        if(!newService){
            return next(errorHandler(400, "there was some problem please try again..."));
        }
        res.status(200).json({
            message:"service created successfully",
            newService
        })
    } catch (error) {
        next(error)
    }
}