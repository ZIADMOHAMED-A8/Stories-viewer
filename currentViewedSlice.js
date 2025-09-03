import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

let initialState={index:null,InIndex:0}

export const viewedSlice=createSlice({
    name:'viewed',
    initialState,
    reducers:{
        setIndex(state,action){
            state.index=action.payload.index
        },
        setInIndex(state,action){
            state.InIndex=action.payload.InIndex
        },
        resetIndex(state,action){
            state.index=null
        },
        resetInIndex(state,action){
            state.InIndex=null
        },
        resetBoth(state,action){
            state.index=null
            state.InIndex=null

        }
    }
})
export const {setIndex,setInIndex,resetIndex,resetInIndex,resetBoth}=viewedSlice.actions;
export default viewedSlice.reducer