import React, { useState, useContext, useEffect } from "react";
import Header from "./headers.jsx";
import Footer from "./footer.jsx";
import logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://backend-logic-ohjo.vercel.app/api/login/",
        form
      );

      const { user, token, expires_in } = res.data;

      localStorage.setItem("role", user.role);
      login(user, token, expires_in);

      navigate("/home");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // auto check token validity
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const expiresIn = localStorage.getItem("expires_in");

    if (accessToken && expiresIn) {
      const isExpired = Date.now() >= parseInt(expiresIn);

      if (isExpired) {
        console.log("Token expired. Logging out.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("role");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  return (
    <div className="bg-dark min-vh-100">
      <Header logo={logo} />

      {/* PAGE CONTENT */}
      <div className="container py-5 mt-5">
        <div className="mx-auto" style={{ maxWidth: "500px" }}>
          <h4 className="text-light">Let's sign you in</h4>
          <p className="text-secondary">
            Fill in your details below to log into your account.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 p-md-5 shadow rounded mx-auto"
          style={{ backgroundColor: "#0B0B0B", maxWidth: "500px" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label className="form-label text-secondary">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control form-control-lg text-white"
                placeholder="Enter your email"
                style={{ backgroundColor: "#2c2c2c", border: "none" }}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="form-label text-secondary">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg text-white"
                placeholder="Enter your password"
                style={{ backgroundColor: "#2c2c2c", border: "none" }}
                required
              />
            </div>

            {/* Create Account */}
            <p className="text-secondary mb-4">
              Don’t have an account?{" "}
              <Link to="/create" className="text-warning">
                Create Account
              </Link>
            </p>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-warning w-100 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            {/* Error Message */}
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