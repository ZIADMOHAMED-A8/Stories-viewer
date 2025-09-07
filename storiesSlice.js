import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://stories-dummybackend-production.up.railway.app'
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
