import { CartContext } from "@/context/cart";
import React, { useContext } from "react";
import { Minus, Plus, Trash } from "lucide-react";

export default function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const firstImage = product?.images?.[0]?.url;
 
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 mx-auto w-64">
      {/* Product Image */}
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

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1  ">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm mb-2 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mb-3">
        <span className="text-blue-600 font-bold">₹{product.price}</span>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      
      <div className="flex justify-center">
        {cartItem ? (
        
          <div className="flex items-center gap-3">
            <button
              onClick={() => removeFromCart(product)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
             {(cartItem.quantity > 1) ?(
              <Minus size={14}/>
             ):(
              <Trash size={14}/>
             )}
            </button>
            <span className="font-semibold">{cartItem.quantity}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (      
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-black px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
