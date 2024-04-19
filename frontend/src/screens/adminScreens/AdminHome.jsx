import { useEffect, useState } from "react"
import { useAdminHomeMutation } from "../../../AdminSlices/adminApiSlices"
import UsersDataTable from "../../components/UserDataTable"
import Loader from '../../components/Loader.jsx'



const AdminHome = () => {
    const [AdminHome,{isLoading}] = useAdminHomeMutation()
    const [state,setState] = useState([])
    useEffect(()=>{
        const fetchData =async()=>{
            try {
                const response = await AdminHome().unwrap();
               
                setState(response)
             
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData()
    },[])
    
  return (
    
    <div>
      <h1>Users List</h1>
        {isLoading ? <Loader/> : <UsersDataTable users={state}/>}
        
 
    </div>
  )
}

export default AdminHome