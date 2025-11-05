import { CartContext } from "@/context/cart";
import React, { useContext } from "react";
import Navbar from "./Navbar";



export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <>
      <div>
        <h2>CART</h2>
        <div>
            {cartItems.map((item)=>(
                <div key={item.id}>
                    <div>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                    </div>
                    <div>
                        <button onClick={()=>{
                            addToCart(item)
                        }}>+</button>
                        <p>{item.quantity}</p>
                        <button onClick={()=>{
                            removeFromCart(item)
                        }}>-</button>
                    </div>
                </div>
            ))}
        </div>
    {
        cartItems.length>0 ? (
            <div>
                <p>${getCartTotal()}</p>
                <button onClick={()=>{
                    clearCart()
                }}>Clear Cart</button>
            </div>
        ) : (
            <p>Your cart is empty</p>

        )
    }
      </div>
    </>
  );
}

