import {configureStore} from '@reduxjs/toolkit'
import apiSlice from '../storiesSlice'
import viewedSlice  from '../currentViewedSlice'

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        current:viewedSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})