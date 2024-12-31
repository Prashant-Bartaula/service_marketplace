import Service from "../models/serviceModel.js";
import { errorHandler } from "../utils/error.js";

export const createService=async(req,res, next)=>{
    const {title, category, description, serviceDate, servicePic, price}=req.body

    if(!req.user ||!req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"))
    }
    
    if(!title || !category || !description || !serviceDate || !price || title==='' || category==='' || description==='' || serviceDate==='' || price===''){
        return next(errorHandler(400, "fill all the required fields..."));
    }

    const slug=`${title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-")}${Math.floor(Math.random()*100000)}`

    const newService=new Service({
        title, category, description, serviceDate, servicePic:servicePic || undefined, price:parseInt(price), workerId:req.user.id, slug
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

export const getServices=async(req, res, next)=>{
    try {
        const startIndex=req.query.startIndex || 0;
        const limit= req.query.limit || 10;
        const sortDirection=req.query.order==='asc'?1:-1
        const services=await Service.find({
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.workerId && {workerId:req.query.workerId}),
            ...(req.query.searchTerm && {
                    $or:[
                        {title:{$regex:req.query.searchTerm, $options:"i"}},
                        {category:{$regex:req.query.searchTerm, $options:"i"}},
                    ]
            })
        }).sort({
            updatedAt:sortDirection
        }).skip(startIndex).limit(limit);

        const totalServices=await Service.countDocuments();

        const dateNow=new Date();

        const lastMonthAgo= new Date(
            dateNow.getFullYear(),
            dateNow.getMonth()-1,
            dateNow.getDate()
        );

        const lastMonthServices=await Service.countDocuments({
            createdAt:{$gte:lastMonthAgo}
        })
        if(!services){
            return next(errorHandler(400, "no services found..."));
        }

        res.status(200).json({
            services,
            totalServices,
            lastMonthServices
        })
    } catch (error) {
        next(error)
    }
}