import React, { useState } from 'react'
import './Signup.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/signup", form)

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userid", res.data.user.id);

      alert("Signup Success")
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handlesubmit}>
          <h2>Create Account</h2>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handlechange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name='email'
              value={form.email}
              onChange={handlechange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name='password'
              value={form.password}
              onChange={handlechange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup