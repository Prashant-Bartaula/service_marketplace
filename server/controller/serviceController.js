import Service from "../models/serviceModel.js";
import Worker from "../models/workerModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import moment from "moment";
export const createService = async (req, res, next) => {
  const {
    title,
    category,
    description,
    serviceDate,
    servicePic,
    price,
    serviceTime,
  } = req.body;

  if (!req.user || !req.user.role === "worker" || req.user.role==='admin') {
    return next(errorHandler(401, "unauthorized"));
  }

  if (
    !title ||
    !category ||
    !description ||
    !serviceDate ||
    !price ||
    !serviceTime ||
    title === "" ||
    category === "" ||
    description === "" ||
    serviceDate === "" ||
    price === "" ||
    serviceTime === ""
  ) {
    return next(errorHandler(400, "fill all the required fields..."));
  }

  const currentTime = new Date();
  const oneDayAhead = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
  if (new Date(serviceDate) <= oneDayAhead) {
    return next(
      errorHandler(400, "service date must be at least 6 hours ahead...")
    );
  }
  const slug = `${title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-")}${Math.floor(Math.random() * 100000)}`;

  const newService = new Service({
    title,
    category,
    description,
    serviceDate,
    serviceTime,
    servicePic: servicePic || undefined,
    price: parseInt(price),
    workerId: req.user.id,
    workerUsername: req.params.username,
    slug,
  });

  try {
    await newService.save();
    if (!newService) {
      return next(
        errorHandler(400, "there was some problem please try again...")
      );
    }
    res.status(200).json({
      message: "service created successfully",
      newService,
    });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 10;

    if (req.query.slug) {
      await Service.findOneAndUpdate(
        { slug: req.query.slug },
        { $inc: { views: 1 } }
      );
    }

    const allservices = await Service.find({
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.workerId && { workerId: req.query.workerId }),
      ...(req.query.min && { price: { $gte: parseInt(req.query.min) } }),
      ...(req.query.max && { price: { $lte: parseInt(req.query.max) } }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { category: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({
        ...(req.query.priceOrder !== "" && {
          price: req.query.priceOrder === "asc" ? 1 : -1,
        }),
        ...(req.query.order !== "" && {
          createdAt: req.query.order === "asc" ? 1 : -1,
        }),
      })
      .skip(startIndex)
      .limit(limit);

      
      const services=allservices.filter((service)=>{
        if(!service.isBooked){
          if(moment(service.serviceDate).format("YYYY-MM-DD") >= moment().subtract(2, "days").format("YYYY-MM-DD")){
            return service;
          }
        }else{
          if(!service.isCompleted && moment(service.serviceDate).format("YYYY-MM-DD") >= moment().subtract(4, "days").format("YYYY-MM-DD")){
            return service
          }
        }
      })
    const totalServices = await Service.countDocuments();

    const dateNow = new Date();
    
    const lastMonthAgo = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() - 1,
      dateNow.getDate()
    );
    
    const lastMonthServices = await Service.countDocuments({
      createdAt: { $gte: lastMonthAgo },
    });

    if (!services) {
      return next(errorHandler(400, "no services found..."));
    }

    res.status(200).json({
      services,
      totalServices,
      lastMonthServices,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerServices = async (req, res, next) => {
  if (!req.user || !req.user.role === "customer") {
    return next(errorHandler(401, "unauthorized"));
  }

  try {
    const services = await Service.find({ bookerId: req.user.id });
    const ongoingService = await Service.countDocuments({
      bookerId: req.user.id,
    });
    const completedService = await Service.countDocuments({
      bookerId: req.user.id,
      isCompleted: true,
    });
    if (!services) {
      return next(errorHandler(400, "no services found..."));
    }
    res.status(200).json({
      services,
      ongoingService,
      completedService,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkerServices = async (req, res, next) => {
  if (!req.user || !req.user.role === "worker" || !req.user.role === "admin") {
    return next(errorHandler(401, "unauthorized"));
  }
  try {
    const services = await Service.find({ workerId: req.user.id });
    let totalIncome = 0;
    services.forEach((element) => {
      element.isCompleted && (totalIncome += element.price);
    });
    const postedServices = await Service.countDocuments({
      workerId: req.user.id,
    });
    const ongoingService = await Service.countDocuments({
      isBooked: true,
      workerId: req.user.id,
    });
    const completedService = await Service.countDocuments({
      isCompleted: true,
      workerId: req.user.id,
    });
    if (!services) {
      return next(errorHandler(400, "no services found..."));
    }

    res.status(200).json({
      services,
      ongoingService,
      completedService,
      postedServices,
      totalIncome,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendingServices = async (req, res, next) => {
  try {
    const allservices = await Service.find().sort({ views: -1 }).limit(10);
    if (!allservices) {
      return next(errorHandler(400, "no services found..."));
    }
    const services=allservices.filter((service)=>{
      if(!service.isBooked){
          if(moment(service.serviceDate).format("YYYY-MM-DD") >= moment().subtract(2, "days").format("YYYY-MM-DD")){
            return service;
          }
      }else{
        if(!service.isCompleted && moment(service.serviceDate).format("YYYY-MM-DD") >= moment().subtract(4, "days").format("YYYY-MM-DD")){
          return service
        }
      }
    })
    res.status(200).json({
      services,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteService = async (req, res, next) => {
  if (!req.user.id === req.params.workerId || !req.user.role === "worker" || !req.user.role === "admin") {
    return next(errorHandler(401, "unauthorized"));
  }
  try {
    await Service.findByIdAndDelete(req.params.serviceId);
    res.status(200).json({
      message: "service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const {
    title,
    category,
    description,
    serviceDate,
    servicePic,
    price,
    serviceTime,
  } = req.body;
  let { slug } = req.body;
  if (!req.user.id === req.params.workerId || !req.user.role === "worker") {
    return next(errorHandler(401, "unauthorized"));
  }

  if (
    !title ||
    !category ||
    !description ||
    !serviceDate ||
    !price ||
    !serviceTime ||
    title === "" ||
    category === "" ||
    description === "" ||
    serviceDate === "" ||
    price === "" ||
    serviceTime === ""
  ) {
    return next(errorHandler(400, "fill all the required fields..."));
  }
  const currentTime = new Date();
  const oneDayAhead = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
  if (new Date(serviceDate) <= oneDayAhead) {
    return next(
      errorHandler(400, "service date must be at least 6 hours ahead...")
    );
  }
  try {
    const service = await Service.findById(req.params.serviceId);
    if (service.isCompleted || service.isBooked) {
      return next(
        errorHandler(
          400,
          "service is under progress or completed, cant be updated..."
        )
      );
    }
    if (service.title !== title) {
      slug = `${title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-")}${Math.floor(Math.random() * 100000)}`;
    }
    const updatedService = await Service.findByIdAndUpdate(
      req.params.serviceId,
      {
        $set: {
          title,
          category,
          description,
          serviceDate,
          servicePic: servicePic || undefined,
          price: parseInt(price),
          slug: slug,
        },
      },
      { new: true }
    );
    if (!updatedService) {
      return next(errorHandler(401, "service could not be updated..."));
    }
    res.status(200).json({
      updatedService,
    });
  } catch (error) {
    next(error);
  }
};

export const bookService = async (req, res, next) => {
  if (
    !req.user ||
    !req.user.id === req.params.userId ||
    !req.user.role === "customer" ||
    req.user.role==='admin'
  ) {
    next(errorHandler(401, "unauthorized"));
  }
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return next(errorHandler(400, "service not found..."));
    }
    if(service.isBooked && service.bookerId !== req.user.id){
      next(errorHandler(401, "service is already booked..."));
    }
    const updatedService = await Service.findByIdAndUpdate(
      req.params.serviceId,
      {$set: { isBooked: !service.isBooked,
        bookerId: service.isBooked?'':req.user.id
         }},
      { new: true}
    );
    if (!updatedService) {
      return next(errorHandler(400, "service could not be updated..."));
    }
    res.status(200).json({
      updatedService,
      message: "service has been booked successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getWorkerPostedServices=async(req, res,next)=>{
  try {
    const services = await Service.find({ workerId: req.params.workerId });
    const completedService = await Service.countDocuments({
      isCompleted: true,
      workerId: req.params.workerId,
    });
    if (!services) {
      return next(errorHandler(400, "no services found..."));
    }

    res.status(200).json({
      services,
      completedService,
    });
  } catch (error) {
    next(error)
  }
}

export const getAllServices=async(req, res, next)=>{
  if(!req.user || !req.user.role==="admin"){
    return next(errorHandler(401, "unauthorized..."));
  }
  try {
    const startIndex=req.query.startIndex || 0;
    const services=await Service.find({...(req.query.workerId && {workerId: req.query.workerId})}).skip(startIndex).limit(20);

    if(!services){
      return next(errorHandler(400, "no services found..."));
    }
    const postedServices = await Service.countDocuments();
    const ongoingService = await Service.countDocuments({
      isBooked: true,
    });
    const completedService = await Service.countDocuments({
      isCompleted: true,
    });

    const dateNow = new Date();
    
    const lastMonthAgo = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() - 1,
      dateNow.getDate()
    );
    
    const lastMonthServices = await Service.countDocuments({
      createdAt: { $gte: lastMonthAgo },
    });
    const totalWorker=await Worker.countDocuments({role:"worker"});
    const totalCustomer=await User.countDocuments({role:"customer"});
    res.status(200).json({
      services,
      postedServices,
      ongoingService,
      completedService,
      lastMonthServices,
      totalWorker,
      totalCustomer
    })
  } catch (error) {
    next(error);
  }
}