import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="w-full border-b bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-lg font-semibold">
                Shop
              </Link>
            </div>

            <ul className="hidden md:flex items-center gap-6 text-sm">
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

            <div className="flex items-center">
              <Link to="/cart" aria-label="Cart" className="inline-flex items-center">

                <ShoppingCart className="h-6 w-6  " />
                <span className=" top-2 left-5 rounded-full bg-red-500 text-white text-xs px-1">0</span> 
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
