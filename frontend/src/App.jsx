import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Products from "./components/Products";
import Dashboard from "./Dashboard/Dashboard";
import Productlanding from "./components/productlanding";
import Cart from "./components/Cart";
import Chatbot from "./components/Chatbot";
import Profile from "./profile/Profile";

function App() {
  const existedUser = useSelector((state) => state.user);
  return (
    <>
  
    <BrowserRouter>

      <Routes>
      <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productid" element={<Productlanding />} />
        {existedUser.status ? (
          
         <>
         {/* user exist  */}
         
          <Route path="/cart" element={<Cart />}/>
          <Route path="/chatbot" element={<Chatbot />}/>
          <Route path="/profile" element={<Profile />}/>

          {/* if user is admin */}

          {existedUser.userData.isAdmin ? (<>
            <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) :(
            null
          )}

         </>

        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
