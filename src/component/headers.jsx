import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          background: scrolled ? "rgba(6,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(240,165,0,0.1)" : "none",
          transition: "all 0.35s ease",
          padding: "1rem 0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <img src={logo} alt="Xentrovest" style={{ height: 36 }} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.4rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Xentrovest
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="d-none d-md-flex">
            {["Features", "Plans", "Markets"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="xnav-link">{item}</a>
            ))}
          </nav>

          <div className="d-none d-md-flex" style={{ gap: "1rem" }}>
            <Link to="/login" className="btn-ghost" style={{ padding: "0.55rem 1.4rem", fontSize: "0.82rem", textDecoration: "none", display: "inline-block" }}>Sign In</Link>
            <Link to="/create" className="btn-gold" style={{ padding: "0.55rem 1.4rem", fontSize: "0.82rem", textDecoration: "none", display: "inline-block" }}>Get Started</Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(!open)} className="d-md-none" style={{ background: "none", border: "1px solid rgba(240,165,0,0.25)", borderRadius: 8, color: "#F0A500", padding: "0.4rem 0.6rem", cursor: "pointer", fontSize: "1.1rem" }}>
            <i className={`bi ${open ? "bi-x" : "bi-list"}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="x-overlay" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 280, background: "var(--navy-2)", zIndex: 1200, padding: "5rem 2rem 2rem", borderLeft: "1px solid rgba(240,165,0,0.12)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Features", "Plans", "Markets"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="sidebar-link" onClick={() => setOpen(false)}>{item}</a>
              ))}
              <hr className="glow-line" style={{ margin: "1rem 0" }} />
              <Link to="/login" className="sidebar-link" onClick={() => setOpen(false)}>Sign In</Link>
              <Link to="/create" className="btn-gold" style={{ textAlign: "center", textDecoration: "none", marginTop: "0.5rem" }} onClick={() => setOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Header;
