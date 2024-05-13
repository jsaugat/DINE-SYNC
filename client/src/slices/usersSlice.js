import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.usersData = action.payload;
    },
    clearUsers: (state) => {
      state.usersData = [];
    },
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
