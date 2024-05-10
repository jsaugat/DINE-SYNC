import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  email: "",
};

const bookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState,
  reducers: {
    setBookingName: (state, action) => {
      state.name = action.payload;
    },
    setBookingPhone: (state, action) => {
      state.phone = action.payload;
    },
    setBookingEmail: (state, action) => {
      state.email = action.payload;
    },
    resetBooking: (state) => {
      return initialBookingState;
    },
  },
});

export const {
  setBookingName,
  setBookingPhone,
  setBookingEmail,
  resetBooking,
} = bookingDetailsSlice.actions;
export default bookingDetailsSlice.reducer;
