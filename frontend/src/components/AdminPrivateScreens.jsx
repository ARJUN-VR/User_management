import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPrivateScreens() {

   const {adminInfo} = useSelector((state)=>state.adminAuth)
   

  return adminInfo ? <Outlet/> : <Navigate to='/admin' replace/>
}

export default AdminPrivateScreens;