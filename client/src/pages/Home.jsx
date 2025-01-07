import { useEffect, useState, useRef } from "react"
import {useLocation} from 'react-router-dom'

export default function Home() {
  const [tab, setTab] = useState('');
  const location=useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false; // Mark the initial render as handled
    //   return;
    // }
    setTab(''); 
  }, [location.pathname]);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen max-w-[1300px] mx-auto my-[80px] overflow-x-scroll">
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
            <h1 className="text-2xl "><i className="fa-solid fa-list"></i><span className="font-rubik ml-3">Categories</span></h1>
            <button className={`text-start text-nowrap mt-3 text-purple-500 ${tab==='Cleaning' && 'bg-purple-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-purple-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Cleaning'?'': 'Cleaning')}><i className="fa-solid fa-soap"></i><span className="ml-3">Cleaning</span></button>
            <button className={`text-start text-nowrap  text-orange-400 ${tab==='Repair' && 'bg-orange-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-orange-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Repair'?'': 'Repair')}><i className="fa-solid fa-wrench"></i><span className="ml-3">Repair</span></button>
            <button className={`text-start text-nowrap  text-green-500 ${tab==='Painting' && 'bg-green-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-green-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Painting'?'': 'Painting')}><i className="fa-solid fa-palette"></i><span className="ml-3">Painting</span></button>
            <button className={`text-start text-nowrap  text-red-500 ${tab==='Shifting' && 'bg-red-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-red-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Shifting'?'': 'Shifting')}><i className="fa-solid fa-truck"></i><span className="ml-3">Shifting</span></button>
            <button className={`text-start text-nowrap  text-sky-500 ${tab==='Plumbing' && 'bg-sky-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-sky-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Plumbing'?'': 'Plumbing')}><i className="fa-solid fa-truck"></i><span className="ml-3">Plumbing</span></button>
            <button className={`text-start text-nowrap  text-teal-500 ${tab==='Electrical' && 'bg-teal-100'} px-4 py-2 rounded-2xl  shadow-md hover:bg-teal-100 transition-all ease-linear duration-200`} onClick={()=>setTab(prev=>prev==='Electrical'?'': 'Electrical')}><i className="fa-solid fa-truck"></i><span className="ml-3">Electrical</span></button>
           
          </div>
        </div>

        {/* right side  */}
        <div className="mt-[100px] flex flex-col gap-8 sm:mt-0 sm:flex-grow sm:pl-8">

          {/* category text  */}
          <div className="pb-2 border-b border-gray-400 flex  justify-between items-center">
          <h1 className="text-xl text-gray-700 font-normal tracking-wide">{`Category : ${tab?tab:'All'}`}</h1>
            <button className="text-gray-500 px-3 py-2 bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition-all ease-linear duration-200"><i className="fa-solid fa-filter"></i><span className="ml-3">Filter</span></button>
          </div>

          {/* trending  */}
          <div className="relative">
            <h1 className="text-xl text-gray-600 font-normal tracking-wide py-2 border-b border-gray-400"><i className="fa-solid fa-arrow-trend-up"></i><span className="ml-3">Trending</span></h1>
            <div className="mt-6 flex gap-7">
              <div className="w-fit snap-x flex flex-col">
                <img src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="something" className="w-[240px] h-[170px] object-cover rounded-lg"/>
                <h1 className="text-base font-medium mt-3">Something</h1>
                <h2 className="text-xs text-gray-500 mt-1">Cleaning</h2>
                <div className="flex justify-between">
                  <h1 className="text-gray-700">$100</h1>
                  <button><i className={`fa-regular fa-heart`}></i></button>
                </div>
                <button className="mt-2 bg-purple-500 text-white px-5 py-2 rounded-sm shadow-md hover:bg-purple-600 transition-all ease-linear duration-200">Book Now</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
