import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    bookings:[],
    loading:false,
    bookingDetails:null,

};

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingRequest:(state)=>{
            state.loading = true;
        },
        setBookings(state,action){
            state.bookings = action.payload;
             state.loading=false;
        },
       addBookings:(state,action)=>{
        state.bookings.push(action.payload);
       },
       setBookingDetails:(state,action)=>{
        state.bookingDetails = action.payload.bookings;
       }
    }
})

export const {setBookings,addBookings,setBookingDetails} = bookingSlice.actions;
export default bookingSlice.reducer;