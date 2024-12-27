import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Model from "./Model";
import logo from "../assets/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const navigate=useNavigate()
  return (
    <>
    <div className="relative flex items-center justify-between px-4 py-4">
      {/* logo wrapper  */}
      <div className="flex gap-6 items-center">
        <img
          src={logo}
          alt="logo"
          className="h-10 w-10 scale-[2.5] translate-y-2"
        />
        <span className="text-3xl font-rubik hidden sm:block">Marketplace</span>
      </div>

      {/* search */}
      <form className="px-4 py-2 rounded-2xl border-[1px] border-gray-700">
        <input
          type="text"
          placeholder="Search anything... "
          className="outline-none w-[100px] xs:w-[200px]  md:w-[250px] lg:w-[400px]"
        />
        <span>
          <i className="fa-solid fa-magnifying-glass ml-3"></i>
        </span>
      </form>

      {currentUser ? (
        <div className="relative cursor-pointer" onClick={()=>setDropdownActive(!dropdownActive)}>
          <img src={currentUser?.profilePic} alt={currentUser?.username} className="h-10 w-10 rounded-full object-cover"/>

          {/* dropdown  */}
          <div className={`${dropdownActive?'flex':'hidden'} absolute top-12 right-4 flex-col gap-4 bg-slate-100  p-6 shadow-xl rounded-lg transition-all duration-300 ease-linear`}>
            <Link to="/profile">Profile</Link>
            <button onClick={() => setModelOpen(true)} className="text-red-500">Logout</button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/sign-in">
            <button className="tracking-wider text-lg font-medium text-nowrap font-rubik hover:text-sky-500 transition-all duration-200 ease-linear">
              login
            </button>
          </Link>
          <Link to="/user-sign-up">
            <button className="tracking-wider text-lg font-medium border border-gray-500 px-3 py-2 rounded-lg text-nowrap font-rubik hover:bg-purple-700 hover:text-white transition-all duration-300 ease-linear">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
    {
      modelOpen && <Model/>
    }
    </>
  );
}
