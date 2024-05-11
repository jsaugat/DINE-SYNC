import { createSlice } from "@reduxjs/toolkit";

const initialBookingState = {
  name: "",
  phone: "",
  email: "",
};

const bookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState: initialBookingState,
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
    // TO RESET, you cannot directly "return initialState" as it breaks connection with the orignal state maintained by RTK's 'createSlice', instead modify the existing state object.
    resetBooking: (state) => {
      state.name = initialBookingState.name;
      state.phone = initialBookingState.phone;
      state.email = initialBookingState.email;
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
