import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import axiosInstance from "../api/utility";
import logo from "../assets/logo.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const countries = countryList().getData();
  const [form, setForm] = useState({ fullname: "", email: "", phone: "", country: null, password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPw, setShowPw] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await axiosInstance.post("/api/create", { ...form, country: form.country?.label || "" });
      if (res.status === 201 || res.status === 200) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const selectStyles = {
    control: b => ({ ...b, background: "rgba(10,14,26,0.8)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 12, color: "var(--text)", boxShadow: "none", minHeight: 50, "&:hover": { borderColor: "var(--gold)" } }),
    singleValue: b => ({ ...b, color: "var(--text)" }),
    input: b => ({ ...b, color: "var(--text)" }),
    menu: b => ({ ...b, background: "var(--navy-2)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 12 }),
    option: (b, s) => ({ ...b, background: s.isFocused ? "var(--gold-dim)" : "transparent", color: s.isFocused ? "var(--gold)" : "var(--text)", fontSize: "0.88rem" }),
    placeholder: b => ({ ...b, color: "var(--muted)" }),
  };

  const fields = [
    { name: "fullname", label: "Full Name",     type: "text",     placeholder: "John Doe" },
    { name: "email",    label: "Email Address", type: "email",    placeholder: "you@email.com" },
    { name: "phone",    label: "Phone Number",  type: "tel",      placeholder: "+1 234 567 8900" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--obsidian)", padding: "5rem 1rem 3rem", position: "relative", overflow: "hidden" }}>
      <div className="mesh-bg" />
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(240,165,0,0.06), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 520, position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <img src={logo} alt="logo" style={{ height: 36 }} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.4rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Xentrovest</span>
          </Link>
        </div>

        <div className="glass" style={{ padding: "2.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "0.4rem" }}>Create Account</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0 }}>Start your investment journey today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {fields.map(({ name, label, type, placeholder }) => (
                <div key={name} style={{ gridColumn: name === "fullname" ? "1 / -1" : "auto" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{label}</label>
                  <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="x-input" required />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>Country</label>
              <Select options={countries} value={form.country} onChange={v => setForm({ ...form, country: v })} placeholder="Select your country..." styles={selectStyles} />
            </div>

            <div style={{ marginTop: "1rem", position: "relative" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>Password</label>
              <input type={showPw ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" className="x-input" style={{ paddingRight: "3rem" }} required />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "1rem", bottom: "0.85rem", background: "none", border: "none", color: "var(--muted)", cursor: "pointer" }}>
                <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1rem", background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#FF4D6D" }}>
                <i className="bi bi-exclamation-circle me-2"></i>{error}
              </motion.div>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-gold" style={{ width: "100%", padding: "1rem", fontSize: "0.95rem", marginTop: "1.5rem" }} disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
