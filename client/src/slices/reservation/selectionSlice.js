import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
  name: "selection",
  initialState: {
    table: {
      number: null,
    },
    date: null,
    time: null,
    size: 0,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setTable: (state, action) => {
      state.table.number = action.payload;
    },
    clearAllSelection: (state) => {
      state.date = null;
      state.time = null;
      state.size = 0;
      state.table.number = null;
    },
  },
});

export const { setSize, setTime, setDate, setTable, clearAllSelection } =
  selectionSlice.actions;

export default selectionSlice.reducer; // export for store
