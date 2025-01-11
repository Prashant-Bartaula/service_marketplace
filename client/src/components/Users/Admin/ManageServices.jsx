import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import moment from "moment";
import Model from "../../Model";
export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [workerId, setWorkerId] = useState("");
  const [worker, setWorker] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(()=>{
    const getServices=async()=>{
      setErrorMessage("");
      setError("");
      setSuccessMessage("");
      try {
        const res=await fetch(`http://localhost:5000/api/service/getAllServices`, {
          method:"POST",
          credentials:"include"
        });
        const data=await res.json();
        if(!res.ok){
          return setErrorMessage(data.message);
        };
        data.services.length>19?setShowMore(true):setShowMore(false);
        setSuccessMessage(data.message);
        setServices(data.services);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getServices();
  }, [])
  
//   delete service
const handleDelete=async()=>{
  setError("");
  setSuccessMessage("");
  try {
      const res=await fetch(`http://localhost:5000/api/service/deleteService/${serviceId}/${currentUser?._id}`, {
          method:"DELETE",
          credentials:"include"
      })
      const data=await res.json();
      if(!res.ok){
          return setError(data.message);
      }
      setSuccessMessage(data.message);
      setServices(ser=>ser.filter(item=>item._id!==serviceId));
  } catch (error) {
    setError(error.message);
  }finally{
    setModelOpen(false);
  }
}

//  getWorker 
useEffect(() => {
  const getWorker = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/getWorkers`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return alert(data.message);
      }
      setWorker(data.workers);
    } catch (error) {
      alert(error);
    } 
};
getWorker();
}, [])
const fetchMore=async()=>{
    setErrorMessage("");
  const startIndex=services.length;
  try {
      const res=await fetch(`http://localhost:5000/api/service/getAllServices?startIndex=${startIndex}`, {
          method:"POST",
          credentials:"include"
      });
      const data=await res.json();
      if(!res.ok){
          return setErrorMessage(data.message);
      };
      data.services.length>19?setShowMore(true):setShowMore(false);
      setServices([...services, ...data.services]);
    }catch (error) {
        setErrorMessage(error.message);
    }
}

//filter by worker 
const filterByWorker=async()=>{
  setErrorMessage("");
  try {
    setLoading(true);
      const res=await fetch(`http://localhost:5000/api/service/getAllServices?workerId=${workerId}`, {
          method:"POST",
          credentials:"include"
      });
      const data=await res.json();
      if(!res.ok){
          return setErrorMessage(data.message);
      };
      setServices(data.services);
    }catch (error) {
        setErrorMessage(error.message);
    }finally{
        setLoading(false);
    }
}
  return errorMessage || services.length===0?(<h1 className="text-2xl text-gray-300 text-center mt-24">Services not found</h1>):loading?( 
  <div className="flex items-center justify-center">
     <dotlottie-player
    src="https://lottie.host/83f8b309-b39c-4ae6-bee9-58f7bdda0024/LVfoSN8zfR.lottie"
    background="transparent"
    speed="1"
    style={{ width: "500px", height: "500px" }}
    loop
    autoplay
  ></dotlottie-player>
    </div>
   ):(
    <>
<div className="flex flex-col gap-6 w-full  overflow-x-scroll">
    <div>
        <select name="worker" id="worker" className="text-sm border p-2 border-gray-500 outline-none cursor-pointer" onChange={(e)=>{
            setWorkerId(e.target.value);
        }}>
            {worker?.map((work, index)=>{
                return (
                    <option key={index} value={work._id}>{work.username}</option>
                )
            })}
            <option value="">All</option>
        </select>
        <button onClick={filterByWorker} className="text-sm border px-2 py-1 cursor-pointer border-gray-500 ml-6 ">Filter</button>
  
        {errorMessage && <h1 className="text-red-500 text-sm">{errorMessage}</h1>}
    </div>
    {services.map((service, index)=>{
      return (
        <div className="flex flex-row gap-12 items-center border-b-2 border-gray-300 p-4" key={index}>
            <img src={service.servicePic} alt={service.title} className="w-[125px] h-[100px] object-cover rounded-lg"/>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm text-purple-500">{service.category}</h1>
              <h1>{service.title}</h1>
            <Link to={`/service/${service.slug}`}>
            <h1 className="text-xl font-medium hover:text-purple-500 hover:underline transition-all duration-150 ease-linear w-[500px] text-nowrap text-ellipsis overflow-hidden">{service.description}</h1>
            </Link>
            </div>
            <h2 className="text-sm text-nowrap">Rs. {service.price}</h2>
            <div className="flex gap-8">
                <button onClick={()=>{
                    setServiceId(service._id);
                    setModelOpen(true);
                }} className="text-sm text-gray-400 cursor-pointer">Delete</button>
                
            </div>
            {service.isCompleted?<span className="text-sm text-green-500">Completed</span>:service.isBooked && !moment(service.serviceDate).format("YYYY-MM-DD") > moment().subtract(3, "days").format("YYYY-MM-DD") ?<h1 className="text-sm text-yellow-500">Booked</h1>:<h1 className="text-sm text-red-500">Outdated</h1>}
        </div>
      )
    })}
    {showMore && <button onClick={fetchMore} className="text-sm text-white bg-purple-500 py-2 px-4 rounded-lg cursor-pointer transition-all duration-150 ease-linear hover:bg-purple-600">Show more</button>}
    {error?<h1 className="text-xl text-red-500 text-center mt-12">{error}</h1>:null}
    {successMessage?<h1 className="text-xl text-green-500 text-center mt-12">{successMessage}</h1>:null}
</div>
{
  modelOpen && <Model setModelOpen={setModelOpen} deleteModel={true} handleOperation={handleDelete}/>
}
    </>
  )
}
