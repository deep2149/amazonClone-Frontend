import { api } from "@/utils/api";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Pages/AuthContext";

export default function AuthForm({ isAdmin = false }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const googleLogin = async () => {
    try {
      const res = await api.post("/oauth"); 
      console.log(res)
      window.location.href = res.data.url; // redirect to Google page
    } catch (err) {
      console.error(err);
      setError("Failed to start Google login");
    }
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      return "Email and password are required";
    }
    if (!isLogin) {
      if (!formData.name) return "Name is required";
      if (!formData.confirmPassword) return "Confirm password is required";
      if (formData.password !== formData.confirmPassword)
        return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const { email, password, name } = formData;
      const userType = isAdmin ? "admin" : "user";
      const endpoint = isLogin ? `/${userType}/login` : `/${userType}/signup`;
      const payload = isLogin ? { email, password } : { email, password, name };
      console.log("Submitting to:", endpoint, "with payload:", payload);

      const res = await api.post(endpoint, payload);
      console.log("Response from server:", res.data);
      const token = res.data?.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Login will fetch user data from /me endpoint
      await login(token);

      // Navigate based on role
      navigate(isAdmin ? "/admin/product" : "/user/products", {
        replace: true,
      });
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          (isLogin ? "Login failed" : "Signup failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded flex justify-center items-center min-h-screen w-screen flex-col">
      <h2 className="text-5xl mb-20 text-blue-600 font-bold">
        {isAdmin ? "Admin" : "User"} {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
        {!isLogin && (
          <div className="mb-3">
            <label className="block text-sm">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label className="block text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full text-black">
          {loading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </Button>

        <Button
          type="button"
          onClick={googleLogin}
          className="w-full bg-red-500 text-black mt-4"
        >
          Continue with Google
        </Button>
      </form>
      <p style={{ marginTop: 12, fontSize: 14 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          onClick={() => {
            setIsLogin((prev) => !prev);
            setError("");
          }}
          className="text-blue-500 cursor-pointer underline"
        >
          {isLogin
            ? isAdmin
              ? "Admin Sign Up"
              : "User Sign Up"
            : isAdmin
            ? "Admin Login"
            : "User Login"}
        </span>
      </p>
    </div>
  );
}
