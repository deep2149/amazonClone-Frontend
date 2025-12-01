import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", type: "PRODUCT" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/category");
      console.log(res.data);
      setCategories(res.data.category || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/admin/category/${editId}`, form);
    } else {
      await api.post("/admin/category", form);
    }

    setForm({ name: "", type: "PRODUCT" });
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`admin/category/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CATEGORY</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded-md space-y-3"
      >
        <input
          className="border p-2 w-full"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="PRODUCT">PRODUCT</option>
          <option value="BANNER">BANNER</option>
        </select>

        <button className="bg-blue-600 text-black px-4 py-2 rounded">
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">All Categories</h2>

      <table className="w-full mt-3 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">{cat.type}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-black rounded"
                  onClick={() => {
                    setForm({ name: cat.name, type: cat.type });
                    setEditId(cat.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-black rounded"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
