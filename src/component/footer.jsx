import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Footer = () => (
  <footer style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(240,165,0,0.08)", padding: "4rem 1.5rem 2rem", position: "relative", zIndex: 1 }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <img src={logo} alt="logo" style={{ height: 34 }} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.08em", background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Xentrovest</span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 260 }}>
            A premium crypto investment platform helping investors grow wealth through professional copy trading and structured investment plans.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {["twitter", "telegram", "instagram", "youtube"].map(s => (
              <Link key={s} to="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "rgba(240,165,0,0.2)"; }}>
                <i className={`bi bi-${s}`}></i>
              </Link>
            ))}
          </div>
        </div>

        {[
          { title: "Platform", links: [{ label: "Dashboard", to: "/home" }, { label: "Plans", to: "/plan" }, { label: "Deposit", to: "/deposit" }, { label: "Withdrawal", to: "/withdrawl" }] },
          { title: "Company",  links: [{ label: "About Us", to: "#" }, { label: "Blog", to: "#" }, { label: "Careers", to: "#" }, { label: "Contact", to: "#" }] },
          { title: "Legal",    links: [{ label: "Terms of Service", to: "#" }, { label: "Privacy Policy", to: "#" }, { label: "Risk Disclosure", to: "#" }] },
        ].map(col => (
          <div key={col.title}>
            <h6 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1.25rem" }}>{col.title}</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {col.links.map(l => (
                <Link key={l.label} to={l.to} style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>{l.label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(240,165,0,0.08)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>© {new Date().getFullYear()} Xentrovest. All rights reserved.</p>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>Trading involves risk. Past performance is not indicative of future results.</p>
      </div>
    </div>
    <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
  </footer>
);

export default Footer;
