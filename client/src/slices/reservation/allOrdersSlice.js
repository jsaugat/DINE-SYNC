import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    setAdOrders: (state, action) => {
      return action.payload;
    },
    deleteAdOrder: (state, action) => {
      return state.filter((order) => order._id !== action.payload);
    },
    addAdOrder: (state, action) => {
      return state.push(action.payload);
    }
  },
});

export const { deleteAdOrder, setAdOrders } = allOrdersSlice.actions;
export default allOrdersSlice.reducer;
