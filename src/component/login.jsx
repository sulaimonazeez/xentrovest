import React, { useEffect, useState } from "react";
import Header from "./headers.jsx";
import Footer from "./footer.jsx";
import logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setError(null);
        const userCredentials = { "email": form.email, "password": form.password };
        try {
            const response = await axios.post("https://xentrovest.pythonanywhere.com/api/login/", userCredentials, {
                headers: { "Content-Type": "application/json" },

                withCredentials: true,
            });
            const { access_token, expires_in} = response.data;
            const expiresAt = Date.now() + expires_in * 1000;
            
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("expires_in", expiresAt.toString()); // Store as a string

            alert("Login Successful!");
            navigate("/home");

        } catch (error) {
            setError("Invalid credentials or network error");
            console.error(error);
        } finally {
            setSubmitted(false); // Reset loading state
        }
    };

useEffect(() =>{
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  if (!accessToken || !expiresIn || Date.now() >= parseInt(expiresIn)) {
    if (accessToken && expiresIn && Date.now() >= parseInt(expiresIn)) {
      console.log("Access token expired for route protection. Logging out.");
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
    } else if (!accessToken) {
      console.log("No access token found. Ensuring logout state.");
    }
  } else {
    navigate("/home")
  }


}, [navigate])
  return (
    <div className="container-fluids">
      <Header logo={logo} />
      <div className="container py-5 mt-5">
        <h4 className="text-light">Let's sign you in</h4>
        <p className="sm text-secondary">
          Fill in your details below to login into your account
        </p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 p-md-5 shadow rounded mx-auto"
          style={{ backgroundColor: "#1f1f1f", maxWidth: "500px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-secondary sm">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control form-control-lg text-white sm"
                placeholder="Enter your email"
                style={{ backgroundColor: "#2c2c2c", border: "none" }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary sm">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control sm form-control-lg text-white"
                placeholder="Enter your password"
                style={{ backgroundColor: "#2c2c2c", border: "none" }}
                required
              />
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-warning w-100 rounded"
                type="submit"
                disabled={submitted}
              >
                {submitted ? "Logging in..." : "Login"}
              </motion.button>
            </div>

            {error && (
              <div className="alert alert-danger text-center mt-3 rounded-pill">
                {error}
              </div>
            )}
          </form>
        </motion.div>
      </div>
      <Footer logo={logo} />
    </div>
  );
};

export default Login;