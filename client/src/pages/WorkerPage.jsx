import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
export default function WorkerPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
    const {workerId}=useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/service/getWorkerPostedServices/${workerId}`, {
            method:'POST',
            credentials:'include'
          });
        const data = await res.json();
        if (!res.ok) {
          return alert(data.message)
        }
        setServices(data.services);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [workerId]);

  return services.length !== 0 ? (
    <div className="relatiev z-10 min-h-screen max-w-[1250px] gap-5 mx-auto flex flex-col py-[70px] md:flex-row ">
      {/* left side  */}
      <div className="relative md:border-r-[1px] md:border-gray-300 md:pr-6 md:min-w-[400px]">
        <div className="flex gap-3 items-center">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img src="" alt="asd" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col gap-4 text-[#76787b] tracking-wide">
            <h1 className=" text-3xl text-black font-medium">dubai</h1>
            <h1 className="text-sm">9823919812</h1>
            <h1>
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp; kalanki,
              dubai
            </h1>
          </div>
        </div>
      </div>

      {/* right side  */}
      <div className="flex-grow ">
        <h1 className="border-b pb-2 font-normal text-xl">Services</h1>

        <div className="mt-5 flex flex-wrap justify-center gap-6">
          {services.map((service, index) => {
            return (
              <div
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : loading ? (
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
    <NotFoundPage />
  );
}
