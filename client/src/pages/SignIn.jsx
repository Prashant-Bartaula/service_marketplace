import { Link } from "react-router-dom";
import SignUpImage from "../assets/Sign Up.png";

export default function UserSignUp() {
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

        <form className="flex flex-col gap-6">
         
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium tracking-wider">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter your email..."
              className="outline-none border-[1px] border-gray-500 px-3 py-2 rounded-lg"
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
            />
          </div>
          <button
            type="submit"
            className="mt-3
             hover:bg-purple-600 hover:text-white transition-all duration-300 ease-linear text-lg font-medium border border-gray-500 px-3 py-2 rounded-lg"
          >
            Submit
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
          <h1 className="text-xl ">
            Don't have an account yet?{" "}
            <Link
              to="/user-sign-Up"
              className="font-medium hover:text-purple-500 transition-all duration-200 ease-linear"
            >
              Sign Up
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
