import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.js";
import CartReducer from "../reducers/CartReducer.js";
import AichatReducer from "../reducers/AichatReducer.js";


const rootReducer = combineReducers({
  user: userReducer,
    cart : CartReducer,
    aichat : AichatReducer
})
const store = configureStore({
  reducer: rootReducer
});

export default store;
