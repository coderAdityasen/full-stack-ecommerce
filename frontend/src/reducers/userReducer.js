import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  loading : false,
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
    logout: (state , _) => {
      state.status = false;
      state.userData = null;

    },
    setloadingtrue : (state , action)=>{
      state.loading = true
    },
    setloadingfalse : (state , action)=>{
      state.loading = false
    }
  },
});

export const { signup , login , logout ,setloadingtrue , setloadingfalse} = userReducer.actions;

export default userReducer.reducer;
