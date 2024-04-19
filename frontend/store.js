import { configureStore} from '@reduxjs/toolkit';
import authReducer from './src/slices/authSlice.js'
import { apiSlice } from './src/slices/apiSlices.js';
import adminAuthReducer from './AdminSlices/AuthSlices.js'


const store = configureStore({
    reducer:{
        auth:authReducer ,
        adminAuth:adminAuthReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
}) 

export default store
