import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
export default function AllServices() {
    const [services, setServices] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showMore, setShowMore] = useState(false);

    useEffect(()=>{
        setErrorMessage("");
        const fetchServices=async()=>{
            try {
                const res=await fetch(`http://localhost:5000/api/service/getAllServices?startIndex=0`, {
                    method:"POST",
                    credentials:"include"
                });
                const data=await res.json();
                if(!res.ok){
                    return setErrorMessage(data.message);
                };
                data.services.length>19?setShowMore(true):setShowMore(false);
                setServices(data.services);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        fetchServices();
    }, [])

    const fetchMore=async()=>{
        console.log('hit')
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
            setServices((prev)=>[...prev, ...data.services]);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

  return (
    <div className="min-h-[400px]">
        {services.length===0 || errorMessage?(
            <h1 className="text-2xl text-gray-300 text-center mt-24">No services found...</h1>
        ):(
            <>
            <div className="flex flex-wrap gap-6  justify-center">
                {services?.map((service, index)=>{
                    return (
                        <div key={index} className="flex flex-col gap-3 relative tracking-wide shadow-xl px-2
                         py-4 rounded-xl overflow-hidden">
                               <Link to={`/service/${service.slug}`}><img src={service.servicePic} alt="service-pic" className="h-[150px] w-[300px] md:w-[250px] object-cover rounded-lg"/></Link>
                               <h1 className="text-sm font-semibold ">{service.title.slice(0, 50)}</h1>
                               <h2 className="text-sm ">Rs. {service.price}</h2>
                               {
                                  service.isCompleted?(<div className="absolute bottom-0  right-0 z-50 bg-green-500 text-white text-sm px-2 py-1">Completed</div>):service.isBooked?(
                                      <div className="absolute bottom-0  right-0 z-50 bg-yellow-500 text-white text-sm px-2 py-1">Ongoing</div>):null
                               }
                        </div>
                    )
                })}
            </div>
                {showMore && <button className="mt-14 text-white bg-purple-500 px-5 py-2 rounded-lg cursor-pointer block mx-auto" onClick={fetchMore}>Show more</button>}
            </>
        )}
    </div>
  ) 
}
