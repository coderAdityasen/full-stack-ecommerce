import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchcart = createAsyncThunk("fetchcart", async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/cart/cartitems/${id}`);
	console.log(response.data.cartItems);
    return response.data.cartItems;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error; // Rethrow the error to be caught elsewhere if needed
  }
});

const initialState = {
  cart: [],
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const product = action.payload;
      state.cart.push(product); // Push the new product to the cart array
    },
    increment: (state, action) => {
      // Update state logic for incrementing
    },
    decrement: (state, action) => {
      // Update state logic for decrementing
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcart.fulfilled, (state, action) => {
		console.log("data sent to cart");
      state.cart = action.payload; 
	  console.log("cart updated");// Set the cart state to the fetched cart items
    });
  },
});

export const { addtoCart, increment, decrement } = cartReducer.actions;

export default cartReducer.reducer;