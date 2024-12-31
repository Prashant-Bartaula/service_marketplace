import { useState } from "react"
export default function CreateService() {
  const [loading, setLoading]=useState(false);
  const [errorMessage, setErrorMessage]=useState('');
  const [servicePicImageFile, setServicePicImageFile]=useState('');
  const [formData, setFormData]=useState({})

  const handleChange=(e)=>{
    e.preventDefault();
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div className='min-h-[1200px] max-w-[700px] relative mx-auto flex justify-center items-center'>
        <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-6 w-full rounded-xl shadow-xl bg-white overflow-hidden pb-10">
          <h1 className="text-5xl text-white text-center py-16 bg-purple-600 font-rubik">Create Service</h1>

          <div className="w-full flex flex-col gap-2 px-4 mt-6">
            <label htmlFor="title" className="text-lg font-medium tracking-wider">Post Title <sup className="text-red-500">*</sup></label>
            <input type="text" id="title" name="title" className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg" placeholder="Enter Post Title..."/>
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="category" className="text-lg font-medium tracking-wider">Select Category<sup className="text-red-500">*</sup></label>
            <select name="category" id="category" className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg cursor-pointer">
              <option value="cleaning" defaultChecked>Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="repair">Repair</option>
              <option value="painting">Painting</option>
              <option value="shifting">Shifting</option>
              <option value="laundry">Laundry</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="description" className="text-lg font-medium tracking-wider">Post Description<sup className="text-red-500">*</sup></label>
            <textarea type="text" id="description" name="description" className="min-h-[100px] outline-none border-2 border-gray-400 px-3 py-2 rounded-lg" placeholder="Enter Post Description..."/>
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="date" className="text-lg font-medium tracking-wider">Select a service date<sup className="text-red-500">*</sup></label>
            <input type="date" id="date" name="date" className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg"/>
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="spicture" className="text-lg font-medium tracking-wider">Service Picture(optional)</label>
            <input type="file" accept="image/*" id="spicture" name="spicture" className="cursor-pointer"/>
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="price" className="text-lg font-medium tracking-wider">Price(In Rs.)<sup className="text-red-500">*</sup></label>
            <input type="number" id="price" name="price" className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg" />
          </div>

          <div className="w-full flex flex-col gap-2 px-4">
            <label htmlFor="gallery" className="text-lg font-medium tracking-wider">Gallery(optional)</label>
            <input type="file" accept="image/*" id="gallery" name="gallery" className="cursor-pointer" />
          </div>
         
         <div className="w-full relative px-4" onClick={(e)=>handleSubmit(e)}>
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
            Create Service
          </button>
         </div>
        </form>
    </div>
  )
}

        // {/* selected picture display */}
        // <div className="flex gap-5 flex-wrap w-full">

        // </div>