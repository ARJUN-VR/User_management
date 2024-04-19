import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo'))
    :null
}


const authSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        localStoreLogout: (state)=>{
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        }
    }
})

export const { setCredentials,localStoreLogout} = authSlice.actions;

export default authSlice.reducer;