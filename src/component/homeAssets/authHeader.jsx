import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

const navLinks = [
  { to: "/home",        label: "Dashboard",    icon: "bi-grid-1x2" },
  { to: "/plan",        label: "Plans",         icon: "bi-lightning-charge" },
  { to: "/deposit",     label: "Deposit",       icon: "bi-arrow-down-circle" },
  { to: "/withdrawl",   label: "Withdrawal",    icon: "bi-arrow-up-circle" },
  { to: "/transaction", label: "Transactions",  icon: "bi-clock-history" },
  { to: "/refferal",    label: "Referral",      icon: "bi-people" },
  { to: "/profile",     label: "Profile",       icon: "bi-person-circle" },
];

const AuthHeader = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const initials = user?.fullname
    ? user.fullname.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: "rgba(6,8,16,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(240,165,0,0.1)", padding: "0.85rem 0",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/home" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <img src={logo} alt="logo" style={{ height: 34 }} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Xentrovest
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="d-none d-lg-flex" style={{ gap: "0.25rem", alignItems: "center" }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to} to={to}
                style={{
                  padding: "0.45rem 0.9rem", borderRadius: 8, textDecoration: "none",
                  fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.04em",
                  color: location.pathname === to ? "var(--gold)" : "var(--muted)",
                  background: location.pathname === to ? "var(--gold-dim)" : "transparent",
                  transition: "all 0.2s",
                }}
              >{label}</Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #F0A500, #FFD166)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.78rem", color: "#000", flexShrink: 0,
            }}>{initials}</div>

            {/* Logout desktop */}
            <button onClick={logout} className="d-none d-lg-flex btn-ghost" style={{ padding: "0.4rem 1rem", fontSize: "0.78rem", cursor: "pointer" }}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>

            {/* Burger */}
            <button onClick={() => setOpen(true)} className="d-lg-none" style={{ background: "none", border: "1px solid rgba(240,165,0,0.2)", borderRadius: 8, color: "#F0A500", padding: "0.4rem 0.6rem", cursor: "pointer", fontSize: "1.1rem" }}>
              <i className="bi-list bi"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="x-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="x-sidebar open"
              style={{ transform: "none" }}
            >
              <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <img src={logo} alt="logo" style={{ height: 30 }} />
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.2rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Xentrovest</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {navLinks.map(({ to, label, icon }) => (
                  <Link key={to} to={to} className={`sidebar-link ${location.pathname === to ? "active" : ""}`} onClick={() => setOpen(false)}>
                    <i className={`bi ${icon}`}></i> {label}
                  </Link>
                ))}
              </div>

              <button onClick={logout} className="btn-ghost" style={{ width: "100%", cursor: "pointer", marginTop: "1rem", fontSize: "0.85rem" }}>
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthHeader;
