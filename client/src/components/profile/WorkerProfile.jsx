import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllServices from "../Users/Worker/AllServices";
import Analytics from "../Users/Worker/Analytics";
import ManageServices from "../Users/Worker/ManageServices";
import Rating from "../Rating";
export default function WorkerProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('my services');

  return (
    <div className="relatiev z-10 min-h-screen max-w-[1250px] gap-5 mx-auto flex flex-col py-[70px] md:flex-row ">
      {/* left side  */}
      <div className="relative md:border-r-[1px] md:border-gray-300 md:pr-6 md:min-w-[400px]">
        <div className="flex gap-3 items-center">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={currentUser?.profilePic}
              alt={currentUser?.username}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 text-[#76787b] tracking-wide">
            <h1 className=" text-3xl text-black font-medium">{currentUser?.username}</h1>
            <h1 className="text-sm">{currentUser?.phone}</h1>
            <h1>
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;
              {currentUser?.address}
            </h1>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-14 items-center">
          <Link to="/setting">
            <button className="bg-purple-500 text-white px-5 py-2 rounded-lg duration-200 hover:bg-purple-600 text-nowrap">
              Complete Profile
            </button>
          </Link>
          <Rating rating={currentUser?.rating} />
        </div>
      </div>

      {/* right side  */}
      <div className="flex-grow  overflow-x-scroll">
        <div className="overflow-x-scroll text-nowrap">
            <ul className="flex gap-4 text-[#76787b] font-serif border-b-[1px]">
              <li className={`hover:text-black cursor-pointer py-3 px-2 relative ${tab==='my services' && 'profileLinks'}`} onClick={()=>setTab('my services')}>My services</li>
              <li className={`hover:text-black cursor-pointer py-3 px-2 relative ${tab==='analytics' && 'profileLinks'}`} onClick={()=>setTab('analytics')}>Analytics</li>
              <li className={`hover:text-black cursor-pointer py-3 px-2 relative ${tab==='manage' && 'profileLinks'}`} onClick={()=>setTab('manage')}>Manage Services</li>
            </ul>
        </div>

        <div className="mt-16 w-full">
          {tab === "my services" && <AllServices />}
          {tab === "analytics" && <Analytics />}
          {tab === "manage" && <ManageServices/>}
        </div>
      </div>
    </div>
  );
}
