import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

let initialState={index:0,}

export const viewedSlice=createSlice({
    name:'viewed',
    initialState,
    reducers:{
        setIndex(state,action){
            state.index=action.payload.index
        }
    }
})
export const {setIndex}=viewedSlice.actions;
export default viewedSlice.reducer