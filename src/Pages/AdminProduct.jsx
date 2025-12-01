import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", stock: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/product"); 
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/admin/${editingId}`, form);
      } else {
        await api.post("/admin", { ...form, images: [] });
      }
      fetchProducts();
      setForm({ title: "", description: "", stock: "", price: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/admin/deleteProduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description,
      stock: Number(product.stock),
      price: product.price,
    });
    setEditingId(product.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="w-full border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border p-2 rounded" />

        <Button className="text-black" type="submit" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">Stock: {p.stock} | ₹{p.price}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(p)}>Edit</Button>
              <Button className="text-black" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
