import { useState, useEffect } from "react"
export default function Analytics() {
  return (
    <div className="relative flex flex-wrap gap-5 justify-center max-w-[700px]">
        <div className="flex flex-col items-center  min-w-[200px] w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
                <h1 className="text-2xl font-semibold">232</h1>
                <h2 className="text-base"><i className="fa-solid fa-check"></i><span className="ml-3">Completed</span></h2>
        </div>
        <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
                <h1 className="text-2xl font-semibold">12</h1>
                <h2 className="text-base"><i className="fa-solid fa-circle-notch"></i><span className="ml-3">Ongoing</span></h2>
        </div>
        <div className="flex flex-col items-center  min-w-[200px] w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
                <h1 className="text-2xl font-semibold">12</h1>
                <h2 className="text-base"><i className="fa-solid fa-circle-notch"></i><span className="ml-3">Ongoing</span></h2>
        </div>
    </div>
  )
}
