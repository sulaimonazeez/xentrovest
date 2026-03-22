import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
import axiosInstance from "../api/utility.jsx";

const BTC_ADDRESS = "1N4mmy5pdwxqgC8AigoRFM9kSxxxxx";
const methods = [
  { value: "Bitcoin",          label: "Bitcoin",          icon: "bi-currency-bitcoin", color: "#F7931A" },
  { value: "USDT (TRC20)",     label: "USDT (TRC20)",     icon: "bi-circle-fill",       color: "#26A17B" },
  { value: "Ethereum (ERC20)", label: "Ethereum (ERC20)", icon: "bi-hexagon-fill",      color: "#627EEA" },
];

const Deposit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    setLoading(true); setError("");
    try {
      const res = await axiosInstance.post("/auth/deposit", { amount: Number(amount), coinType: method });
      if (res.status === 200 || res.status === 201) navigate("/transaction");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Add Funds</p>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Deposit</h2>

          {/* Step indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {["Select Method", "Confirm & Pay"].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i ? "linear-gradient(135deg,#F0A500,#FFD166)" : step === i + 1 ? "linear-gradient(135deg,#F0A500,#FFD166)" : "rgba(240,165,0,0.1)", border: step > i + 1 ? "none" : "1px solid rgba(240,165,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: step >= i + 1 ? "#000" : "var(--muted)", transition: "all 0.3s" }}>
                    {step > i + 1 ? <i className="bi bi-check"></i> : i + 1}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: step === i + 1 ? "var(--text)" : "var(--muted)", fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
                </div>
                {i < 1 && <div style={{ flex: 1, height: 1, background: step > 1 ? "var(--gold)" : "rgba(240,165,0,0.15)", transition: "background 0.3s" }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 ? (
            <div className="glass" style={{ padding: "2rem" }}>
              <h5 style={{ fontFamily: "'DM Sans'", fontWeight: 700, marginBottom: "1.25rem", letterSpacing: 0 }}>Select Payment Method</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {methods.map(m => (
                  <div key={m.value} className={`radio-card ${method === m.value ? "active" : ""}`} onClick={() => setMethod(m.value)}>
                    <input type="radio" value={m.value} checked={method === m.value} readOnly />
                    <i className={`bi ${m.icon}`} style={{ color: m.color, fontSize: "1.3rem" }}></i>
                    <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{m.label}</span>
                  </div>
                ))}
              </div>

              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Amount (USD)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount (min. $699)" className="x-input" min="1" style={{ marginBottom: "1.5rem" }} />

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { if (method && amount) setStep(2); }} className="btn-gold" style={{ width: "100%", padding: "1rem" }} disabled={!method || !amount}>
                Continue <i className="bi bi-arrow-right ms-2"></i>
              </motion.button>
            </div>
          ) : (
            <div className="glass" style={{ padding: "2rem" }}>
              <div style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.15)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}>
                <div><div style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Method</div><div style={{ fontWeight: 600, marginTop: "0.2rem" }}>{method}</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Amount</div><div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.4rem", color: "var(--gold)" }}>${amount}</div></div>
              </div>

              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginBottom: "1rem" }}>Scan QR code to send payment</p>
                <div style={{ display: "inline-block", padding: "1rem", background: "#fff", borderRadius: 16 }}>
                  <QRCodeCanvas value={BTC_ADDRESS} size={160} />
                </div>
              </div>

              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Wallet Address</label>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <input value={BTC_ADDRESS} readOnly className="x-input" style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.8rem" }} />
                <button onClick={handleCopy} className="btn-ghost" style={{ flexShrink: 0, cursor: "pointer" }}>
                  {copied ? <i className="bi bi-check text-success"></i> : <i className="bi bi-copy"></i>}
                </button>
              </div>

              {error && <div style={{ background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.3)", borderRadius: 10, padding: "0.75rem", fontSize: "0.85rem", color: "#FF4D6D", marginBottom: "1rem" }}>{error}</div>}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex: 1, cursor: "pointer" }}>Back</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleDeposit} className="btn-gold" style={{ flex: 2, padding: "1rem" }} disabled={loading}>
                  {loading ? "Processing..." : "Confirm Deposit"}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Deposit;
