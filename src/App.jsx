import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { AuthProvider } from "./Pages/AuthContext";
import AuthForm from "./Pages/AuthForm";
import SignUp from "./Pages/SignupForm";
import LoginForm from "./Pages/Login";
import Products from "./Pages/Product";
import MyOrders from "./Pages/Order";
import CartPage from "./Pages/Cart";
import Navbar from "./Pages/Navbar";
import RootPage from "./Pages/RootPage";
import PlaceOrder from "./Pages/PlaceOrder";
import AdminProducts from "./Pages/AdminProduct";
import AdminOrders from "./Pages/AdminOrder";
import Dashboard from "./Pages/Dashboard";
// import AdminCreateOrder from "./Pages/AdminOrder";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/user/login" element={<AuthForm isAdmin={false} />} />
            <Route path="/user/signup" element={<AuthForm isAdmin={false} />} />
            <Route path="/admin/login" element={<AuthForm isAdmin />} />
            <Route path="/admin/signup" element={<AuthForm isAdmin />} />
            {/* <Route path="/navbar" element={<Navbar />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user/*" element={<RootPage />}>
              {/* <Route path="/" element={<Products />} /> */}
              <Route path="products" element={<Products />} />
              <Route path="order" element={<MyOrders />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="placeOrder" element={<PlaceOrder />} />
            </Route>

            <Route path="/admin/*" element={<RootPage />}>
            <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
