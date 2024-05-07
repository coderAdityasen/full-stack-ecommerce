import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.js";
import CartReducer from "../reducers/CartReducer.js";


const rootReducer = combineReducers({
  user: userReducer,
    cart : CartReducer
})
const store = configureStore({
  reducer: rootReducer
});

export default store;
