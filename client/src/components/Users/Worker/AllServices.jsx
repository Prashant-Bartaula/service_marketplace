import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
export default function AllServices() {
    const [services, setServices] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        setErrorMessage("");
        const fetchServices=async()=>{
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
        fetchServices();
    }, [])

  return (
    <div className="min-h-[400px]">
        {services.length===0 || errorMessage?(
            <h1 className="text-2xl text-gray-300 text-center mt-24">No services found...</h1>
        ):(
            <div className="flex flex-wrap justify-center">
                {services?.map((service, index)=>{
                    return (
                        <div key={index} className="flex flex-col gap-3 w-min relative tracking-wide">
                               <Link to={`/service/${service.slug}`}><img src={service.servicePic} alt="service-pic" className="h-auto max-h-[150px] min-w-[200px] max-w-[300px] object-cover rounded-lg"/></Link>
                               <h1 className="text-sm font-semibold ">{service.title.slice(0, 50)}</h1>
                               <h2 className="text-sm ">Rs. {service.price}</h2>
                               {
                                  service.isCompleted?<div className="absolute top-0  left-0 text-gray-100 bg-black bg-opacity-50 w-full h-full z-50 flex justify-center items-center rounded-xl text-2xl">Completed</div>:null
                               }
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  ) 
}
