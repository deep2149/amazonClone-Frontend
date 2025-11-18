import React, { useContext, useEffect, useState } from "react";
import { api } from "@/utils/api"; 
import Navbar from "./Navbar";
import { CartContext } from "@/context/cart";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError]= useState("");
  const [loading, setLoading] = useState(true);
  const { clearCart }  = useContext(CartContext)

  // if ( clearCart ( from query ) === true then clearCart )


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
  
    const res = await api.get("/order/myOrder");

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
       setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders found</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="p-5 border rounded-lg shadow-sm bg-white"
//             >
//               <h3 className="text-lg font-semibold mb-2 text-blue-700">
//                 Order ID: {order.id}
//               </h3>
//               <p>
//                 <strong>Address:</strong> {order.address}
//               </p>
//               <p>
//                 <strong>Total Amount:</strong> ₹{order.totalAmount}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <span className="text-green-600">{order.paymentStatus}</span>
//               </p>

//               <div className="mt-4">
//                 <h4 className="font-semibold mb-2">Items:</h4>
//                 <ul className="space-y-2">
//                   {order.orderItems.map((item) => (
//                     <li
//                       key={item.id}
//                       className="flex items-center justify-between bg-gray-50 p-3 rounded"
//                     >
//                       <div className="flex items-center gap-3">
                       
//                           <img
//                             src={item.product.images[0].url}
//                             alt={item.product.title}
//                             className="w-16 h-16 object-cover rounded"
//                           />
                        
//                         <div>
//                           <p className="font-medium">{item.product.title}</p>
//                           <p className="text-sm text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <p className="font-semibold">₹{item.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get("/order/myOrder").then((res) => {
//       if (res.data.success) setOrders(res.data.orders);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow p-6 rounded">
              <h3 className="text-lg font-semibold text-blue-700">
                Order #{order.id}
              </h3>

              <p className="mt-1 text-gray-700">
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  {order.paymentStatus}
                </span>
              </p>

              <div className="mt-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0].url}
                        className="w-20 h-20 object-contain"
                        alt=""
                      />
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-lg">₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
