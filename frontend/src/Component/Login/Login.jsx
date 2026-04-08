import React, { useState,useContext } from 'react'
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
const Login = () => {
  
  const { setUserid } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const res = await axios.post("http://localhost:4000/login", form)

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.user.id) 
        setUserid(res.data.user.id)

        alert("Login Success")
        navigate("/");
      } else {
        alert(res.data.message)
      }

    } catch (error) {
      alert("Login failed");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handlesubmit}>
          <h2>Login</h2>

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

          <button type="submit" className="login-btn">Login</button>

          <p className="login-link">
            Don't have an account? <a href="/signup">Signup</a>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login