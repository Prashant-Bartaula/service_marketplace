import CustomerProfile from "../components/profile/customerProfile"
import AdminProfile from "../components/profile/adminProfile"
import WorkerProfile from "../components/profile/workerProfile"
import { useSelector } from "react-redux"
export default function ProfilePage() {

    const {currentUser}=useSelector((state)=>state.user)

  return currentUser?.role==="customer"?<CustomerProfile/>:currentUser?.role==="admin"?<AdminProfile/>:<WorkerProfile/>
}
