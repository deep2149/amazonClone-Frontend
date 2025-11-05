import { Button } from "@/components/ui/button";
import React, { useState, useContext } from "react";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) || {};

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter valid email");
      return;
    }

    if (password.length < 6) {
      setError("Please enter valid password");
      return;
    }

    setError("");

    try {
      const res = await api.post("/user/login", { email, password });
      if (res.data?.token) {
        // call context login to store token and user
        if (login) login(res.data.user, res.data.token);
        navigate("/");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Login Form</p>
        <div>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
        /></div>


        <div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handleChange}
        /></div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
