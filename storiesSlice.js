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
            })
        })
    })
})
export const { useGetStoriesQuery } = apiSlice;
export default apiSlice;
