import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartPage from "./Cart";
import  {CartContext}  from "@/context/cart";


export default function Navbar({isAdmin=false}) {
    const { cartItems }= useContext(CartContext)

  return (
    <>
      <nav className="min-w-screen border-b bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-lg font-semibold">
                Shop
              </Link>
            </div>
            {isAdmin ?(
              <ul className="hidden md:flex items-center gap-6 text-sm">
              <li>
                <Link to="/admin/orders" className="hover:text-gray-700">
                  Orders
                </Link>
                
              </li>
              <li>
                <Link to="/admin/product" className="hover:text-gray-700">
                  Product
                </Link>
              </li>
            </ul>
            ):(<ul className="hidden md:flex items-center gap-6 text-sm">
              <li>
                <Link to="/user/order" className="hover:text-gray-700">
                  Order
                </Link>
                
              </li>
              <li>
                <Link to="/user/products" className="hover:text-gray-700">
                  Products
                </Link>
              </li>
            </ul>)}
            

            <div className="flex items-center">
              <Link to="/user/cart" aria-label="Cart" className="inline-flex items-center">

                <ShoppingCart className="h-6 w-6  " />
                <span className=" top-2 left-5 rounded-full bg-red-500 text-white text-xs px-1">{cartItems.length > 0 ? cartItems.length : '' }</span> 
              </Link>
            </div>
          </div>

          {/* Mobile links */}
          <div className="md:hidden py-2">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link to="/order" className="hover:text-gray-700">
                  Order
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gray-700">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
