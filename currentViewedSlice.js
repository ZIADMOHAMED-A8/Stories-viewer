import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

let initialState={index:0,InIndex:0}

export const viewedSlice=createSlice({
    name:'viewed',
    initialState,
    reducers:{
        setIndex(state,action){
            state.index=action.payload.index
        },
        setInIndex(state,action){
            state.InIndex=action.payload.InIndex
        }
    }
})
export const {setIndex,setInIndex}=viewedSlice.actions;
export default viewedSlice.reducer