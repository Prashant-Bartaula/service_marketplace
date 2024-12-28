import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Setting() {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef=useRef(null)
  const { currentUser } = useSelector((state) => state.user);

  const handleChange=(e)=>{
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  console.log(formData)
  return (
    <div className="relative min-h-[800px] max-w-[500px] mx-auto flex flex-col gap-14 items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5 items-center w-full">
        {/* image upload  */}
        <div className="flex justify-center flex-col"> 
        <input type="file" accept="image/*" className="hidden" ref={imageRef}/>
        <img
          src={currentUser?.profilePic}
          alt={currentUser?.username}
          className="w-[150px] h-[150px] rounded-full cursor-pointer"
          onClick={()=>imageRef.current.click()}
        />
        <button type="button" onClick={(e)=>handleImageUpload(e)} className="px-4 py-2 bg-purple-600 text-white rounded-lg mt-4">Upload</button>
        </div>

        <input type="text" defaultValue={currentUser?.username} onChange={(e)=>handleChange(e)} className="p-2 rounded-lg border border-gray-300 w-full" id="username" placeholder="Username..."/>

        <input type="password" defaultValue='*****' onChange={(e)=>handleChange(e)} className="p-2 rounded-lg border border-gray-300 w-full" id="password" placeholder="Password... "/>

        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg">Update</button>
      </form>

      <button type="button" className="text-sm text-gray-400">
        <i className="fa-solid fa-trash"></i>
        <span className="ml-2">Delete Account</span>
      </button>
    </div>
  );
}
