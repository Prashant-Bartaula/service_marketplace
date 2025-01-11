import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllServices from "../Users/Admin/AllServices";
import Analytics from "../Users/Admin/Analytics";
import ManageServices from "../Users/Admin/ManageServices";
export default function AdminProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("All services");

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
            <h1 className=" text-3xl text-black font-medium">
              {currentUser?.username}
            </h1>
            <h1 className="text-sm">{currentUser?.phone}</h1>
            <h1>
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;
              {currentUser?.address}
            </h1>
          </div>
        </div>
      </div>

      {/* right side  */}
      <div className="flex-grow  overflow-x-scroll">
        <div className="overflow-x-scroll text-nowrap">
          <ul className="flex gap-4 text-[#76787b] font-serif border-b-[1px]">
            <li
              className={`hover:text-black cursor-pointer py-3 px-2 relative ${
                tab === "All services" && "profileLinks"
              }`}
              onClick={() => setTab("All services")}
            >
              All services
            </li>
            <li
              className={`hover:text-black cursor-pointer py-3 px-2 relative ${
                tab === "Analytics" && "profileLinks"
              }`}
              onClick={() => setTab("Analytics")}
            >
              Analytics
            </li>
            <li
              className={`hover:text-black cursor-pointer py-3 px-2 relative ${
                tab === "Manage" && "profileLinks"
              }`}
              onClick={() => setTab("Manage")}
            >
              Manage Services
            </li>
          </ul>
        </div>

        <div className="mt-16 w-full">
          {tab === "All services" && <AllServices />}
          {tab === "Analytics" && <Analytics />}
          {tab === "Manage" && <ManageServices />}
        </div>
      </div>
    </div>
  );
}
