import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      return action.payload;
    },
    deleteOrder: (state, action) => {
      return state.filter((order) => order._id !== action.payload);
    },
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { deleteOrder, setOrders, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
