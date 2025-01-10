import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import RateWorker from "../components/RateWorker";
import Rating from '../components/Rating'
export default function WorkerPage() {
  const [services, setServices] = useState([]);
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(false);
  const [completedService, setCompletedService] = useState(0);
  const [rateWorkerOpen, setRateWorkerOpen] = useState(false)
  const { workerId } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/service/getWorkerPostedServices/${workerId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          return alert(data.message);
        }
        setServices(data.services);
        setCompletedService(data.completedService);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [workerId]);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/user/getWorker/${workerId}`
        );
        const data = await res.json();
        if (!res.ok) {
          return alert(data.message);
        }
        setWorker(data.worker);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [workerId]);

  return Object.keys(worker).length === 0 && !loading ?(
    <NotFoundPage/>
  ):loading?(
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
  ) : (
    <>
    <div className="relatiev z-10 min-h-screen max-w-[1250px] gap-5 mx-auto flex flex-col py-[70px] md:flex-row ">
      {/* left side  */}
      <div className="relative md:border-r-[1px] md:border-gray-300 md:pr-6 md:min-w-[400px]">
        <div className="flex gap-3 items-center">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={worker.profilePic}
              alt={worker.username}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 text-[#76787b] tracking-wide">
            <h1 className=" text-3xl text-black font-medium">
              {worker.username}
            </h1>
            <h1 className="text-sm"> <i className="fa-solid fa-phone"></i>&nbsp;&nbsp; {worker.phone}</h1>
            <h1>
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp; {worker.address}
            </h1>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-400 font-light">{`${completedService > 0?`Successfully completed ${completedService}+ services`:''}`}</div>
        <div className="flex gap-5 mt-6 items-center justify-between flex-wrap">
            <Rating rating={worker.rating}/>
            <button className="px-4 py-2 rounded-xl text-base text-white bg-purple-500" onClick={() => setRateWorkerOpen(true)}>Rate Worker</button>
        </div>
      </div>

      {/* right side  */}
      <div className="flex-grow ">
        <h1 className="border-b border-gray-400 pb-2 font-normal text-xl">
          Services posted
        </h1>

        <div className="mt-5 flex flex-wrap justify-center gap-6">
          {services.length === 0 ? (
            <div className="mt-6 text-2xl text-gray-400 text-center">
              No services found...
            </div>
          ) : (
            services.map((service, index) => {
             return  (<div
                key={index}
                className="flex flex-col gap-3 relative tracking-wide shadow-xl px-2
                     py-4 rounded-xl overflow-hidden"
              >
                <Link to={`/service/${service.slug}`}>
                  <img
                    src={service.servicePic}
                    alt="service-pic"
                    className="h-[150px] w-[300px] md:w-[250px] object-cover rounded-lg"
                  />
                </Link>
                <h1 className="text-sm font-semibold ">
                  {service.title.slice(0, 50)}
                </h1>
                <h2 className="text-sm ">Rs. {service.price}</h2>
                {service.isCompleted ? (
                  <div className="absolute bottom-0  right-0 z-50 bg-green-500 text-white text-sm px-2 py-1">
                    Completed
                  </div>
                ) : service.isBooked ? (
                  <div className="absolute bottom-0  right-0 z-50 bg-yellow-500 text-white text-sm px-2 py-1">
                    Ongoing
                  </div>
                ) : null}
              </div>)
            })
          )}
        </div>
      </div>
    </div>
    {rateWorkerOpen && <RateWorker setOpen={setRateWorkerOpen} workerId={workerId}/>}
    </>
  );
}
