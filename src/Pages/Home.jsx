import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import ProductCard from "@/Pages/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [slide, setSlide] = useState(0);

  // Fetch Home Data
  const fetchHomeData = async () => {
    try {
      const bannerRes = await api.get("/admin/banner");
      const categoryRes = await api.get("/admin/category");
      const productRes = await api.get("/admin/product");

      setBanners(bannerRes.data.banners || []);
      setCategories(categoryRes.data.category || []);
      setProducts(productRes.data.products || []);
    } catch (error) {
      console.error("Home fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const nextSlide = () => setSlide((slide + 1) % banners.length);
  const prevSlide = () => setSlide((slide - 1 + banners.length) % banners.length);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* BANNER*/}
      <div>
      {banners.length > 0 && (
        <div className="relative w-full overflow-hidden max-h-[450px]">
          <img
            src={banners[slide].imageUrl}
            className="w-full object-cover duration-700"
            alt="banner"
          />

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full shadow"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full shadow"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )} </div>

      {/* CATEGORIES  */}
      <div className="pt-20">
          <h2 className="font-bold text-2xl">Category</h2>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 relative z-10">        
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow cursor-pointer hover:scale-105 duration-300"
          >
            {/* <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
            <img src={cat.image} className="h-40 w-full object-cover rounded" /> */}
            <h3 className="font-bold">{cat.name}</h3>
            <p className="text-black">{cat.type}</p>
            <p className="text-blue-600 mt-2">Shop now</p>
          </div>
        ))}
      </div>

      {/* TOP DEALS SCROLL ROW */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-5">Top Deals For You</h2>

        <div className="flex overflow-x-auto gap-6 pb-3">
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className="min-w-[220px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* ALL PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">All Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
