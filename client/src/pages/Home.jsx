import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {useSelector} from "react-redux"
import moment from "moment";
export default function Home() {
  const [tab, setTab] = useState("");
  const [trending, setTrending] = useState([]);
  const [trendingError, setTrendingError] = useState("");
  const [recent, setRecent] = useState([]);
  const [recentError, setRecentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [order, setOrder] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [services, setServices] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const {currentUser}=useSelector((state)=>state.user)
  const location = useLocation();
  // const isInitialRender = useRef(true);

  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false; // Mark the initial render as handled
    //   return;
    // }
    setTab("");
  }, [location.pathname]);

  //trendingpservices
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

  //recent
  useEffect(() => {
    setRecentError("");
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/service/getServices?limit=10&order=desc"
        );
        const data = await res.json();
        if (!res.ok) {
          setRecentError(data.message);
        }
        setRecent(data.services);
      } catch (err) {
        setRecentError(err);
      }
    };
    fetchRecent();
  }, []);

  useEffect(() => {
    setError("");
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/service/getServices?category=${tab?.toLowerCase()}&order=${order}&priceOrder=${priceOrder}&min=${min}&max=${max}&limit=10`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
        }
        setServices(data.services);
        if (data.services.length < 10) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      } catch (error) {
        setError(err);
      } finally {
        setLoading(false);
        setFiltered(false);
      }
    };
    fetchServices();
  }, [tab, filtered]);

  useEffect(() => {
    if (trending.length !== 0 || services.length !== 0 || recent.length !== 0) {
      const localStorageData = JSON.parse(
        window.localStorage.getItem("services")
      );
      if (localStorageData.length !== 0) {
        localStorageData.forEach((item) => {
          trending.forEach((service) => {
            if (item.slug === service.slug) {
              setBookmarks((prev) => [...prev, service.slug]);
            }
          });
          recent.forEach((service) => {
            if (item.slug === service.slug) {
              setBookmarks((prev) => [...prev, service.slug]);
            }
          });
          services.forEach((service) => {
            if (item.slug === service.slug) {
              setBookmarks((prev) => [...prev, service.slug]);
            }
          });
        });
      } else {
        return;
      }
    }
  }, [services]);
  const handleBookmark = (e, service) => {
    e.preventDefault();
    const { slug, servicePic, title, price, ...rest } = service;
    const bookmarkData = {
      slug,
      servicePic,
      title,
      price,
    };
    const localStorageData =
      JSON.parse(window.localStorage.getItem("services")) || [];
    if (!bookmarks.includes(service.slug)) {
      if (localStorageData.length !== 0) {
        localStorageData.push(bookmarkData);
      } else {
        localStorageData.push(bookmarkData);
      }
      window.localStorage.setItem("services", JSON.stringify(localStorageData));
      setBookmarks((prev) => [...prev, service.slug]);
    } else {
      const dataAfterRemoveBookmark = localStorageData.filter(
        (prev) => prev.slug !== service.slug
      );
      window.localStorage.setItem(
        "services",
        JSON.stringify(dataAfterRemoveBookmark)
      );
      setBookmarks((prev) => prev.filter((slug) => slug !== service.slug));
    }
  };

  const handleShowMore = async () => {
    const startIndex = services.length;
    try {
      const res = await fetch(
        `http://localhost:5000/api/service/getServices?category=${tab?.toLowerCase()}&order=${order}&priceOrder=${priceOrder}&min=${min}&max=${max}&limit=10&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok){
        setError(data.message);
      }
      setServices((prev) => [...prev, ...data.services]);
      if (data.services.length < 10) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex flex-col relative sm:flex-row min-h-screen max-w-[1300px] mx-auto my-[80px] overflow-x-hidden">
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
            <i className="fa-solid fa-toilet"></i>
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
            <i className="fa-solid fa-bolt"></i>
            <span className="ml-3">Electrical</span>
          </button>
        </div>
      </div>

      {/* right side  */}
      <div className="mt-[100px] sm:w-[350px] sm:flex-grow relative flex flex-col gap-4 sm:mt-0  sm:pl-8">
        {/* category text */}
        <div className="pb-1 border-b border-gray-300 flex flex-col justify-start items-start">
          <div className="flex justify-between w-full">
            <h1 className="text-lg text-gray-700 font-normal tracking-wide">{`Category : ${
              tab ? tab : "All"
            }`}</h1>
            <button
              className="text-gray-500 px-3 py-1 bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition-all ease-linear duration-200 text-sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <i className="fa-solid fa-filter"></i>
              <span className="ml-3">Filter</span>
            </button>
          </div>

          {/* filtering  */}
          <div
            className={`${
              filterOpen ? "block" : "hidden"
            } flex gap gap-6 flex-wrap justify-start my-6 transition-all duration-200 ease-linear`}
          >
            <div>
              <label htmlFor="order">SortBy: </label>
              <select
                name="order"
                className="ml-3 cursor-pointer border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="">none</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>

            <div>
              <label htmlFor="priceOrder">Price Order: </label>
              <select
                name="priceOrder"
                className="ml-3 cursor-pointer border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setPriceOrder(e.target.value)}
              >
                <option value="">none</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>

            <div>
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                className="placeholder:font-serif border border-gray-300 p-2 rounded-lg w-[100px] mr-1"
                placeholder="Rs.  min"
                onChange={(e) => setMin(e.target.value)}
              />
              <span> - </span>
              <input
                type="number"
                className=" ml-1 placeholder:font-serif border border-gray-300 p-2 rounded-lg w-[100px]"
                placeholder="Rs.  max"
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1 bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition-all ease-linear duration-200 text-sm"
              onClick={() => setFiltered(true)}
            >
              <i className="fa-solid fa-filter"></i>
              <span className="ml-3">Filter</span>
            </button>
          </div>
        </div>

        {/* trending  */}
        <div className="relative max-w-full ">
          <h1 className="text-lg text-gray-600 font-normal tracking-wide py-2 border-b border-gray-300">
            <i className="fa-solid fa-arrow-trend-up"></i>
            <span className="ml-3">Trending</span>
          </h1>
          <div className="mt-4 flex gap-7 w-full  overflow-x-auto snap-x  snap-mandatory">
            {trendingError ? (
              <p className="text-gray-400 text-3xl">{trendingError}</p>
            ) : (
              trending.map((service, index) => {
                return (
                  <div
                    className="relative w-fit  flex-shrink-0 snap-start  flex flex-col"
                    key={index}
                  >
                    <img
                      src={service.servicePic}
                      alt={service.title}
                      className="w-[165px] h-[120px] object-cover rounded-lg align-middle"
                    />
                    {
                      service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') && 
                      <p className="absolute top-1 right-1 text-xs text-white bg-green-500 px-2 py-1 rounded-full">Outdated</p>
                    }
                    {
                     service.serviceDate.split('T')[0]!==moment().format('YYYY-MM-DD') && service.isBooked && currentUser._id!==service.bookerId? 
                     ( <p className="absolute top-1 right-1 text-xs text-white bg-red-500 px-2 py-1 rounded-full">Booked</p>):null
                    }
                    <h1 className="text-sm font-medium mt-3">
                      {service.title}
                    </h1>
                    <h2 className="text-xs text-gray-500 mt-1">
                      {service.category}
                    </h2>
                    <div className="flex justify-between">
                      <h1 className="text-gray-700 text-sm">
                        Rs. {service.price}
                      </h1>
                    {service.serviceDate.split('T')[0]!==moment().format('YYYY-MM-DD')?service.isBooked && currentUser._id!==service.bookerId?null:(<button onClick={(e) => handleBookmark(e, service)}>
                        <i
                          className={`fa-${
                            bookmarks.includes(service.slug)
                              ? "solid"
                              : "regular"
                          } fa-heart`}
                        ></i>
                      </button>):null}
                    </div>
                    <Link
                      to={`/service/${service.slug}`}
                      className="relative text-center bg-purple-500 text-white  rounded-sm shadow-md hover:bg-purple-600 transition-all ease-linear duration-200 text-nowrap text-sm"
                    >
                      <button disabled={service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') || service.isBooked && currentUser._id!==service.bookerId} className={`h-full w-full px-7 py-2 ${service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') || service.isBooked && currentUser._id!==service.bookerId?"cursor-not-allowed bg-purple-200":''}`}>{service.isBooked && currentUser._id===service.bookerId?"Cancel Booking ":'Book now'}</button>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* latest  */}
        <div className="relative max-w-full">
          <h1 className="text-lg text-gray-600 font-normal tracking-wide py-2 border-b border-gray-400">
            <i className="fa-regular fa-clock"></i>
            <span className="ml-3">Latest</span>
          </h1>
          <div className="mt-4 w-full relative overflow-x-auto flex gap-7 snap-x snap-mandatory">
            {recentError ? (
              <p className="text-gray-400 text-3xl">{recentError}</p>
            ) : (
              recent.map((service, index) => {
                return (
                  <div
                    className="relative w-fit flex-shrink-0 snap-start flex flex-col"
                    key={index}
                  >
                    <img
                      src={service.servicePic}
                      alt={service.title}
                      className="w-[165px] h-[120px] object-cover rounded-lg"
                    />
                     {
                      service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') && 
                      <p className="absolute top-1 right-1 text-xs text-white bg-green-500 px-2 py-1 rounded-full">Outdated</p>
                    }
                      {
                     service.serviceDate.split('T')[0]!==moment().format('YYYY-MM-DD') && service.isBooked && currentUser._id!==service.bookerId? 
                     ( <p className="absolute top-1 right-1 text-xs text-white bg-red-500 px-2 py-1 rounded-full">Booked</p>):null
                    }
                    <h1 className="text-sm font-medium mt-3">
                      {service.title}
                    </h1>
                    <h2 className="text-xs text-gray-500 mt-1">
                      {service.category}
                    </h2>
                    <div className="flex justify-between items-center">
                      <h1 className="text-gray-700 text-sm">
                        Rs. {service.price}
                      </h1>
                      {service.serviceDate.split('T')[0]!==moment().format('YYYY-MM-DD')?service.isBooked && currentUser._id!==service.bookerId?null:(<button onClick={(e) => handleBookmark(e, service)}>
                        <i
                          className={`fa-${
                            bookmarks.includes(service.slug)
                              ? "solid"
                              : "regular"
                          } fa-heart`}
                        ></i>
                      </button>):null}
                    </div>
                    <Link
                      to={`/service/${service.slug}`}
                      className="relative text-center bg-purple-500 text-white  rounded-sm shadow-md hover:bg-purple-600 transition-all ease-linear duration-200 text-nowrap text-sm"
                    >
                      <button disabled={service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') || service.isBooked && currentUser._id!==service.bookerId} className={`h-full w-full px-7 py-2 ${service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') || service.isBooked && currentUser._id!==service.bookerId?"cursor-not-allowed bg-purple-200":''}`}>{service.isBooked && currentUser._id===service.bookerId?"Cancel Booking ":'Book now'}</button>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/*  services  */}
        <div className="mt-20 border-t border-gray-500 py-6">
          {loading ? (
            <div className="w-full flex justify-center">
              <dotlottie-player
                src="https://lottie.host/83f8b309-b39c-4ae6-bee9-58f7bdda0024/LVfoSN8zfR.lottie"
                background="transparent"
                speed="1"
                style={{ width: "500px", height: "500px" }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
          ) : error || services.length === 0 ? (
            <p className="text-xl text-center mt-10 text-gray-400">
              Sorry! No services found...
            </p>
          ) : (
            <div className="flex flex-col gap-8 mt-10">
              {services.map((service, index) => {
                return (
                  <div
                    className="flex w-full md:max-w-[700px] relative gap-2 xs:gap-4 lg:gap-6 hover:bg-sky-50 border border-transparent hover:border-sky-300 duration-150 transition-all ease-linear rounded-xl border-b border-b-gray-300 p-2 pb-8"
                    key={index}
                  >
                    {/* left side  */}
                    <div className="relative flex items-start flex-shrink-0">
                      {
                        service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD')?(
                          <>
                          <img
                          src={service.servicePic}
                          alt={service.title}
                          className=" h-[100px] w-[90px] sm:h-[140px] sm:w-[140px] object-cover rounded-md"
                        />
                        <p className="absolute top-1 right-1 text-xs text-white bg-green-500 px-2 py-1 rounded-full">Outdated</p>
                          </>
                        ):service.isBooked && currentUser._id!==service.bookerId?(
                          <>
                          <img
                          src={service.servicePic}
                          alt={service.title}
                          className=" h-[100px] w-[90px] sm:h-[140px] sm:w-[140px] object-cover rounded-md"
                        />
                        <p className="absolute top-1 right-1 text-xs text-white bg-red-500 px-2 py-1 rounded-full">Booked</p>
                          </>
                        ):(
                          <Link to={`service/${service.slug}`}>
                            <img
                              src={service.servicePic}
                              alt={service.title}
                              className=" h-[100px] w-[90px] sm:h-[140px] sm:w-[140px] object-cover rounded-md"
                            />
                          </Link>
                        )
                      }
                    </div>

                    {/* right side */}
                    <div className="flex flex-grow flex-col gap-3 relative">
                      <h1 className="text-base text-gray-700 font-medium lg:max-w-[50%]">
                        {service.title}
                      </h1>
                      <h2 className="text-ellipsis text-[13px] text-gray-500 lg:max-w-[65%]">
                        {service.description.slice(0, 60)}
                      </h2>
                      <div className="flex justify-between pb-1 border-b border-gray-300">
                        <h2 className="text-md font-medium ">
                          Rs. {service.price}
                        </h2>
                        <span className="text-xs text-gray-500">
                          {moment(service.createdAt).fromNow()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <button className="text-nowrap text-sm">
                          {service.workerUsername}
                        </button>
                       {service.serviceDate.split('T')[0]===moment().format('YYYY-MM-DD') || service.isBooked && currentUser._id!==service.bookerId?null: <button onClick={(e) => handleBookmark(e, service)}>
                          <i
                            className={`fa-${
                              bookmarks.includes(service.slug)
                                ? "solid"
                                : "regular"
                            } fa-bookmark`}
                          ></i>
                        </button>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="md:max-w-[700px] bg-sky-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-sky-700 transition-all ease-linear duration-200 text-nowrap text-sm"
                >
                  Show more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
