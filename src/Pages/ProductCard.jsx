import { CartContext } from "@/context/cart";
import React, { useContext } from "react";

export default function ProductCard({ product }) {
   const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  
  const firstImage = product?.images?.[0]?.url;


  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      {firstImage ? (
        <img
          src={firstImage}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-bold">₹{product.price}</span>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <div onClick={()=> addToCart(product)}>ADD TO CART</div>
        <div onClick={()=> console.log(cartItems)}>Console</div>
      </div>
    </div>
  );
}
