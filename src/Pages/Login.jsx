import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter valid email');
      return;
    }

    if (password.length < 6) {
      setError('Please enter valid password');
      return;
    }

    setError('');
    console.log('Login Data', { email, password });
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

        <Button type="submit" className="text-black">Login</Button>
      </form>
    </>
  );
}
