import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
