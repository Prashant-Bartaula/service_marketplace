import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function CreateService() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [imageUploadSuccess, setImageUploadSuccess] = useState("");
  const [servicePicImageFile, setServicePicImageFile] = useState("");
  const [formData, setFormData] = useState({});
const navigate=useNavigate();


  const handleServiceImageFile = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setUploadProgress("");
    setImageUploadSuccess("");
    setServicePicImageFile(e.target.files[0]);
  };

  const handleImageUpload=async(e)=>{
    e.stopPropagation();
    e.preventDefault();
    
    setErrorMessage("");
    setUploadProgress("");
    setImageUploadSuccess("");

    if(!servicePicImageFile){
      return setErrorMessage("Please select a file");
    }
    if(servicePicImageFile.size>2000000){
      return setErrorMessage("Image size must be less than 2MB");
    }

    const imageFile=new FormData();
    imageFile.append("file",servicePicImageFile);
    imageFile.append("upload_preset",import.meta.env.VITE_CLOUDINARY_PRESET);
    imageFile.append("folder","service-marketplace");

  try{
    setUploading(true);
    const res=await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,imageFile, {

      onUploadProgress:(progressEvent)=>{
          const percentComplete=Math.round((progressEvent.loaded/progressEvent.total)*100);
          setUploadProgress(percentComplete);
      }
    })

    const data=res.data;
    setUploading(false);
    setImageUploadSuccess("Image uploaded successfully");
    setFormData({...formData,servicePic:data.secure_url});
  }catch(error){
    setUploading(false);
    setErrorMessage(error.message);
  }
}

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMessage("");

    try {
      setCreating(true);
        const res=await fetch(`http://localhost:5000/api/service/create`,{
          method:"POST",
          headers:{
            'Content-type': 'application/json'
          },
          body:JSON.stringify(formData),
          credentials:"include"
        });

        const data=await res.json();
        setCreating(false);
        if(!res.ok){
          return setErrorMessage(data.message);
        }
        navigate(`/service/${data.newService.slug}`)
    } catch (error) {
      setCreating(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="min-h-[1200px] max-w-[700px] relative mx-auto flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-6 w-full rounded-xl shadow-xl bg-white overflow-hidden pb-10"
      >
        <h1 className="text-5xl text-white text-center py-16 bg-purple-600 font-rubik">
          Create Service
        </h1>

        <div className="w-full flex flex-col gap-2 px-4 mt-6">
          <label htmlFor="title" className="text-lg font-medium tracking-wider">
            Post Title <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg"
            placeholder="Enter Post Title..."
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col gap-2 px-4">
          <label
            htmlFor="category"
            className="text-lg font-medium tracking-wider"
          >
            Select Category<sup className="text-red-500">*</sup>
          </label>
          <select
            name="category"
            id="category"
            className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg cursor-pointer"
            onChange={(e) => handleChange(e)}
          >
            <option value="">
              Not selected
            </option>
            <option value="cleaning">
              Cleaning
            </option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="repair">Repair</option>
            <option value="painting">Painting</option>
            <option value="shifting">Shifting</option>
          </select>
        </div>

        <div className="w-full flex flex-col gap-2 px-4">
          <label
            htmlFor="description"
            className="text-lg font-medium tracking-wider"
          >
            Post Description<sup className="text-red-500">*</sup>
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="min-h-[100px] outline-none border-2 border-gray-400 px-3 py-2 rounded-lg"
            placeholder="Enter Post Description..."
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col gap-2 px-4">
          <label htmlFor="serviceDate" className="text-lg font-medium tracking-wider">
            Select a service date<sup className="text-red-500">*</sup>
          </label>
          <input
            type="date"
            id="serviceDate"
            name="serviceDate"
            className="cursor-pointer outline-none border-2 border-gray-400 px-3 py-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col gap-2 px-4">
          <label htmlFor="price" className="text-lg font-medium tracking-wider">
            Price(In Rs.)<sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="outline-none border-2 border-gray-400 px-3 py-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full flex flex-col gap-2 px-4">
          <label
            htmlFor="spicture"
            className="text-lg font-medium tracking-wider"
          >
            Service Picture(optional)
          </label>
          <div className="flex justify-between flex-wrap">
            <input
              type="file"
              accept="image/*"
              id="spicture"
              name="spicture"
              className="cursor-pointer"
              disabled={uploading}
              onChange={(e) => handleServiceImageFile(e)}
            />
            <button className="p-2 bg-gray-800 rounded-lg text-white" onClick={handleImageUpload} disabled={uploading}>
              {uploading ? `Uploading...${uploadProgress}%` : "Upload"}
            </button>
          </div>

          {servicePicImageFile && (
            <div className="w-full">
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={URL.createObjectURL(servicePicImageFile)}
                  alt="Service Pic"
                  className="w-full h-full object-cover"
                />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer" onClick={() => setServicePicImageFile("")}><i className="fa fa-times"></i></span>
              </div>
            </div>
          )}
        </div>


        <div className="w-full relative px-4" onClick={(e) => handleSubmit(e)}>
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
            {creating ? "Creating..." : "Create Service"}
          </button>
        </div>

        {imageUploadSuccess && (
          <p className="text-green-500 text-center">{imageUploadSuccess}</p>
        )}

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

      </form>
    </div>
  );
}
