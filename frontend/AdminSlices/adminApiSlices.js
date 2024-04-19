import { apiSlice } from "../src/slices/apiSlices";

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        Adminlogin:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}`,
                method:'POST',
                body:data
            })
        }),
        AdminHome:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/data`,
                method:'GET'
            })
        }),
        AdminDelete:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/delete`,
                method:'DELETE',
                body:data
            })
        }),
        AdminEdit:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/edit`,
                method:'PUT',
                body:data
            })
        }),
        AdminLogout:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'POST',
                
            })
        }),
    })
})

export const {
    useAdminloginMutation,
    useAdminHomeMutation,
    useAdminDeleteMutation,
    useAdminEditMutation,
    useAdminLogoutMutation
} = adminApiSlice;