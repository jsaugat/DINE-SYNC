import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  usersData: null,
=======
  usersData: [],
>>>>>>> edee8bb93492480903c52e7fd4af1135115dae98
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
<<<<<<< HEAD
    },
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      state.usersData = state.usersData.filter(
        (user) => user._id !== userIdToDelete
      );
=======
>>>>>>> edee8bb93492480903c52e7fd4af1135115dae98
    },
  },
});

export const { setUsers, clearUsers, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
