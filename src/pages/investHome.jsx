import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthHeader from "../component/homeAssets/authHeader.jsx";

const fade = (i = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } });

const plans = [
  { name: "Starter",  range: "$699 – $999",       roi: "8%",  days: 12, perks: ["Capital protection", "Daily payouts", "24/7 support"],                   featured: false },
  { name: "Growth",   range: "$1K – $2,999",      roi: "10%", days: 12, perks: ["Capital protection", "Daily payouts", "Priority support", "Auto-reinvest"], featured: true },
  { name: "Elite",    range: "$3K – $4,999",      roi: "12%", days: 12, perks: ["Capital protection", "Daily payouts", "VIP support", "Auto-reinvest"],     featured: false },
  { name: "Titan",    range: "$5K – Unlimited",   roi: "15%", days: 12, perks: ["Capital protection", "Daily payouts", "Dedicated manager", "Auto-reinvest", "Bonus 2%"], featured: false },
];

const HomeInvestment = () => (
  <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
    <div className="mesh-bg" />
    <AuthHeader />
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
      <motion.div {...fade()} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Investment Plans</p>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>Choose Your Plan</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.75rem" }}>Earn daily returns starting from 8% — capital always protected.</p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        {plans.map((p, i) => (
          <motion.div key={p.name} {...fade(i)} className={`plan-card ${p.featured ? "featured" : ""}`} style={{ position: "relative" }}>
            {p.featured && (
              <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#F0A500,#FFD166)", color: "#000", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 1.2rem", borderRadius: "0 0 10px 10px" }}>
                Most Popular
              </div>
            )}
            <div style={{ marginTop: p.featured ? "1rem" : 0 }}>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: "2rem", color: "#fff", marginBottom: "0.1rem" }}>{p.name}</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.82rem", margin: "0 0 1.25rem" }}>{p.range}</p>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "4rem", lineHeight: 1, background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.roi}</div>
              <p style={{ color: "var(--muted)", fontSize: "0.78rem", margin: "0.2rem 0 1.5rem" }}>Daily ROI · {p.days} days</p>
              <div style={{ borderTop: "1px solid rgba(240,165,0,0.1)", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                {p.perks.map(pk => (
                  <div key={pk} style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color: "var(--gold)", fontSize: "0.75rem" }}></i> {pk}
                  </div>
                ))}
              </div>
              <Link to="/deposit" className="btn-gold" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Invest Now</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeInvestment;
