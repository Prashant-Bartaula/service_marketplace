import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";

export default function ServicePage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(post);
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
      <div className="min-h-screen max-w-[1100px] flex flex-wrap mx-auto pt-[80px]">
        {/* left side  */}
        <div className="flex-grow">
          <div className="flex flex-col gap-10">

            <div className="flex items-center gap-5 max-w-[500px]">

              {/* image */}
              <div>
                <img src={post.servicePic} alt={post?.title} className="h-[150px] w-[150px] rounded-full object-cover"/>
              </div>

              {/* title  */}
              <div className="flex flex-col gap-5">
                <h2 className="text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded-full w-min
               font-semibold ">{post.category}</h2>
                <h1 className="text-3xl tracking-wider font-bold">{post.title}</h1>
                <h2>location</h2>
                <h2>email</h2>
              </div>
            </div>

            <div className="mt-[60px]">
              <h1 className="text-2xl font-semibold">Description</h1>
              <p className="mt-6 text-gray-700 text-lg">{post.description}</p>
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="">right side</div>
      </div>
    );
  }
}
