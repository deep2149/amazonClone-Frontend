import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "@/utils/api";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Google OAuth pre-filled data (if available)
  const googleData = location.state || {};

  const [formData, setFormData] = useState({
    name: googleData.name || "",
    email: googleData.email || "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.name.trim().length < 2) {
      setError("Must be at least two characters");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Enter a correct email");
      return;
    }
    if (formData.password.length < 6) {
      setError("Invalid password (min 6 characters)");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const res = await api.post("/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.token) {
        // Auto login after register
        localStorage.setItem("token", res.data.token);
        navigate("/user/products", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <p className="text-2xl font-semibold mb-2">Sign Up</p>

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          disabled={!!googleData.email} // Prevent modifying Google email
        />
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full text-black">
        Sign Up
      </Button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
