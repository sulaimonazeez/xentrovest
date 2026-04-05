import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/utility"; // ← use axiosInstance, not raw axios
import logo from "../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  // Wait for AuthContext to finish checking, then redirect if already logged in
  useEffect(() => {
    if (!loading && user) navigate("/home", { replace: true });
  }, [user, loading, navigate]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await axiosInstance.post("/api/login", form);

      const token = res.data?.token;
      const userData = res.data?.user;

      if (!token) throw new Error("No token received from server");

      login(userData, token);
      navigate("/home", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show nothing while AuthContext is still checking token
  if (loading) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--obsidian)", padding: "2rem 1rem", position: "relative", overflow: "hidden" }}>
      <div className="mesh-bg" />

      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(240,165,0,0.07), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <img src={logo} alt="logo" style={{ height: 38 }} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.5rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Xentrovest</span>
          </Link>
        </div>

        <div className="glass" style={{ padding: "2.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "0.4rem" }}>Welcome Back</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0 }}>Sign in to your account to continue</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#FF4D6D", marginBottom: "1.25rem" }}
              >
                <i className="bi bi-exclamation-circle me-2"></i>{error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="x-input" required />
            </div>

            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Password</label>
              <input type={showPw ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="x-input" style={{ paddingRight: "3rem" }} required />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "1rem", bottom: "0.85rem", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: 0 }}>
                <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--muted)", cursor: "pointer" }}>
                <input type="checkbox" style={{ accentColor: "var(--gold)" }} /> Remember me
              </label>
              <Link to="#" style={{ fontSize: "0.82rem", color: "var(--gold)", textDecoration: "none" }}>Forgot password?</Link>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-gold" style={{ width: "100%", padding: "1rem", fontSize: "0.95rem" }} disabled={submitting}>
              {submitting
                ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite", marginRight: 8, verticalAlign: "middle" }}></span>Signing in...</>
                : "Sign In"
              }
            </motion.button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--muted)", margin: "1.5rem 0 0" }}>
            Don't have an account?{" "}
            <Link to="/create" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;