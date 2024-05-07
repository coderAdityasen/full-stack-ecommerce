import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { BsCartFill } from "react-icons/bs";
import axios from "axios";
import { fetchcart } from "../reducers/CartReducer";

function Navbar({loading}) {
  const navigate = useNavigate();
  const newUser = useSelector((user) => user.user);
  const [cartitems , setcartitems] = useState(0)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart); 
  // console.log(user);


  const handleLogout = () => {
    dispatch(logout());
  };



  return (
    <>
      <nav className="flex items-center justify-between mx-20 my-5">
        <ul>
          <li className="font-bold text-2xl">
            <Link to="/">Home</Link>
          </li>
        </ul>

        {!newUser.status ? (
          <>
            
              <ul className="w-full flex items-center justify-center gap-5 font-bold text-2xl">
              <li>
                <Link to="/products">product</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="flex items-center gap-5 text-xl font-semibold">
              <li>
                <Link to="/products">products</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
            {newUser.userData.isAdmin ? (
              <>
                <ul  className="flex gap-10 items-center">
                <li>
                    <Link to="/cart" >
                    <BsCartFill className="text-xl" /> <div className="absolute top-1 ml-2 mt-1 bg-yellow-300 w-6 text-center h-6 rounded-full my-auto"><h1>{cart.cart.length}</h1></div>
                    </Link>
                   
                  </li>
                  <li>
                    <Link className="font-semibold text-xl" to="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <Link to="/cart" >
                    <BsCartFill className="text-xl" /> <div className="absolute top-1 ml-2 mt-1 bg-yellow-300 w-6 text-center h-6 rounded-full my-auto"><h1>{cart.cart.length}</h1></div>
                    </Link>
                   
                  </li>
                </ul>
              </>
            )}
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
