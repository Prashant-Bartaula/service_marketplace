import { useState, useEffect } from "react";
export default function Analytics() {
  const [ongoingService, setOngoingService] = useState(0);
  const [completedService, setCompletedService] = useState(0);
  const [postedServices, setPostedServices] = useState(0);
  const [lastMonthServices, setLastMonthServices] = useState(0);
  const [totalWorker, setTotalWorker] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    const getService = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/service/getAllServices`,
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
        setPostedServices(data.postedServices);
        setLastMonthServices(data.lastMonthServices);
        setTotalWorker(data.totalWorker);
        setTotalCustomer(data.totalCustomer);
      } catch (error) {
        console.log(error.message);
      }
    };
    getService();
  }, []);

  return (
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
      <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{postedServices}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-save"></i>
          <span className="ml-3">Posted</span>
        </h2>
      </div>
      <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{lastMonthServices}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-arrow-up"></i>
          <span className="ml-3">Last month services</span>
        </h2>
      </div>
      <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{totalWorker}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-arrow-up"></i>
          <span className="ml-3">Total workers</span>
        </h2>
      </div>
      <div className="flex flex-col items-center min-w-[200px]  w-[45%] py-4 gap-2 text-gray-400 border-[2px] border-gray-200">
        <h1 className="text-2xl font-semibold">{totalCustomer}</h1>
        <h2 className="text-base">
          <i className="fa-solid fa-arrow-up"></i>
          <span className="ml-3">Total Customer</span>
        </h2>
      </div>
    </div>
  );
}
