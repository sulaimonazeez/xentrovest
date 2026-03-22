import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
import axiosInstance from "../api/utility.jsx";
import { AuthContext } from "../context/AuthContext";

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } });


const Home = () => {
  const { user } = useContext(AuthContext);
  const [bal, setBal] = useState({ balance: 0, profit: 0, bonus: 0 });
  const [txs, setTxs] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [balRes, txRes] = await Promise.all([
          axiosInstance.get("/auth/balance"),
          axiosInstance.get("/auth/deposit"),
        ]);
        setBal(balRes.data);
        setTxs(txRes.data.slice(0, 5));
      } catch {}
      finally { setLoading(false); }
    };
    load();
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1")
      .then(r => r.json()).then(setCoins).catch(() => {});
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const statCards = [
    { label: "Total Balance",      value: `$${Number(bal.balance).toLocaleString()}`,  icon: "bi-wallet2",          color: "#F0A500" },
    { label: "Total Profit",       value: `$${Number(bal.profit).toLocaleString()}`,   icon: "bi-graph-up-arrow",   color: "#00E5A0" },
    { label: "Bonus Earned",       value: `$${Number(bal.bonus).toLocaleString()}`,    icon: "bi-gift",             color: "#60A5FA" },
    { label: "Active Plans",       value: "0",                                          icon: "bi-lightning-charge", color: "#F0A500" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 1.5rem 3rem", position: "relative", zIndex: 1 }}>
        {/* Greeting */}
        <motion.div {...fade()} style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{greeting()},</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{user?.fullname?.split(" ")[0] || "Investor"} <span style={{ background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>👋</span></h2>
        </motion.div>

        {/* Stat cards */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}><div className="x-spinner" /></div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {statCards.map((s, i) => (
              <motion.div key={s.label} {...fade(i * 0.08)} className="dash-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{s.label}</span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontSize: "1rem" }}>
                    <i className={`bi ${s.icon}`}></i>
                  </div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "2.2rem", lineHeight: 1, color: "#fff" }}>{s.value}</div>
              </motion.div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }} className="row-cols">

          {/* Recent Transactions */}
          <motion.div {...fade(0.2)} className="glass-sm" style={{ padding: "1.75rem", gridColumn: "span 1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h5 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem", letterSpacing: 0, margin: 0 }}>Recent Transactions</h5>
              <Link to="/transaction" style={{ fontSize: "0.78rem", color: "var(--gold)", textDecoration: "none" }}>View all <i className="bi bi-arrow-right"></i></Link>
            </div>
            {txs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted)" }}>
                <i className="bi bi-receipt" style={{ fontSize: "2rem", marginBottom: "0.5rem", display: "block" }}></i>
                <p style={{ fontSize: "0.85rem", margin: 0 }}>No transactions yet</p>
              </div>
            ) : txs.map(tx => (
              <div key={tx._id} className="tx-row">
                <div className="tx-icon"><i className="bi bi-arrow-down-left"></i></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text)" }}>Deposit · {tx.coinType}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{new Date(tx.date).toLocaleDateString()}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "var(--gold)", fontFamily: "'JetBrains Mono'", fontSize: "0.9rem" }}>${tx.amount}</div>
                  <span className="badge-pending">Pending</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div {...fade(0.25)} className="glass-sm" style={{ padding: "1.75rem", gridColumn: "span 1" }}>
            <h5 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem", letterSpacing: 0, marginBottom: "1.5rem" }}>Quick Actions</h5>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { to: "/deposit",     icon: "bi-arrow-down-circle", label: "Deposit",    color: "#00E5A0" },
                { to: "/withdrawl",   icon: "bi-arrow-up-circle",   label: "Withdraw",   color: "#F0A500" },
                { to: "/plan",        icon: "bi-lightning-charge",  label: "Plans",      color: "#60A5FA" },
                { to: "/transaction", icon: "bi-clock-history",     label: "History",    color: "#A78BFA" },
              ].map(a => (
                <Link key={a.to} to={a.to} style={{ textDecoration: "none" }}>
                  <div style={{ background: "rgba(10,14,26,0.6)", border: "1px solid rgba(240,165,0,0.08)", borderRadius: 14, padding: "1.25rem", textAlign: "center", transition: "all 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}40`; e.currentTarget.style.background = `${a.color}0A`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,165,0,0.08)"; e.currentTarget.style.background = "rgba(10,14,26,0.6)"; }}>
                    <i className={`bi ${a.icon}`} style={{ fontSize: "1.4rem", color: a.color, display: "block", marginBottom: "0.5rem" }}></i>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>{a.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Market table */}
        <motion.div {...fade(0.3)} className="glass-sm" style={{ padding: "1.75rem" }}>
          <h5 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem", letterSpacing: 0, marginBottom: "1.5rem" }}>Live Market</h5>
          <div style={{ overflowX: "auto" }}>
            <table className="x-table">
              <thead>
                <tr><th>Asset</th><th>Price</th><th>24h Change</th><th>Market Cap</th></tr>
              </thead>
              <tbody>
                {coins.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--muted)", padding: "2rem" }}>Loading market data...</td></tr>
                ) : coins.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <img src={c.image} alt={c.name} style={{ width: 24, height: 24, borderRadius: "50%" }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase" }}>{c.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="mono" style={{ color: "var(--text)", fontSize: "0.88rem" }}>${c.current_price?.toLocaleString()}</span></td>
                    <td>
                      <span style={{ color: c.price_change_percentage_24h >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600, fontSize: "0.85rem", fontFamily: "'JetBrains Mono'" }}>
                        {c.price_change_percentage_24h >= 0 ? "+" : ""}{c.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "0.85rem" }}>${(c.market_cap / 1e9).toFixed(1)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .row-cols { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default Home;
