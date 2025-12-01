import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function AdminProductPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    stock: "",
    price: "",
    categoryId: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const categoryRes = await api.get("/api/admin/category");
    const productRes = await api.get("/api/admin");

    setCategories(categoryRes.data.categories);
    setProducts(productRes.data.products);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("stock", form.stock);
    fd.append("price", form.price);
    fd.append("categoryId", form.categoryId);

    for (let img of images) {
      fd.append("image", img);
    }

    await api.post("/api/admin", fd);

    setForm({
      title: "",
      description: "",
      stock: "",
      price: "",
      categoryId: "",
    });
    setImages([]);

    loadData();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">PRODUCTS</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded-md space-y-3"
      >
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-black px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6">All Products</h2>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-3 shadow rounded">
            <img
              src={p.images[0]?.url}
              className="h-32 w-full object-cover"
            />
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm">{p.description}</p>
            <p>₹ {p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
