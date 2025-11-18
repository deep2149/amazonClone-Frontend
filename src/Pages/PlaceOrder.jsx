// import React, { useContext, useState } from "react";
// import { api } from "@/utils/api";
// import { CartContext } from "@/context/cart";
// import { useNavigate } from "react-router-dom";

// export default function PlaceOrder() {
//   const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handlePlaceOrder = async () => {
//     if (!address.trim()) {
//       alert("Please enter your address before placing the order!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("auth_token"); 
//       const items = cartItems.map((item) => ({
//         productId: item.id,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       const res = await api.post(
//         "http://localhost:3001/api/order/create",
//         { items, address },
//         { headers: { Authorization: localStorage.getItem('auth_token')} }
//       );
     

//       if (res.data.success) {
//         const { rzpOrder } = res.data;

//         if (rzpOrder.short_url) {
//           window.location.href = rzpOrder.short_url;
//         //   window.open(rzpOrder.short_url, "_blank")
//         } else {
//           alert("Order created successfully!");
//           clearCart();
//           // navigate("/user/order");
//         }
//       }
//     } catch (error) {
//       console.error("Order creation error:", error);
//       alert("Error placing order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

//       {cartItems.length > 0 ? (
//         <>
//           <div className="border-b pb-4 mb-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center py-2 border-b"
//               >
//                 <p>{item.title}</p>
//                 <p>
//                   ₹{item.price} * {item.quantity}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <h3 className="text-xl font-semibold mb-4">
//             Total: ₹{getCartTotal()}
//           </h3>

//           <textarea
//             placeholder="Enter your address..."
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full border rounded-lg p-3 mb-4"
//             rows={3}
//           />

//           <button
//             disabled={loading}
//             onClick={handlePlaceOrder}
//             className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//         </>
//       ) : (
//         <p>Your cart is empty. Add some products before placing an order.</p>
//       )}
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import { api } from "@/utils/api";
import { CartContext } from "@/context/cart";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address.trim()) return alert("Enter your address");

    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await api.post(
        "/order/create",
        { items, address },
        { headers: { Authorization: localStorage.getItem("auth_token") } }
      );

      if (res.data.success) {
        const { rzpOrder } = res.data;

        if (rzpOrder.short_url) {
          window.location.href = rzpOrder.short_url;
        } else {
          alert("Order placed!");
          clearCart();
          navigate("/user/order");
        }
      }
    } catch (e) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Your cart is empty.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT – ADDRESS FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

          <textarea
            className="w-full border rounded p-3"
            rows={4}
            placeholder="Enter full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded font-medium"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white p-6 rounded shadow h-fit sticky top-10">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <p>
                {item.title} × {item.quantity}
              </p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">
            Total: ₹{getCartTotal()}
          </h3>
        </div>
      </div>
    </div>
  );
}


