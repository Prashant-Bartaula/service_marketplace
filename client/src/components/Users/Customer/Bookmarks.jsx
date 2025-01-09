import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

export default function Bookmarks(){
    const [bookmarks, setBookmarks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        setErrorMessage("");
        const bookmarks=JSON.parse(window.localStorage.getItem('services'));
        if(!bookmarks){return setErrorMessage("No bookmarks found!")}

        setBookmarks(bookmarks);
    }, [])

    const handleRemove=(slug)=>{
        const bookmarks=JSON.parse(window.localStorage.getItem('services'));
        const data=bookmarks.filter(prev=>prev.slug!==slug);
        window.localStorage.setItem('services',JSON.stringify(data));
        setBookmarks(data);
    }
  return (
    errorMessage?(
        <h1 className="text-2xl text-gray-300 text-center mt-24">{errorMessage}</h1>
    ):(bookmarks && bookmarks.length!==0?(
        <div className="flex flex-wrap justify-center gap-5">
            {bookmarks.map((service, index)=>{
                return     (
                <div key={index}  className="flex flex-col gap-3 w-min relative tracking-wide">
                    {
                        <Link to={`/service/${service.slug}`}><img src={service.servicePic} alt="service-pic" className="h-auto max-h-[150px] min-w-[200px] max-w-[300px] object-cover rounded-lg"/></Link>
                        }

                    <h1 className="text-sm font-semibold ">{service.title.slice(0, 30)}</h1>
                    <h2 className="text-sm ">Rs. {service.price}</h2>
                    <button onClick={()=>handleRemove(service.slug)} className="absolute bottom-1 text-sm right-2 text-gray-400 cursor-pointer">Remove</button>
                </div>)
            })}

        </div>
    ):(
        <h1 className="text-2xl text-gray-300 text-center mt-24">No bookmarks found...</h1>
    )
  )
)
}
