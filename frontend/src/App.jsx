import Header from "./components/Header"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import Profile from "./screens/Profile"
import PrivateScreens from "./components/PrivateScreen"
import HomeScreen from "./screens/HomeScreen"
import {Route,Routes,useLocation} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./screens/adminScreens/AdminLogin"
import AdminHome from "./screens/adminScreens/AdminHome"
import AdminPrivateScreens from "./components/AdminPrivateScreens"
import AdminHeader from "./components/AdminHeader"
import UserHome from "./screens/UserHome"


function App() {
const location = useLocation()
const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
    {isAdmin ? <AdminHeader/> : <Header/>}
    <ToastContainer/>
    <Routes>

          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>} />
          <Route path="/admin" element={<AdminLogin/>}/>

         
          {/* private routes */}
          <Route path="" element={<PrivateScreens/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/home" element={<UserHome/>}/>

          </Route>

          {/* admin private routes */}
          <Route path="" element={<AdminPrivateScreens/>}>
          <Route path="/admin/data" element={<AdminHome/>}/>
           
          </Route>
      
    </Routes>
  
    </>
  )
}

export default App