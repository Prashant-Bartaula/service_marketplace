import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";

export default function ServicePage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [worker, setWorker] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getPost = async () => {
      setErrorMessage("");
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/service/getServices?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          return setErrorMessage(data.message);
        }
        setPost(data.services[0]);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postSlug]);

  useEffect(()=>{
    if(post){
      const getWorker=async()=>{
        setErrorMessage("");
        try {
          setLoading(true);
          const res=await fetch(`http://localhost:5000/api/user/getWorker/${post.workerId}`)
          const data =await res.json();
          if(!res.ok){
            return setErrorMessage(data.message)
          }
          setWorker(data.worker)
          
        } catch (error) {
          setErrorMessage(error.message);
        }finally{
          setLoading(false);
        }
  
      }
      getWorker();
    }
  }, [post])

  if (post.length === 0 && !loading) {
    return <NotFoundPage />;
  } else {
    return loading ? (
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
      <div className="min-h-screen max-w-[1100px] justify-center flex flex-wrap mx-auto pt-[80px] px-3">
        {/* left side  */}
        <div className="flex-grow">
          <div className="flex flex-col gap-10">

            <div className="flex items-center flex-wrap md:flex-nowrap gap-5 max-w-[500px]">

              {/* image */}
              <div className="relative h-[250px] mx-auto w-full rounded-none md:h-[150px] md:w-[230px] md:rounded-full overflow-hidden order-1 md:order-none mt-4 md:mt-0">
                <img src={post.servicePic} alt={post?.title} className="h-full w-full  object-cover"/>
              </div>

              {/* title  */}
              <div className="flex flex-col gap-3">
                <h2 className="text-xs text-purple-700 bg-purple-100 px-4 py-2 rounded-full w-min
               font-semibold cursor-pointer">{post.category}</h2>
                <h1 className="text-3xl tracking-wider font-bold">{post.title}</h1>
                <h2 className="text-base text-gray-500 mt-3"><i className="fa-solid fa-location"></i>&nbsp;&nbsp;{worker?.address}</h2>
                <h2 className="text-base text-gray-500"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;{worker?.email}</h2>
              </div>
            </div>

            <div className="mt-[50px]">
              <h1 className="text-3xl font-semibold">Description</h1>
              <p className="mt-6 text-[#77797c] font-normal tracking-wide text-xl">{post.description}</p>
            </div>
            <div className="mt-[10px]">
              <h1 className="text-2xl font-semibold">Price</h1>
              <p className="mt-2 text-[#77797c] font-normal tracking-wide text-md">Rs. {post.price}</p>
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="flex flex-col gap-2">
          {/* top part  */}
          <div className="flex flex-col gap-5 items-end">
            <h1 className="text-purple-500"><i className="fa-solid fa-user"></i><span className="ml-3"> {worker?.username}</span></h1>
            <h1 className="text-gray-600 tracking-wider"><i className="fa-solid fa-clock"></i><span className="ml-3">Available {
              worker?.workingHours==='early'?" 8:00AM to 10:00AM":worker?.workingHours==='afternoon'?"12:00PM to 3:00PM":"4:00PM to 6:00PM"
              }</span></h1>

              <button className="w-full mt-14 text-center px-3 py-2
               bg-purple-500 text-white rounded-lg"><i className="fa-solid fa-calendar"></i>&nbsp;&nbsp;Book Appointment</button>
          </div>
        </div>
      </div>
    );
  }
}
