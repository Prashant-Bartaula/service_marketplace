import { useState, useEffect } from "react";
export default function RateWorker({ setOpen, workerId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (rating) {
      const rateWorker=async()=>{
        let actualRating=Math.ceil(rating);
        console.log(actualRating)
        const res=await  fetch(`http://localhost:5000/api/user/rateWorker/${workerId}`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "include",
           body: JSON.stringify({ rating:actualRating }),
         })
          const data=await  res.json();
          if(!res.ok){
            alert(data.message)
          }
          alert('Thanks for rating');
         setOpen(false);
      }
      rateWorker();
      }
  },[rating]);
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative flex flex-col gap-7 bg-white items-center px-24 rounded-3xl py-10">
        <h2 className="text-xl ">User Rating</h2>
        <div className="flex gap-5 cursor-pointer">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    fontSize: "40px",
                    color: starValue <= (hover || rating) ? "#f5c518" : "#ccc",
                  }}
                >
                  ★
                </span>
              );
            })}
        </div>
        <span className="absolute top-5 right-5 cursor-pointer" onClick={() => setOpen(false)}><i className="fa-solid fa-xmark"></i></span>
      </div>
    </div>
  );
}
