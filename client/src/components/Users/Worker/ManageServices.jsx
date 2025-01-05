import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import Model from "../../Model";
export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(()=>{
    const getServices=async()=>{
      setErrorMessage("");
      try {
        const res=await fetch(`http://localhost:5000/api/service/getWorkerServices`, {
          method:"POST",
          credentials:"include"
        });
        const data=await res.json();
        if(!res.ok){
          return setErrorMessage(data.message);
        };
        setServices(data.services);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getServices();
  }, [])
  
const handleDelete=async()=>{

}
  return errorMessage?(<h1 className="text-2xl text-gray-300 text-center mt-24">{errorMessage}</h1>):(
    <>
<div className="flex flex-col gap-6 w-full relative overflow-scroll">
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
                <button onClick={()=>setModelOpen(true)} className="text-sm text-gray-400 cursor-pointer">Delete</button>
                <button className="text-sm text-gray-400 cursor-pointer">Edit</button>
            </div>
            {service.isCompleted?<span className="text-sm text-green-500">Completed</span>:service.isBooked?<h1 className="text-sm text-yellow-500">Booked</h1>:null}
        </div>
      )
    })}
</div>
{
  modelOpen && <Model setModelOpen={setModelOpen} handleOperation={handleDelete}/>
}
    </>
  )
}
