export default function Model({setModelOpen, handleOperation}) {
  return (
    <div className='absolute flex justify-center items-center h-full w-full top-0 left-0 z-[1000] bg-black bg-opacity-50 transition-all duration-300 ease-linear lg:scale-[2] origin-center'>
        <div className="relative z-1000 bg-white px-5 py-4 rounded-xl w-[250px] text-center">
            <h1>Are you sure you want to sign out?</h1>
            <div className="flex justify-between mt-7 text-xs">
                <button onClick={handleOperation} className="p-2 bg-red-500 rounded-lg text-white">Sign Out</button>
                <button onClick={() => setModelOpen(false)}className="p-2 bg-gray-800 rounded-lg text-white">Cancel</button>
            </div>
        </div>
    </div>
  )
}
