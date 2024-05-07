import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  loading : true,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { signup , login , logout } = userReducer.actions;

export default userReducer.reducer;
