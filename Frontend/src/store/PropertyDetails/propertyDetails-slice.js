import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name:"propertydetails",
    initialState:{
        propertydetails:null,
        error:null,
        loading:false
    },
    reducers:{
        getListRequest(state){
            state.loading = true
        },
        getPropertyDetails(state,action){
            state.propertydetails = action.payload;
            state.loading = false;
        },
        getError(state,action){
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const propertyDetailsAction = propertyDetailsSlice.actions;

export default propertyDetailsSlice;