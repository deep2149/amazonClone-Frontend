import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";



export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs when submitting
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

    setError(""); // clear error if everything is fine
    console.log("SignUp", formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" >Sign Up</Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
