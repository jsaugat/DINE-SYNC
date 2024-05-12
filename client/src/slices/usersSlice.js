import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
