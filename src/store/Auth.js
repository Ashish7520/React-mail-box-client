import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isLogin: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      state.token = token;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.token = "";
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
