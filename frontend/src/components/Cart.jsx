import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import axios from 'axios';
import { fetchcart } from '../reducers/CartReducer';

function Cart() {
    const getcart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch()
    console.log(getcart);

    // Function to delete a product from the cart (dummy functionality)
    const deleteProduct =async (productId , owner) => {
		const data = {
			"product": productId
		}
        const response = await axios.post(`http://localhost:8000/cart/deletecartproduct/${owner}` , data)
		 console.log(response);
		 dispatch(fetchcart(owner))
    };

    // Function to calculate total order value
    const calculateTotal = () => {
        let total = 0;
        getcart.forEach((cart) => {
            total += cart.quantity * cart.product.price;
        });
        return total;
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-10">
				
                <h1 className="text-3xl text-center my-10 font-bold mb-6">Your Cart</h1>
                {getcart.length === 0 ? (
                    <p className="text-xl text-gray-500">Your cart is empty.</p>
                ) : (
                    <>
                        {getcart.map((cart) => {
                            return (
                                <div className="flex items-center justify-between border-b-2 py-4 mx-20" key={cart._id}>
                                    <div className="flex items-center gap-4">
                                        <img className="h-24 " src={cart.product.image} alt="" />
                                        <div>
                                            <h2 className="text-xl font-semibold">{cart.product.title}</h2>
                                            <p className="text-gray-500">{cart.product.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-gray-500">{cart.quantity}</p>
                                        <p className="text-gray-500">{cart.quantity * cart.product.price}</p>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => deleteProduct(cart.product._id , cart.owner)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex justify-end mt-6 mr-20">
                            <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>
                        </div>
                        <div className="flex justify-end mt-6 mr-20">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Cart;