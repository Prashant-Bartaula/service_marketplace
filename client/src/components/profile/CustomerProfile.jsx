import { useSelector } from "react-redux"
export default function CustomerProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen max-w-[1000px] mx-auto flex flex-col py-[100px]">
      {/* left side  */}
      <div className="relative">
        <div className="flex gap-3 items-center">
          <div className="w-[115px] h-[115px] rounded-full overflow-hidden">
            <img src={currentUser?.profilePic} alt={currentUser?.username} />
          </div>

          <div className="flex flex-col gap-2 text-[#76787b]">
            <h1 className=" text-lg font-medium">{currentUser?.username}</h1>
            <h1 className="text-sm">{currentUser?.phone}</h1>
            <h1><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{currentUser?.address}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
