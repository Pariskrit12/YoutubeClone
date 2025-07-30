import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    role: "",
    isAdmin:false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.role = action.payload.user?.role;
      if(state.role==="admin"){
        state.isAdmin=true;
      }
      
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = "";
      state.isAdmin=false
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
