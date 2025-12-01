import React, { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const getBanners = async () => {
    const res = await api.get("/admin/banner");
    setBanners(res.data.banners);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    await api.post("/admin/banner", form);
    getBanners();
  };

  const deleteBanner = async (id) => {
    await api.delete(`/admin/banner/${id}`);
    getBanners();
  };

  const handleImageLinkClick = (bannerLink) => {
    if (!bannerLink) return;

    if (bannerLink.startsWith("/") && !bannerLink.includes("https")) {
      navigate(bannerLink);
    } else {
      window.open(bannerLink, "_blank");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">BANNER</h1>

      {/* Create Banner */}
      <form
        onSubmit={handleCreate}
        className="mt-4 p-4 bg-white shadow rounded"
      >
        <input
          type="text"
          placeholder="Banner Title"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <button className="bg-blue-600 text-black px-4 py-2 rounded">
          Add Banner
        </button>
      </form>

      {/* Banner List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="p-3 bg-white shadow rounded">
            {/* <img
              src={b.imageUrl}
              alt=""
              className="h-40 w-full object-cover rounded"
            /> */}
            <img
              src={b.imageUrl}
              className="h-40 w-full object-cover rounded cursor-pointer"
              onClick={() => handleImageLinkClick(b.redirectUrl)}
            />
            <p className="mt-2 font-semibold">{b.title}</p>
            <button
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => deleteBanner(b.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
