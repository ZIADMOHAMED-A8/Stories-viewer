import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000'
    }),
    endpoints:builder=>({
        getStories:builder.query({
            query:()=>({
                url:'/stories',
                method:'GET'
            }),
            
        }),
        getUsers:builder.query({
            query:()=>({
                url:'/users',
                method:'GET'
            })
        })
    })
})
export const { useGetStoriesQuery,useGetUsersQuery } = apiSlice;
export default apiSlice;
