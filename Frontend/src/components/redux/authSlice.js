import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  shopName: localStorage.getItem("shopName") || "",
  userEmail: localStorage.getItem("userEmail") || "", // <-- Added userEmail to initialState
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Payload received:", action.payload);


      
      state.token = action.payload.token;
      state.shopName = action.payload.shopName;
      state.userEmail = action.payload.userEmail;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("shopName", action.payload.shopName);
      localStorage.setItem("userEmail", action.payload.userEmail);
    },
    logout: (state) => {
      state.token = null;
      state.shopName = "";
      state.userEmail = "";  // <-- Ensure userEmail is cleared on logout
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("shopName");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
