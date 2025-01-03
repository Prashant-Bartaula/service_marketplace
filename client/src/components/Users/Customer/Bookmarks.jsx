import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

export default function Bookmarks(){
  return (
    <div  className="flex flex-col gap-3 w-min relative tracking-wide">
    <Link to={`/`}><img src='https://images.squarespace-cdn.com/content/v1/5e10bdc20efb8f0d169f85f9/09943d85-b8c7-4d64-af31-1a27d1b76698/arrow.png' alt="service-pic" className="h-auto max-h-[150px] min-w-[200px] max-w-[300px] object-cover rounded-lg"/></Link>
    <h1 className="text-sm font-semibold ">title please</h1>
    <h2 className="text-sm ">Rs. 1200</h2>
    <button className="absolute bottom-2 text-sm right-2 text-gray-400 cursor-pointer">Remove</button>
</div>
  )
}
