// import { CartContext } from "@/context/cart";
// import React, { useContext } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import { Minus, Plus } from "lucide-react";

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
//     useContext(CartContext);

//   return (
//     <>
//       {/* <div className="flex flex-col w-full ">
//         <h2>CART</h2>
//         <div>
//             {cartItems.map((item)=>(
//                 <div key={item.id}>
//                     <div>
//                         <p>{item.title}</p>
//                         <p>{item.price}</p>
//                     </div>
//                     <div>
//                         <button onClick={()=>{
//                             addToCart(item)
//                         }}>+</button>
//                         <p>{item.quantity}</p>
//                         <button onClick={()=>{
//                             removeFromCart(item)
//                         }}>-</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     {
//         cartItems.length>0 ? (
//             <div>
//                 <p>₹{getCartTotal()}</p>
//                 <button onClick={()=> navigate("/user/placeOrder")}>
//                 Place Order
//             </button>
//                 <button onClick={()=>{
//                     clearCart()
//                 }}>Clear Cart</button>
//             </div>
//         ) : (
        
//             <p>Your cart is empty</p>
            
       
//         )
//     }
//       </div> */}

//       <div className="flex-col flex items-center bg-gray-400 gap-8 p-10 text-black text-sm">
//         <h1 className="text-2xl font-bold">Cart</h1>
//         <div className="flex flex-row gap-4">
//           {cartItems.map((item) => (
//             <div className="flex justify-between items-center" key={item.id}>
//               <div className="flex gap-4">
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="rounded-md h-24"
//                 />
//                 <div className="flex flex-col">
//                   <h2 >{item.title}</h2>
//                   <p className="text-gray-600">{item.price}</p>
//                 </div>
//               </div>
//               <div className="flex justify-items-center gap-4">
//                 <button
//                   className=" text-black w-6 h-6 justify-items-center"
//                   onClick={() => {
//                     addToCart(item);
//                   }}
//                 >
//                   <Plus size={8}/>
//                 </button>
//                 <p>{item.quantity}</p>
//                 <button
//                   className=" text-black justify-items-center w-6 h-6 "
//                   onClick={() => {
//                     removeFromCart(item);
//                   }}
//                 >
//                    <Minus size={8}/>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {cartItems.length > 0 ? (
//           <div className="flex flex-col justify-between items-center gap-4">
//             <h2 >Total: ₹{getCartTotal()}</h2>
//             <button onClick={()=> navigate("/user/placeOrder")}>
//                 Place Order
//             </button>
//             <button
//               className="px-4 py-2 text-black  border-amber-400"
//               onClick={() => {
//                 clearCart();
//               }}
//             >
//               Clear cart
//             </button>
//           </div>
//         ) : (
//           <h1 className="text-lg font-bold">Your cart is empty</h1>
//         )}
//       </div>
//     </>
//   );
// }
import { CartContext } from "@/context/cart";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT – CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">Your Amazon Cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 py-5 border-b"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-medium text-lg">{item.title}</h2>
                  <p className="text-green-700 text-sm mt-1">In Stock</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="border px-2 py-1 rounded"
                      onClick={() => removeFromCart(item)}
                    >
                      <Minus size={12} />
                    </button>

                    <p className="font-medium">{item.quantity}</p>

                    <button
                      className="border px-2 py-1 rounded"
                      onClick={() => addToCart(item)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <p className="font-semibold text-lg">₹{item.price}</p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT – SUMMARY */}
        {cartItems.length > 0 && (
          <div className="bg-white p-6 rounded shadow h-fit sticky top-10">
            <h2 className="text-lg font-semibold mb-3">
              Subtotal ({cartItems.length} items):{" "}
              <span className="font-bold">₹{getCartTotal()}</span>
            </h2>

            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded mt-3"
              onClick={() => navigate("/user/placeOrder")}
            >
              Proceed to Buy
            </button>

            <button
              className="w-full mt-4 py-2 text-sm underline text-gray-600"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
