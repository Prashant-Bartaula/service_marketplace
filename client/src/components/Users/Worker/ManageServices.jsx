import { useState, useEffect } from "react"
import {Link, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import Model from "../../Model";
export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate=useNavigate();

  useEffect(()=>{
    const getServices=async()=>{
      setErrorMessage("");
      setError("");
      setSuccessMessage("");
      try {
        const res=await fetch(`http://localhost:5000/api/service/getWorkerServices`, {
          method:"POST",
          credentials:"include"
        });
        const data=await res.json();
        if(!res.ok){
          return setErrorMessage(data.message);
        };
        setSuccessMessage(data.message);
        setServices(data.services);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getServices();
  }, [])
  
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

  return errorMessage || services.length===0?(<h1 className="text-2xl text-gray-300 text-center mt-24">Services not found</h1>):(
    <>
<div className="flex flex-col gap-6 w-full  overflow-x-scroll">
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
                <button className="text-sm text-gray-400 cursor-pointer" onClick={()=>navigate(`/update-service/${service.slug}`)} >Edit</button>
            </div>
            {service.isCompleted?<span className="text-sm text-green-500">Completed</span>:service.isBooked?<h1 className="text-sm text-yellow-500">Booked</h1>:null}
        </div>
      )
    })}
    {error?<h1 className="text-xl text-red-500 text-center mt-12">{error}</h1>:null}
    {successMessage?<h1 className="text-xl text-green-500 text-center mt-12">{successMessage}</h1>:null}
</div>
{
  modelOpen && <Model setModelOpen={setModelOpen} handleOperation={handleDelete}/>
}
    </>
  )
}
