import { useState } from "react"
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <div className='relative flex items-center justify-between px-4 py-4'>
            {/* logo wrapper  */}
                <div className="flex gap-6 items-center">
                        <img src={logo} alt="logo" className="h-10 w-10 scale-[2.5] translate-y-2"/>
                        <span className="text-3xl font-rubik hidden sm:block">Marketplace</span>
                </div>

                {/* search */}
                <form className="px-4 py-2 rounded-2xl border-[1px] border-gray-700">
                    <input type="text" placeholder="Search anything... " className="outline-none  md:w-[250px] lg:w-[450px]" />
                    <span><i className="fa-solid fa-magnifying-glass"></i></span>
                </form>

                {/* login signup  */}
                <div className="hidden md:flex gap-10 items-center ">
                    <Link to='/sign-in'><button className="tracking-wider text-lg font-medium text-nowrap font-rubik">login</button></Link>
                    <Link to='/user-sign-up'><button className="tracking-wider text-lg font-medium border border-gray-500 px-3 py-2 rounded-lg text-nowrap font-rubik">Sign Up</button></Link>
                </div>
    </div>
  )
}
