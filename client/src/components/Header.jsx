import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/userSlice";
import Model from "./Model";
import logo from "../assets/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab]=useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();

  const handleResize = () => {
    if(window.innerWidth>1024){
      return setSidebarOpen(true);
    }
    setSidebarOpen(false);
  }

  useEffect(() => {
    handleResize();
    if(location.pathname==='/'){
      return setTab('/');
    }
    if(location.pathname==='/about'){
      return setTab('about');
    }
    if(location.pathname==='/contact'){
      return setTab('contact');
    }else{
      setTab('')
    }
  }, [location])


  useEffect(() => {
    handleResize();

    window.addEventListener("resize",handleResize);

    return () => window.removeEventListener("resize",handleResize);
  }, []);

  const handleSignOut = async () => {
    setModelOpen(false);
    try {
      const res = await fetch("http://localhost:5000/api/user/sign-out", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
        return navigate("/user-sign-up");
      }
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between gap-24 xs:px-4 py-10">
        {/* logo wrapper  */}
        <div className="flex gap-3 items-center">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 scale-[2.5] translate-y-2"
          />
          <Link to='/'>
          <span className="text-xl font-bold font-rubik  xs:text-2xl">
            Service Bazar
          </span>
          </Link>
        </div>

        {/* search */}

        <div className={`flex flex-col lg:flex-row fixed lg:relative right-0 top-0 bg-white border-l-2 border-gray-300 lg:border-none px-9 py-[100px] lg:p-0  gap-12 lg:gap-0 h-full lg:h-fit z-50 flex-grow justify-start lg:justify-between transition-all duration-200 ease-linear ${sidebarOpen?'sidebarOpen': 'sidebarClose'}`}>
          {/* navigation */}
          <div className="flex items-center order-2 lg:order-none">
              <ul className="flex flex-col lg:flex-row gap-3 lg:gap-10 text-[#76787b] text-lg transition-all duration-200 ease-linear">
                <li className={`text-center hover:text-purple-500 cursor-pointer py-2 relative ${tab==='/' && 'navLinks'}`} onClick={() => navigate("/")}>Home</li>
                <li className={`text-center hover:text-purple-500 cursor-pointer py-2 relative ${tab==='about' && 'navLinks'}`} onClick={() => navigate("/about")}>About</li>
                <li className={`text-center hover:text-purple-500 cursor-pointer py-2 relative ${tab==='contact' && 'navLinks'}`}onClick={() => navigate("/contact")}>Contact</li>
              </ul>
          </div>

          {/* search  */}
          <form className="px-4 py-2 rounded-2xl border-[1px] border-gray-700 order-1 lg:order-none text-nowrap">
            <input
              type="text"
              placeholder="Search anything... "
              className="outline-none"
            />
            <span>
              <i className="fa-solid fa-magnifying-glass ml-3"></i>
            </span>
          </form>

        {currentUser ? (
          <div
            className="relative cursor-pointer order-3 lg:order-none mt-5 lg:mt-0"
            onClick={() => setDropdownActive(!dropdownActive)}
          >
            <img
              src={currentUser?.profilePic}
              alt={currentUser?.username}
              className="h-10 w-10 rounded-full object-cover"
            />

            {/* dropdown  */}
            <div
              className={`${
                dropdownActive ? "flex" : "hidden"
              } absolute top-12 right-4 flex-col  px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] rounded-lg transition-all duration-300 ease-linear z-50 bg-white`}
            >
              <Link
                to="/profile"
                className="text-nowrap w-max px-2 rounded-lg transition-all hover:bg-gray-100 duration-300 py-3  border-b-[1px] border-gray-500  "
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={currentUser?.profilePic}
                    alt={currentUser?.username}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h1 className="text-sm font-medium">
                    {currentUser?.username}
                    <br />
                    <span className="text-xs text-purple-400">
                      Visit Profile
                    </span>
                  </h1>
                  <span
                    className="ml-6 relative -mb-3
                  "
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
              <Link
                to="/setting"
                className="mt-4 rounded-lg p-2 transition-all hover:bg-gray-100 duration-300 cursor-pointer"
              >
                <i className="fa-solid fa-gear"></i>
                <span className="ml-2">Setting</span>
              </Link>
              <div
                onClick={() => setModelOpen(true)}
                className="text-red-500 rounded-lg p-2 transition-all hover:bg-gray-100 duration-300"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="ml-2">Log out</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-10 items-center order-3 lg:order-none mt-5 lg:mt-0">
            <Link to="/sign-in">
              <button className="tracking-wider text-lg font-medium text-nowrap font-rubik hover:text-purple-700 transition-all duration-200 ease-linear">
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


        {/* cross button */}
        <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-9 text-2xl lg:hidden" ><i className="fa-solid fa-xmark"></i></button>
        </div>
        {/* hamburger  */}
        <button className="text-2xl lg:hidden" onClick={() => setSidebarOpen(true)}>
          <i
            className="fa-solid fa-bars text-2xl"
          ></i>
        </button>

      </div>
      {modelOpen && (
        <Model setModelOpen={setModelOpen} handleOperation={handleSignOut} />
      )}
    </>
  );
}
