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
    updateavatar : (state , action)=>{
      state.userData.avatar = action.payload
    },
    updateuserinfo : (state , action)=>{
      state.userData.fullname = action.payload.fullname
      state.userData.email = action.payload.email
    },

    setloadingtrue : (state , action)=>{
      state.loading = true
    },
    setloadingfalse : (state , action)=>{
      state.loading = false
    }
  },
});

export const { signup , login , logout ,setloadingtrue , setloadingfalse , updateavatar , updateuserinfo} = userReducer.actions;

export default userReducer.reducer;
