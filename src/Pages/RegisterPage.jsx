import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { state } = useLocation(); // contains email, name, picture from Google

  useEffect(() => {
    if (!state?.email) {
      navigate("/login");
    }
  }, [state]);

  const [form, setForm] = useState({
    email: state?.email || "",
    name: state?.name || "",
    picture: state?.picture || "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/admin/register",
        form
      );

      localStorage.setItem("token", res.data.token);

      navigate("/user/products");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        {/* Profile picture */}
        <div className="flex justify-center">
          <img
            src={form.picture}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">
          Complete Your Registration
        </h2>

        <form onSubmit={submitForm} className="mt-6 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="w-full mt-1 p-3 bg-gray-200 cursor-not-allowed border rounded-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter phone number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Create Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
