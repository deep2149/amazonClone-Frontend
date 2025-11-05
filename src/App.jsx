import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import SignUp from "./Pages/SignupForm";
import LoginForm from "./Pages/Login";
import Products from "./Pages/Product";
import MyOrders from "./Pages/Order";
import CartPage from "./Pages/Cart";
import Navbar from "./Pages/Navbar";
import RootPage from "./Pages/RootPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
            <Route path="/user/*" element={<RootPage />} >
          {/* <Route path="/" element={<Products />} /> */}
          <Route path="products" element={<Products />} />
          <Route path="order" element={<MyOrders />} />
          <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
