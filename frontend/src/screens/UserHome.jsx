
import FormContainer from "../components/formContainer"
import { useSelector } from "react-redux"

const UserHome = () => {
    
    const {userInfo} = useSelector((state)=>state.auth)
    console.log(userInfo);
  return (
    <FormContainer>
        <h1>Welcome! {userInfo.name}</h1>
    </FormContainer>
  )
}

export default UserHome