import Service from "../models/serviceModel.js";
import { errorHandler } from "../utils/error.js";

export const createService=async(req,res, next)=>{
    const {title, category, description, serviceDate, servicePic, price, serviceTime}=req.body

    if(!req.user ||!req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"))
    }
    
    if(!title || !category || !description || !serviceDate || !price || !serviceTime || title==='' || category==='' || description==='' || serviceDate==='' || price==='' || serviceTime===''){
        return next(errorHandler(400, "fill all the required fields..."));
    }
    
    const currentTime=new Date();
    const oneDayAhead=new Date(currentTime.getTime() + 6*60*60*1000);
    if(new Date(serviceDate)<=oneDayAhead){
        return next(errorHandler(400, "service date must be at least 6 hours ahead..."));
    }
    const slug=`${title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-")}${Math.floor(Math.random()*100000)}`

    const newService=new Service({
        title, category, description, serviceDate,serviceTime, servicePic:servicePic || undefined, price:parseInt(price), workerId:req.user.id, slug
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
        if(req.query.slug){
            await Service.findOneAndUpdate({slug:req.query.slug}, {$inc:{views:1}});
        }
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

export const getCustomerServices=async(req, res, next)=>{
    if(!req.user || !req.user.role==='customer'){
        return next(errorHandler(401, "unauthorized"));
    }

    try {
        const services=await Service.find({bookerId:req.user.id});
        const ongoingService=await Service.countDocuments({
            bookerId:req.user.id,
        })
        const completedService=await Service.countDocuments({
            bookerId:req.user.id,
            isCompleted:true
        })
        if(!services){
            return next(errorHandler(400, "no services found..."));
        }
        res.status(200).json({
            services,
            ongoingService,
            completedService
        })
    } catch (error) {
        next(error)
    }
}

export const getWorkerServices=async(req, res, next)=>{
    if(!req.user || !req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"));
    }
    try {
        const services=await Service.find({workerId:req.user.id});
        let totalIncome=0;
        services.forEach(element => {
            element.isCompleted && (totalIncome+=element.price);
        });
        const postedServices=await Service.countDocuments({workerId:req.user.id});
        const ongoingService=await Service.countDocuments({
            isBooked:true,
            workerId:req.user.id
        })
        const completedService=await Service.countDocuments({
            isCompleted:true,
            workerId:req.user.id
        })
        if(!services){
            return next(errorHandler(400, "no services found..."));
        }

        res.status(200).json({
            services,
            ongoingService,
            completedService,
            postedServices,
            totalIncome
        })
    } catch (error) {
        next(error);
    }
}

export const getTrendingServices=async(req, res, next)=>{
    try {
        const services=await Service.find().sort({views:-1}).limit(10);
        if(!services){
            return next(errorHandler(400, "no services found..."));
        }
        res.status(200).json({
            services
        })
    } catch (error) {
        next(error);
    }
}
export const deleteService=async(req, res, next)=>{
    if(!req.user.id===req.params.workerId || !req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"));
    }
    try {
        await Service.findByIdAndDelete(req.params.serviceId);
        res.status(200).json({
            message:"service deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const updateService=async(req, res, next)=>{
    const  {title, category, description, serviceDate, servicePic, price, serviceTime}=req.body;
    let {slug}=req.body;
    if(!req.user.id===req.params.workerId || !req.user.role==='worker'){
        return next(errorHandler(401, "unauthorized"));
    }

    if(!title || !category || !description || !serviceDate || !price || !serviceTime || title==='' || category==='' || description==='' || serviceDate==='' || price==='' || serviceTime===''){
        return next(errorHandler(400, "fill all the required fields..."));
    }
    const currentTime=new Date();
    const oneDayAhead=new Date(currentTime.getTime() + 6*60*60*1000);
    if(new Date(serviceDate)<=oneDayAhead){
        return next(errorHandler(400, "service date must be at least 6 hours ahead..."));
    }
    try {
        const service=await Service.findById(req.params.serviceId);
        if(service.isCompleted || service.isBooked){
            return next(errorHandler(400, "service is under progress or completed, cant be updated..."));
        }
        if(service.title!==title){
            slug=`${title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-")}${Math.floor(Math.random()*100000)}`
        }
        const updatedService= await Service.findByIdAndUpdate(req.params.serviceId, {
            $set:{
                title, category, description, serviceDate, servicePic:servicePic || undefined, price:parseInt(price), slug:slug
            }
        }, {new:true});
        if(!updatedService){
            return next(errorHandler(401, "service could not be updated..."));
        }
        res.status(200).json({
            updatedService
        })
    } catch (error) {
        next(error)
    }
}

