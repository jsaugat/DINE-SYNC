import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: null,
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
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      state.usersData = state.usersData.filter(
        (user) => user._id !== userIdToDelete
      );
    },
  },
});

export const { setUsers, clearUsers, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
