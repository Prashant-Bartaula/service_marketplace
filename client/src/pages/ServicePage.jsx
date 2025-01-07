import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  const [worker, setWorker] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const getservice = async () => {
      setErrorMessage("");
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/service/getServices?slug=${serviceSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          return setErrorMessage(data.message);
        }
        setService(data.services[0]);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getservice();
  }, [serviceSlug]);


  useEffect(()=>{
    if(service){
      const getWorker=async()=>{
        setErrorMessage("");
        try {
          const res=await fetch(`http://localhost:5000/api/user/getWorker/${service.workerId}`)
          const data =await res.json();
          if(!res.ok){
            return setErrorMessage(data.message)
          }
          setWorker(data.worker)
          
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
      getWorker();
    }
  }, [service])

  useEffect(()=>{
    if(service){
      const getRelatedServices=async()=>{
        setErrorMessage("");
        try {
          const res=await fetch(`http://localhost:5000/api/service/getServices?category=${service.category}&limit=4`);
          const data=await res.json();
          if(!res.ok){
            return setErrorMessage(data.message)
          }
          setRelatedServices(()=>{
            return data.services.filter(ser=>ser._id!==service._id)
          });
        } catch (error) {
          setErrorMessage(error.message);
        }finally{
          setLoading(false);
        }
      }
      getRelatedServices();
    }
  }, [service]);


  useEffect(()=>{
    if(service){
      const localStorageData=JSON.parse(window.localStorage.getItem('services'))
      if(localStorageData.length!==0){
        const data=localStorageData.filter(prev=>prev.slug===service.slug)
        if(data.length!==0){
          setIsBookmarked(true)
        }
      }else{
        setIsBookmarked(false)
      }
    }
  }, [service])

  const handleBookmark=async(e)=>{
    e.preventDefault();
    const {slug, servicePic,title, price,  ...rest}=service;
    const bookmarkData={
      slug,
      servicePic,
      title,
      price,
    }
    const localStorageData=JSON.parse(window.localStorage.getItem('services'));
    if(!isBookmarked){
      if(localStorageData.length!==0){
        localStorageData.push(bookmarkData);
        window.localStorage.setItem('services',JSON.stringify(localStorageData));
      }else{
        window.localStorage.setItem('services',JSON.stringify([bookmarkData]));
      }
    }else{
      const dataAfterRemoveBookmark=localStorageData.filter(prev=>prev.slug!==service.slug);
      window.localStorage.setItem('services',JSON.stringify(dataAfterRemoveBookmark));
    }
    setIsBookmarked(!isBookmarked);
  }

  if (service.length === 0 && !loading) {
    return <NotFoundPage />;
  } else {
    return loading? (
      <div className="min-h-screen max-w-[1000px] flex justify-center items-center mx-auto">
        <dotlottie-player
          src="https://lottie.host/83f8b309-b39c-4ae6-bee9-58f7bdda0024/LVfoSN8zfR.lottie"
          background="transparent"
          speed="1"
          style={{ width: "500px", height: "500px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    ) : service?(
      <div className="min-h-screen max-w-[1100px]  flex flex-wrap mx-auto py-[80px] px-3">
        {/* left side  */}
        <div className="relative flex-grow px-3">
          <div className="flex flex-col gap-10 ">

            <div className="flex items-center flex-wrap md:flex-nowrap gap-5 ">

              {/* image */}
              <div className="relative h-[250px] w-full rounded-sm sm:h-[150px] sm:w-[150px] sm:rounded-full overflow-hidden order-1 sm:order-none mt-4 sm:mt-0">
                <img src={service?.servicePic} alt={service?.title} className="h-full w-full  object-cover"/>
              </div>

              {/* title  */}
              <div className="flex flex-col gap-3">
                <h2 className="text-xs text-purple-700 bg-purple-100 px-4 py-2 rounded-full w-min
               font-semibold cursor-pointer">{service.category}</h2>
                <h1 className="text-3xl tracking-wider font-bold">{service.title}</h1>
                <h2 className="text-base text-gray-500 mt-3"><i className="fa-solid fa-location"></i>&nbsp;&nbsp;{worker?.address}</h2>
                <h2 className="text-base text-gray-500"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;{worker?.email}</h2>
              </div>
            </div>

            <div className="mt-[50px]">
              <h1 className="text-3xl font-semibold">Description</h1>
              <p className="mt-6 text-[#77797c] font-normal tracking-wide text-xl">{service.description}</p>
            </div>
            <div className="mt-[10px]">
              <h1 className="text-2xl font-semibold">Price</h1>
              <p className="mt-2 text-[#77797c] font-normal tracking-wide text-md">Rs. {service.price}</p>
            </div>
          </div>
          <div className="absolute right-3 top-3 text-2xl text-purple-500">
            <button onClick={(e)=>handleBookmark(e)}><i className={`fa-${isBookmarked ? "solid" : "regular"} fa-heart`}></i></button>
          </div>
        </div>

        {/* right side  */}
        <div className="flex flex-col gap-8 w-full 
         mt-[100px] ">
          {/* top part  */}
          <div className="flex flex-col  gap-5  ">
            <h1 className="text-purple-500"><i className="fa-solid fa-user"></i><span className="ml-3"> {worker?.username}</span></h1>
            <h1 className="text-gray-600 tracking-wider"><i className="fa-solid fa-clock"></i><span className="ml-3">Available {
              service.serviceTime==='early'?" 8:00AM to 10:00AM":service.serviceTime==='afternoon'?"12:00PM to 3:00PM":"4:00PM to 6:00PM"
              }</span></h1>
            <h1 className="text-gray-600 tracking-wider"><i className="fa-solid fa-calendar"></i><span className="ml-3">{new Date(service.serviceDate).toDateString()}</span></h1>

              <button className="w-full max-w-[600px] text-center px-3 py-2
               bg-purple-500 text-white rounded-lg"><i className="fa-solid fa-calendar"></i>&nbsp;&nbsp;Book Appointment</button>
          </div>

          {/* related services part  */}
          <div className="relative">
                <h1 className="font-semibold">Related Services</h1>
                <div className="mt-8 flex flex-wrap gap-8">
                  {relatedServices.map((ser, index) => (
                      <div className="flex gap-2" key={index}>
                         <Link to={`/service/${ser.slug}`}>
                         <img src={ser.servicePic} alt="service pic" className="h-[100px] w-[80px] rounded-md object-cover"/>
                         </Link> 

                          <div className="flex flex-col gap-1">
                            <Link to={`/service/${ser.slug}`}><h1 className="font-bold text-lg">{ser.title}</h1></Link>
                            <h1 className="text-purple-400 font-medium">{new Date(ser.serviceDate).toDateString()}</h1>
                            <h2 className="text-gray-400 text-sm">Rs. {ser.price}</h2>
                          </div>
                      </div>
                  ))}
                </div>
          </div>
        </div>
      </div>
    ):null;
  }
}

