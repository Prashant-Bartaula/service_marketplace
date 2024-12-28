import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import {signInSuccess} from '../redux/userSlice'
import SignUpImage from "../assets/Sign Up.png";

export default function UserSignUp(){
  const [formData, setFormData] = useState({});
  const [loading, setLoading]=useState(false);
  const [errorMessage, setErrorMessage]=useState('');
  const {currentUser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
const navigate=useNavigate();

  const handleChange=(e)=>{
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.id]:e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password  || formData.email==='' || formData.password===''){
        return setErrorMessage("All fields are required");
    }

    try {
        setLoading(true);
        const res=await fetch('http://localhost:5000/api/auth/sign-in', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData),
            credentials: 'include'
        })

        const data=await res.json();
        if(!res.ok){
            setLoading(false);
            return setErrorMessage(data.message);
        }
        dispatch(signInSuccess(data.user))
        setLoading(false);
        navigate('/')
    } catch (error) {
        setErrorMessage(error.message);
        setLoading(false)
    }

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
      <div className="absolute lg:hidden h-full w-full top-0 left-0 opacity-80 bg-white z-100"></div>
      {/* right side  */}
      <div className="relative z-100 p-6 text-nowrap flex-grow max-w-[600px]">
        <h1 className="text-2xl md:text-4xl font-rubik mb-10 text-center">
          Service Bazar
        </h1>

        <form className="flex flex-col gap-6" onSubmit={(e)=>handleSubmit(e)}>
         
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
            {loading?"Signing In...":"Sign In"}
          </button>
        </form>

        {/* miscellanious  */}
        <div className="flex flex-col gap-3 mt-14">
          <h1 className="text-xl ">
            Don't have an account yet?{" "}
            <Link
              to="/user-sign-Up"
              className="font-medium hover:text-purple-500 transition-all duration-200 ease-linear"
            >
              Sign Up
            </Link>{" "}
          </h1>
          {errorMessage && <h1 className="bg-red-300 p-2 text-red-900 text-center rounded-lg mt-3 text-lg text-wrap">{errorMessage}</h1>}
        </div>
      </div>
    </div>
  );
}
