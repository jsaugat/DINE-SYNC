import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // set the payload to STATE and LOCAL-STORAGE
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      // clear STATE and LOCAL-STORAGE
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

/** 
 *? authSlice  
    deals with STATE and LOCAL-STORAGE stuffs -> 
    - take user data from api and store them in STATE and LOCAL-STORAGE and remove from LocalStorage on  logout
    - deals with user id, name, email
    - does not deal with token (i.e. stored in http cookie)
 */
