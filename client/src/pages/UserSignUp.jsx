import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import SignUpImage from "../assets/Sign Up.png";

export default function UserSignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneRegex=/^\d{9}$/
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


        // form validation frontend 
        if(!formData.username || !formData.email || !formData.password || !formData.address || !formData.phone || formData.username==='' || formData.email==='' || formData.password==='' || formData.address==='' || formData.phone===''){ 
            return setErrorMessage("All fields are required");
        }

        if(!phoneRegex.test(formData.phone)){
            return setErrorMessage("Invalid phone number")
        }
        if(!emailRegex.test(formData.email)){
            return setErrorMessage("Invalid email address")
        }
        if(!passwordRegex.test(formData.password)){
            return setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        }

        try {
            setLoading(true);
            const res=await fetch('http://localhost:5000/api/auth/user-sign-up', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })

            const data=await res.json();
            if(!res.ok){
                setLoading(false);
                return setErrorMessage(data.message);
            }
            navigate('/sign-in')
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false)
        }

    }

    const handleChange=(e)=>{
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }

  return (
    <div
      className={`relative font-rubik min-h-[800px] flex justify-center max-w-[1200px] mx-auto py-[100px] px-4 flex-wrap bg-signup bg-no-repeat bg-center bg-cover lg:bg-none items-center`}
    >
      {/* left side  */}
      <div className="hidden lg:flex top-0">
        <img
          src={SignUpImage}
          alt="sign up image"
          className="h-auto max-h-[450px] object-cover"
        />
      </div>

      {/* overlay  */}
      <div className="absolute lg:hidden h-full w-full top-0 left-0 opacity-90 bg-white z-100"></div>

      {/* right side  */}
      <div className="relative z-100 p-6 text-nowrap flex-grow max-w-[600px]">
        <h1 className="text-2xl md:text-4xl font-rubik mb-10 text-center">
          Service Bazar
        </h1>

        <form className="flex flex-col gap-6" onSubmit={(e)=>handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium tracking-wider">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="enter your username..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium tracking-wider">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="enter your phone number..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-medium tracking-wider">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="enter your address..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium tracking-wider">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter your email..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium tracking-wider">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="enter your email..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="mt-3
             hover:bg-purple-600 hover:text-white transition-all duration-300 ease-linear text-lg font-medium border border-gray-500 px-3 py-2 rounded-lg"
          >
            {loading?'Signing up...':'Submit'}
          </button>
          <button
            type="button"
            className="
            hover:bg-purple-600 hover:text-white transition-all duration-300 ease-linear text-lg font-medium border border-gray-500 px-3 py-2 rounded-lg"
          >
            <i className="fa-brands fa-google mr-4 border border-gray-600 p-2 rounded-full"></i>
            Sign up with Google
          </button>
        </form>

        {/* miscellanious  */}
        <div className="flex flex-col gap-3 mt-14">
          <h1 className="text-xl">
            Sign up as a worker?{" "}
            <Link
              to="/worker-sign-up"
              className="font-medium hover:text-purple-500 transition-all duration-200 ease-linear"
            >
              Sign up
            </Link>{" "}
          </h1>
          <h1 className="text-xl mt-4">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-medium hover:text-purple-500 transition-all duration-200 ease-linear"
            >
              Login
            </Link>{" "}
          </h1>
          {errorMessage && <h1 className="bg-red-300 p-2 text-red-900 text-center rounded-lg mt-3 text-lg text-wrap">{errorMessage}</h1>}
        </div>
      </div>
    </div>
  );
}
