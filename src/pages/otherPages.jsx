import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
import axiosInstance from "../api/utility.jsx";
import { AuthContext } from "../context/AuthContext";

const fade = (i = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: i * 0.07 } });

/* ── TRANSACTIONS ── */
export const TransactionSuccess = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/auth/deposit").then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(d => d._id?.toLowerCase().includes(search.toLowerCase()) || d.coinType?.toLowerCase().includes(search.toLowerCase()));
  const fmt = d => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div {...fade()}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>History</p>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Transactions</h2>
        </motion.div>

        <motion.div {...fade(0.1)} className="glass" style={{ padding: "1.75rem" }}>
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}></i>
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or coin type..." className="x-input" style={{ paddingLeft: "2.75rem" }} />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}><div className="x-spinner" style={{ margin: "0 auto" }} /></div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--muted)" }}>
              <i className="bi bi-inbox" style={{ fontSize: "2.5rem", marginBottom: "0.75rem", display: "block" }}></i>
              <p style={{ margin: 0 }}>No transactions found</p>
            </div>
          ) : filtered.map((item, i) => (
            <motion.div key={item._id} {...fade(i * 0.05)} className="tx-row">
              <div className="tx-icon"><i className="bi bi-arrow-down-left"></i></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>Deposit · {item.coinType}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "'JetBrains Mono'" }}>{item._id?.slice(-12)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", color: "var(--gold)" }}>${item.amount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{fmt(item.date)}</div>
                <span className="badge-pending">Pending</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ── PROFILE ── */
export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const referralLink = `https://xentrovest.vercel.app/create?ref=${user?.id || ""}`;

  useEffect(() => {
    axiosInstance.get("/auth/profile").then(r => { setProfile(r.data); setPhone(r.data.phone || ""); setCountry(r.data.country || ""); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const getInitials = name => {
    const p = (name || "").trim().split(" ");
    return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : (p[0]?.[0] || "U").toUpperCase();
  };

  const handleCopy = () => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  if (loading) return <div style={{ minHeight: "100vh", background: "var(--obsidian)", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="x-spinner" /></div>;

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div {...fade()}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Account</p>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Profile</h2>
        </motion.div>

        {/* Avatar card */}
        <motion.div {...fade(0.1)} className="glass" style={{ padding: "2rem", marginBottom: "1.25rem", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#F0A500,#FFD166)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: "2rem", color: "#000", margin: "0 auto 1rem" }}>
            {getInitials(profile?.fullname)}
          </div>
          <h4 style={{ marginBottom: "0.25rem" }}>{profile?.fullname}</h4>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", margin: "0 0 1rem" }}>{profile?.email}</p>
          <span className="badge-success">Active</span>
        </motion.div>

        {/* Referral */}
        <motion.div {...fade(0.15)} className="glass" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
          <h6 style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9rem" }}>Referral Link</h6>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input value={referralLink} readOnly className="x-input" style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.78rem" }} />
            <button onClick={handleCopy} className="btn-ghost" style={{ flexShrink: 0, cursor: "pointer", minWidth: 80 }}>
              {copied ? <><i className="bi bi-check me-1" style={{ color: "var(--success)" }}></i>Copied</> : <><i className="bi bi-copy me-1"></i>Copy</>}
            </button>
          </div>
        </motion.div>

        {/* Update */}
        <motion.div {...fade(0.2)} className="glass" style={{ padding: "1.75rem" }}>
          <h6 style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem" }}>Update Information</h6>
          {[{ label: "Phone Number", val: phone, set: setPhone, type: "tel" }, { label: "Country", val: country, set: setCountry, type: "text" }].map(f => (
            <div key={f.label} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{f.label}</label>
              <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} className="x-input" />
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-gold" style={{ width: "100%", padding: "0.9rem", marginTop: "0.5rem", cursor: "pointer" }}>Save Changes</motion.button>
        </motion.div>
      </div>
    </div>
  );
};

/* ── WITHDRAWAL ── */
export const WithdrawBTC = () => {
  const [form, setForm] = useState({ btcAddress: "", amount: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault(); setMsg(null); setLoading(true);
    try {
      await axiosInstance.post("/auth/withdraw", { btc_address: form.btcAddress, amount: form.amount, password: form.password });
      setMsg({ ok: true, text: "Withdrawal request submitted. Processing within 24 hours." });
      setForm({ btcAddress: "", amount: "", password: "" });
    } catch (err) {
      setMsg({ ok: false, text: err?.response?.data?.error || "Something went wrong." });
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div {...fade()}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Funds</p>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Withdraw BTC</h2>
        </motion.div>
        <motion.div {...fade(0.1)} className="glass" style={{ padding: "2rem" }}>
          {msg && (
            <div style={{ background: msg.ok ? "rgba(0,229,160,0.1)" : "rgba(255,77,109,0.1)", border: `1px solid ${msg.ok ? "rgba(0,229,160,0.3)" : "rgba(255,77,109,0.3)"}`, borderRadius: 12, padding: "0.9rem 1rem", fontSize: "0.85rem", color: msg.ok ? "var(--success)" : "var(--danger)", marginBottom: "1.25rem" }}>
              <i className={`bi ${msg.ok ? "bi-check-circle" : "bi-exclamation-circle"} me-2`}></i>{msg.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {[
              { name: "btcAddress", label: "BTC Wallet Address", type: "text",     placeholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf..." },
              { name: "amount",     label: "Amount (USD)",        type: "number",   placeholder: "Min. $100" },
              { name: "password",   label: "Confirm Password",    type: "password", placeholder: "••••••••" },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="x-input" required />
              </div>
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-gold" style={{ width: "100%", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} disabled={loading}>
              {loading ? "Processing..." : "Submit Withdrawal"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

/* ── REFERRAL ── */
export const Refferal = () => {
  const { user } = useContext(AuthContext);
  const link = `https://xentrovest.vercel.app/create?ref=${user?.id || ""}`;
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  const handleCopy = () => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2500); };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div {...fade()}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Earn More</p>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Referral Program</h2>
        </motion.div>

        {/* Referral stats */}
        <motion.div {...fade(0.1)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[{ label: "Total Referrals", value: "0" }, { label: "Earned", value: "$0" }, { label: "Pending", value: "$0" }].map(s => (
            <div key={s.label} className="stat-badge" style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "2rem", color: "var(--gold)" }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fade(0.15)} className="glass" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
          <h6 style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.9rem" }}>Your Referral Link</h6>
          <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginBottom: "1rem" }}>Share this link and earn commissions for every successful referral.</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input value={link} readOnly className="x-input" style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.78rem" }} />
            <button onClick={handleCopy} className="btn-gold" style={{ flexShrink: 0, cursor: "pointer", padding: "0.75rem 1.25rem" }}>
              {copied ? <i className="bi bi-check"></i> : <i className="bi bi-copy"></i>}
            </button>
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} className="glass" style={{ padding: "1.75rem" }}>
          <h6 style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9rem" }}>Referred Users</h6>
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}></i>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="x-input" style={{ paddingLeft: "2.75rem" }} />
          </div>
          <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted)" }}>
            <i className="bi bi-people" style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}></i>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>No referrals yet. Share your link to get started!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
