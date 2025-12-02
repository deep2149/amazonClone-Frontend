// import { useState } from "react";
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
import AdminCategoryPage from "./Pages/Category";
import BannerPage from "./Pages/Banner";
import Home from "./Pages/Home";
import GoogleCallback from "./Pages/GoogleCallback";
// import AdminProductPage from "./Pages/AdminProductPage";
// import AdminCreateOrder from "./Pages/AdminOrder";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/user/login" element={<AuthForm isAdmin={false} />} />
            <Route path="/user/signup" element={<AuthForm isAdmin={false} />} />
            <Route path="/admin/login" element={<AuthForm isAdmin={true} />} />
            <Route path="/admin/signup" element={<AuthForm isAdmin />} />
            <Route path="/oauth/callback" element={<GoogleCallback />} />

            {/* <Route path="/navbar" element={<Navbar />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginForm />} />
            
            <Route path="/user/*" element={<RootPage />}>
                <Route path="products" element={<Products />} />
                <Route path="order" element={<MyOrders />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="placeOrder" element={<PlaceOrder />} /> 
                <Route path="home" element={<Home />} /> 
            </Route>
            <Route path="/admin/*" element={<RootPage isAdmin={true} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="product" element={<AdminProducts />} />
                {/* <Route path="productsss" element={<AdminProductPage />} /> */}
                <Route path="orders" element={<AdminOrders />} />
                <Route path="AdminCategory" element={<AdminCategoryPage />} />
                <Route path="banner" element={<BannerPage />} />
                <Route path="home" element={<Home />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
