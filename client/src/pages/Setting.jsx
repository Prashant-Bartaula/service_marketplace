import { useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSuccess, deleteSuccess } from "../redux/userSlice";
import Model from "../components/Model";
import axios from "axios";
export default function Setting() {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const imageRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    const handleChange = () => {
      setErrorMessage("");
      setImageUploadError("");
      setUploadProgress("");
      setUpdateSuccessMessage("");
      setImageFile(imageRef.current.files[0]);
    };

    imageRef.current &&
      imageRef.current.addEventListener("change", handleChange);

    return () =>
      imageRef.current &&
      imageRef.current.removeEventListener("change", handleChange);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleImageUpload = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setErrorMessage("");
    setImageUploadError("");
    setUploadProgress("");

    if (!imageFile) {
      return setImageUploadError("Please select an image");
    }

    if (imageFile.size > 2000000) {
      return setImageUploadError("Image size must be less than 2MB");
    }

    const file = new FormData();
    file.append("file", imageFile);
    file.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    file.append("folder", "service-marketplace");

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        file,
        {
          onUploadProgress: (progressEvent) => {
            const percentComplete = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(percentComplete);
          },
        }
      );
      const data = await res.data;
      setImageUrl(data.secure_url);
      setFormData({
        ...formData,
        profilePic: data.secure_url,
      });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setImageUploadError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (Object.keys(formData).length === 0) {
      return setErrorMessage("make some changes");
    }

    try {
      setUpdating(true);
      const res = await fetch(
        `http://localhost:5000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await res.json();
      setUpdating(false);
      if (!res.ok) {
        return setErrorMessage(data.message);
      }

      setUpdateSuccessMessage(data.message);
      dispatch(updateSuccess(data.user));
    } catch (error) {
      setUpdating(false);
      setErrorMessage(error.message);
    }
  };

  const handleUserDelete = async () => {
    setOpenModel(false);
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if(!res.ok){
        return setErrorMessage(data.message);
      }
      dispatch(deleteSuccess());
      navigate('/user-sign-up')
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <div className="relative z-50 min-h-[800px] max-w-[500px] mx-auto flex flex-col gap-14 items-center justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 items-center w-full"
        >
          {/* image upload  */}
          <div className="flex justify-center flex-col">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imageRef}
              disabled={uploading}
            />
            <img
              src={imageUrl || currentUser?.profilePic}
              alt={currentUser?.username}
              className="w-[150px] h-[150px] rounded-full object-cover cursor-pointer"
              onClick={() => imageRef.current.click()}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={(e) => handleImageUpload(e)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg mt-4"
            >
              {uploading ? `Uploading...${uploadProgress + "%"}` : "upload"}
            </button>

            {imageUploadError && (
              <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>
            )}
          </div>

          <input
            type="text"
            defaultValue={currentUser?.email}
            className="p-2 rounded-lg border border-gray-300 w-full"
            readOnly
          />
          <input
            type="text"
            defaultValue={currentUser?.username}
            onChange={(e) => handleChange(e)}
            className="p-2 rounded-lg border border-gray-300 w-full"
            id="username"
            placeholder="Username..."
          />

          <input
            type="password"
            defaultValue="*****"
            onChange={(e) => handleChange(e)}
            className="p-2 rounded-lg border border-gray-300 w-full"
            id="password"
            placeholder="Password... "
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {updating ? "Updating..." : "Update"}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}
          {updateSuccessMessage && (
            <p className="text-green-500 text-sm mt-3">
              {updateSuccessMessage}
            </p>
          )}
        </form>

        <button
          type="button"
          className="text-sm text-gray-400"
          onClick={() => setOpenModel(true)}
        >
          <i className="fa-solid fa-trash"></i>
          <span className="ml-2">Delete Account</span>
        </button>
      </div>

      {openModel && (
        <Model setModelOpen={setOpenModel} handleOperation={handleUserDelete} />
      )}
    </>
  );
}
