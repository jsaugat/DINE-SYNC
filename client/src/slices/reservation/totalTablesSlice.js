import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   { number: 1, capacity: 4, isAvailable: true },
//   { number: 2, capacity: 4, isAvailable: true },
//   { number: 3, capacity: 4, isAvailable: true },

//   { number: 4, capacity: 2, isAvailable: true },
//   { number: 5, capacity: 2, isAvailable: true },
//   { number: 6, capacity: 2, isAvailable: true },
//   { number: 7, capacity: 2, isAvailable: true },

//   { number: 8, capacity: 6, isAvailable: true },
//   { number: 9, capacity: 6, isAvailable: true },

//   { number: 10, capacity: 8, isAvailable: true },
//   { number: 11, capacity: 8, isAvailable: true },
//   { number: 12, capacity: 8, isAvailable: true },
// ];

const totalTablesSlice = createSlice({
  name: "totalTables",
  initialState: [],
  reducers: {
    setTotalTables: (state, action) => {
      return action.payload; // assuming payload is an array of tables
    },
    clearAllTables: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setTotalTables, clearAllTables } = totalTablesSlice.actions;
export default totalTablesSlice.reducer;
