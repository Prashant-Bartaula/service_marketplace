import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Home() {
  const [tab, setTab] = useState("");
  const [trending, setTrending] = useState([]);
  const [trendingError, setTrendingError] = useState("");
  const location = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false; // Mark the initial render as handled
    //   return;
    // }
    setTab("");
  }, [location.pathname]);

  useEffect(() => {
    setTrendingError("");
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/service/getTrendingServices"
        );
        const data = await res.json();
        if (!res.ok) {
          setTrendingError(data.message);
        }
        setTrending(data.services);
      } catch (err) {
        setTrendingError(err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen max-w-[1300px] mx-auto my-[80px]">
      {/* left side  */}
      <div className="flex flex-col gap-8 max-w-[350px]">
        <form className="max-w-fit px-4 py-2 rounded-2xl border-[1px] border-gray-700 text-nowrap">
          <input
            type="text"
            placeholder="Search anything... "
            className="outline-none"
          />
          <span>
            <i className="fa-solid fa-magnifying-glass ml-3"></i>
          </span>
        </form>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl ">
            <i className="fa-solid fa-list"></i>
            <span className="font-rubik ml-3">Categories</span>
          </h1>
          <button
            className={`text-start text-nowrap mt-3 text-purple-500 ${
              tab === "Cleaning" && "bg-purple-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-purple-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Cleaning" ? "" : "Cleaning"))
            }
          >
            <i className="fa-solid fa-soap"></i>
            <span className="ml-3">Cleaning</span>
          </button>
          <button
            className={`text-start text-nowrap  text-orange-400 ${
              tab === "Repair" && "bg-orange-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-orange-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Repair" ? "" : "Repair"))
            }
          >
            <i className="fa-solid fa-wrench"></i>
            <span className="ml-3">Repair</span>
          </button>
          <button
            className={`text-start text-nowrap  text-green-500 ${
              tab === "Painting" && "bg-green-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-green-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Painting" ? "" : "Painting"))
            }
          >
            <i className="fa-solid fa-palette"></i>
            <span className="ml-3">Painting</span>
          </button>
          <button
            className={`text-start text-nowrap  text-red-500 ${
              tab === "Shifting" && "bg-red-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-red-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Shifting" ? "" : "Shifting"))
            }
          >
            <i className="fa-solid fa-truck"></i>
            <span className="ml-3">Shifting</span>
          </button>
          <button
            className={`text-start text-nowrap  text-sky-500 ${
              tab === "Plumbing" && "bg-sky-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-sky-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Plumbing" ? "" : "Plumbing"))
            }
          >
            <i className="fa-solid fa-truck"></i>
            <span className="ml-3">Plumbing</span>
          </button>
          <button
            className={`text-start text-nowrap  text-teal-500 ${
              tab === "Electrical" && "bg-teal-100"
            } px-4 py-2 rounded-2xl  shadow-md hover:bg-teal-100 transition-all ease-linear duration-200`}
            onClick={() =>
              setTab((prev) => (prev === "Electrical" ? "" : "Electrical"))
            }
          >
            <i className="fa-solid fa-truck"></i>
            <span className="ml-3">Electrical</span>
          </button>
        </div>
      </div>

      {/* right side  */}
      <div className="mt-[100px] relative flex flex-col gap-8 sm:mt-0 sm:flex-grow sm:pl-8 ">
        {/* category text  */}
        <div className="pb-2 border-b border-gray-400 flex  justify-between items-center">
          <h1 className="text-xl text-gray-700 font-normal tracking-wide">{`Category : ${
            tab ? tab : "All"
          }`}</h1>
          <button className="text-gray-500 px-3 py-2 bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition-all ease-linear duration-200">
            <i className="fa-solid fa-filter"></i>
            <span className="ml-3">Filter</span>
          </button>
        </div>

        {/* trending  */}
        <div className="relative w-full">
          <h1 className="text-xl text-gray-600 font-normal tracking-wide py-2 border-b border-gray-400">
            <i className="fa-solid fa-arrow-trend-up"></i>
            <span className="ml-3">Trending</span>
          </h1>
          <div className="mt-6 flex gap-7  overflow-x-scroll snap-x  snap-mandatory">
            {trendingError ? (
              <p className="text-gray-400 text-3xl">{trendingError}</p>
            ) : (
              trending.map((service, index) => {
                return (
                  <div className="w-fit flex-shrink-0 snap-start  flex flex-col" key={index}>
                    <img
                      src={service.servicePic}
                      alt={service.title}
                      className="w-[240px] h-[170px] object-cover rounded-lg"
                    />
                    <h1 className="text-base font-medium mt-3">{service.title}</h1>
                    <h2 className="text-xs text-gray-500 mt-1">{service.category}</h2>
                    <div className="flex justify-between">
                      <h1 className="text-gray-700">Rs. {service.price}</h1>
                      <button>
                        <i className={`fa-regular fa-heart`}></i>
                      </button>
                    </div>
                    <Link to={`/service/${service.slug}`} className="text-center mt-2 bg-purple-500 text-white px-5 py-2 rounded-sm shadow-md hover:bg-purple-600 transition-all ease-linear duration-200 text-nowrap">
                    <button>
                      Book Now
                    </button>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
