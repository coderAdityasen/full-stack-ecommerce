import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { BsCartFill } from "react-icons/bs";
import {  setcart } from "../reducers/CartReducer";
import axios from "axios";
import { baseUrl } from "../util/apis";

function Navbar() {
  const navigate = useNavigate();
  const newUser = useSelector((user) => user.user);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/user/logout` , {withCredentials : true})
      dispatch(logout());
        dispatch(setcart())
    } catch (error) {
      console.log("there was an error" , error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="flex items-center justify-between xl:mx-20 my-5">
        <ul className="flex gap-5 items-center">
          <li className="font-bold text-2xl ml-10">
            <Link to="/">Home</Link>
          </li>
          <li className="font-bold text-2xl">
            <Link to="/products">products</Link>
          </li>
         {
          newUser.status ? ( <li className="font-bold text-2xl">
          <Link to="/chatbot">chatbot</Link>
        </li>) : null
         }
        </ul>

        {!newUser.status ? (
          <>
            <ul className="w-full hidden xl:flex items-center justify-center gap-5 font-bold text-2xl">
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
            <ul className="flex gap-10 items-center">
              <li>
                <Link to="/cart">
                  <BsCartFill className="text-xl" />{" "}
                  <div className="absolute top-1 ml-2 mt-1 bg-yellow-300 w-6 text-center h-6 rounded-full my-auto">
                    <h1>{cart.cart.length}</h1>
                  </div>
                </Link>
              </li>
              <li>
                <div ref={dropdownRef}>

                  {user.userData.avatar ? (
                    <div className="flex items-center transition-all duration-500 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 "
                        id="user-menu-button"
                        aria-expanded={isOpen}
                        onClick={toggleDropdown}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user.userData.avatar}
                          alt="user photo"
                        />
                      </button>
                      {/* Dropdown menu */}
                      <div
                        className={`z-50 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        } absolute transition-all duration-300 top-20 right-14 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700  dark:divide-gray-600`}
                        id="user-dropdown"
                      >
                        <div
                          className={`${
                            isOpen ? null : "hidden"
                          } px-4 py-3 transition-all duration-500`}
                        >
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {user.userData.fullname}
                          </span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.userData.email}
                          </span>
                        </div>
                        <ul
                          className={`${
                            isOpen ? null : "hidden"
                          } transition-all duration-500 py-2`}
                          aria-labelledby="user-menu-button"
                        >
                          {newUser.userData.isAdmin ? (
                            <>
                              <li>
                                <Link
                                  to="/dashboard"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Dashboard
                                </Link>
                              </li>
                            </>
                          ) : null}
                          <li>
                            <Link to="/vieworder"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              orders
                            </Link>
                          </li>
                          <li>
                            <Link to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Profile
                            </Link>
                          </li>
                          
                          <li>
                            <a
                             onClick={handleLogout}
                              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Sign out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                       <div className="flex items-center transition-all duration-500 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={isOpen}
                        onClick={toggleDropdown}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                          alt="user photo"
                        />
                      </button>
                      {/* Dropdown menu */}
                      <div
                        className={`z-50 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        } absolute transition-all duration-300 top-16 right-14 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700  dark:divide-gray-600`}
                        id="user-dropdown"
                      >
                        <div
                          className={`${
                            isOpen ? null : "hidden"
                          } px-4 py-3 transition-all duration-500`}
                        >
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {user.userData.fullname}
                          </span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.userData.email}
                          </span>
                        </div>
                        <ul
                          className={`${
                            isOpen ? null : "hidden"
                          } transition-all duration-500 py-2`}
                          aria-labelledby="user-menu-button"
                        >
                          {newUser.userData.isAdmin ? (
                            <>
                              <li>
                                <Link
                                  to="/dashboard"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Dashboard
                                </Link>
                              </li>
                            </>
                          ) : null}
                          <li>
                            <Link to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              profile
                            </Link>
                          </li>
                          
                          <li>
                            <a
                             onClick={handleLogout}
                              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Sign out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
