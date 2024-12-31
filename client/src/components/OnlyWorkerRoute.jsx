import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
export default function OnlyWorkerRoute() {
    const {currentUser}=useSelector((state)=>state.user)
 return currentUser?.role==="worker"?<Outlet/>:<Navigate to="/"/>
}
