import React, { useState, useContext, useEffect } from "react";
import Header from "../component/headers.jsx";
import Footer from "../component/footer.jsx";
import "../static/login.css";
import logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${baseURL}/api/login/`,
        form,
        { withCredentials: true }
      );

      login(res.data.user);
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${baseURL}/auth/check`, {
          withCredentials: true,
        });
        navigate("/home");
      } catch {
        // user not authenticated → stay on login
      }
    };

    checkAuth();
  }, [navigate, baseURL]);

  return (
    <div className="bg-dark min-vh-100 d-flex w-100 flex-column">
      <Header logo={logo} />

      {/* MAIN CONTENT */}
      <main className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

            {/* TITLE */}
            <div className="mb-4 text-center text-md-start">
              <h4 className="text-light mb-1">Let's sign you in</h4>
              <p className="text-secondary mb-0">
                Fill in your details below to log into your account.
              </p>
            </div>

            {/* CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 p-md-5 rounded shadow"
              style={{ backgroundColor: "#0b0b0b" }}
            >
              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label text-light">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control form-control-lg text-white"
                    placeholder="Enter your email"
                    style={{
                      backgroundColor: "#1c1f23",
                      borderColor: "#2a2d32",
                    }}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                  <label className="form-label text-light">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control form-control-lg text-white"
                    placeholder="Enter your password"
                    style={{
                      backgroundColor: "#1c1f23",
                      borderColor: "#2a2d32",
                    }}
                    required
                  />
                </div>

                {/* LINK */}
                <p className="text-secondary text-center text-md-start mb-4">
                  Don’t have an account?{" "}
                  <Link
                    to="/create"
                    className="text-warning text-decoration-none"
                  >
                    Create Account
                  </Link>
                </p>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-warning w-100 py-2 fw-semibold"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>

                {/* ERROR */}
                {error && (
                  <div className="alert alert-danger text-center mt-3 small">
                    {error}
                  </div>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer logo={logo} />
    </div>
  );
};

export default Login;