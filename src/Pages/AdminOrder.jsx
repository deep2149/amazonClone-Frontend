import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [newOrder, setNewOrder] = useState({
    userId: "",
    items: [{ productId: "", price: "", quantity: "" }],
  });

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/myOrder");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await api.put(`/admin/update/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/admin/delete/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const addItemField = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: "", price: "", quantity: "" }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index][field] = value;
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  // const handleCreateOrder = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     await api.post("/admin/create", {
  //       userId: Number(newOrder.userId),
  //       items: newOrder.items.map((item) => ({
  //         productId: Number(item.productId),
  //         price: Number(item.price),
  //         quantity: Number(item.quantity),
  //       })),
  //     });
  //     setNewOrder({ userId: "", items: [{ productId: "", price: "", quantity: "" }] });
  //     setCreateMode(false);
  //     fetchOrders();
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Order #{o.id}</h3>
                  <p className="text-sm text-gray-600">
                    User: {o.user?.name || "N/A"} | ₹{o.totalAmount}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PLACED">Placed</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                  <Button
                    className="text-black"
                    variant="destructive"
                    onClick={() => handleDelete(o.id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
