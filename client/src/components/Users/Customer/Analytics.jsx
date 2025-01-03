import { useState, useEffect } from "react";
export default function Analytics() {
  const [ongoingService, setOngoingService] = useState(0);
  const [completedService, setCompletedService] = useState(0);
  const [bookmarked, setBookmarked] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    const getService = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/service/getCustomerServices`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          return setErrorMessage(data.message);
        }
        setCompletedService(data.completedService);
        setOngoingService(data.ongoingService);

        const localStorageData = JSON.parse(
          window.localStorage.getItem("services")
        );
        setBookmarked(localStorageData.length);
      } catch (error) {
        console.log(error.message);
      }
    };
    getService();
  }, []);
  return errorMessage ? (
    <div className="text-center text-3xl text-gray-400">
      Internal Server Error
    </div>
  ) : (
    <div className="relative flex flex-wrap gap-5 justify-center max-w-[700px]">
      <div className="flex flex-col items-center  min-w-[200px] w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{completedService}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-check"></i>
          <span className="ml-3">Completed</span>
        </h2>
      </div>
      <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{ongoingService}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-circle-notch"></i>
          <span className="ml-3">Ongoing</span>
        </h2>
      </div>
      <div className="flex flex-col items-center  min-w-[200px] w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{bookmarked}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-bookmark"></i>
          <span className="ml-3">Bookmarked</span>
        </h2>
      </div>
    </div>
  );
}
