import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

const navLinks = [
  { to: "/home",        label: "Dashboard",   icon: "bi-grid-1x2" },
  { to: "/plan",        label: "Plans",        icon: "bi-lightning-charge" },
  { to: "/deposit",     label: "Deposit",      icon: "bi-arrow-down-circle" },
  { to: "/withdrawl",   label: "Withdrawal",   icon: "bi-arrow-up-circle" },
  { to: "/transaction", label: "Transactions", icon: "bi-clock-history" },
  { to: "/refferal",    label: "Referral",     icon: "bi-people" },
  { to: "/profile",     label: "Profile",      icon: "bi-person-circle" },
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
      {/* ── HEADER ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: "rgba(6,8,16,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(240,165,0,0.1)",
        padding: "0.85rem 0",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/home" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
            <img src={logo} alt="logo" style={{ height: 34 }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem",
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg,#F0A500,#FFD166)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Xentrovest
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="d-none d-lg-flex">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} style={{
                  padding: "0.45rem 0.9rem", borderRadius: 8, textDecoration: "none",
                  fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.04em",
                  color: active ? "#F0A500" : "rgba(255,255,255,0.55)",
                  background: active ? "rgba(240,165,0,0.1)" : "transparent",
                  transition: "all 0.2s",
                }}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>

            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#F0A500,#FFD166)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.78rem", color: "#000", flexShrink: 0,
            }}>
              {initials}
            </div>

            {/* Logout — desktop only */}
            <button
              onClick={logout}
              className="d-none d-lg-flex"
              style={{
                background: "none", border: "1px solid rgba(240,165,0,0.25)",
                borderRadius: 8, color: "rgba(255,255,255,0.6)",
                padding: "0.4rem 1rem", fontSize: "0.78rem",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.2s",
              }}
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen(true)}
              className="d-lg-none"
              style={{
                background: "none",
                border: "1px solid rgba(240,165,0,0.25)",
                borderRadius: 8, color: "#F0A500",
                padding: "0.4rem 0.65rem",
                cursor: "pointer", fontSize: "1.2rem",
                lineHeight: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE SIDEBAR ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                zIndex: 1000,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              style={{
                position: "fixed",
                top: 0, left: 0, bottom: 0,
                width: "min(280px, 80vw)",
                background: "rgba(8,10,20,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRight: "1px solid rgba(240,165,0,0.15)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem 1rem",
                overflowY: "auto",
              }}
            >
              {/* Drawer header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <img src={logo} alt="logo" style={{ height: 30 }} />
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem",
                    letterSpacing: "0.08em",
                    background: "linear-gradient(135deg,#F0A500,#FFD166)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    Xentrovest
                  </span>
                </div>
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "none", border: "none",
                    color: "rgba(255,255,255,0.4)", fontSize: "1.4rem",
                    cursor: "pointer", lineHeight: 1, padding: "0.2rem",
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              {/* User info strip */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 0.75rem",
                background: "rgba(240,165,0,0.06)",
                border: "1px solid rgba(240,165,0,0.12)",
                borderRadius: 10, marginBottom: "1.5rem",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "linear-gradient(135deg,#F0A500,#FFD166)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.82rem", color: "#000", flexShrink: 0,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                    {user?.fullname || "User"}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                    {user?.email || ""}
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
                {navLinks.map(({ to, label, icon }) => {
                  const active = location.pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.75rem 0.9rem", borderRadius: 10,
                        textDecoration: "none", fontSize: "0.88rem", fontWeight: 500,
                        color: active ? "#F0A500" : "rgba(255,255,255,0.65)",
                        background: active ? "rgba(240,165,0,0.1)" : "transparent",
                        border: active ? "1px solid rgba(240,165,0,0.2)" : "1px solid transparent",
                        transition: "all 0.15s",
                      }}
                    >
                      <i className={`bi ${icon}`} style={{ fontSize: "1rem", flexShrink: 0 }}></i>
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Logout */}
              <button
                onClick={() => { setOpen(false); logout(); }}
                style={{
                  marginTop: "1.5rem", width: "100%", padding: "0.75rem",
                  background: "rgba(240,165,0,0.08)",
                  border: "1px solid rgba(240,165,0,0.2)",
                  borderRadius: 10, color: "#F0A500",
                  fontSize: "0.85rem", fontWeight: 600,
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  transition: "all 0.15s",
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthHeader;
