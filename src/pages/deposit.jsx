import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
import axiosInstance from "../api/utility.jsx";

// ✅ All wallet addresses here
const WALLET_ADDRESSES = {
  Bitcoin: "bc1q309kf5502yr02dchmruvfraj0yt0ekflqjsq3r",
  "USDT (TRC20)": "TKa6keaNJwasQPEUZi5jnEF8J3cMfNdLuY",
  "Ethereum (ERC20)": "0xE98FB051077b7e456cB42f58cdc64fCc13791F6E"
};

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

  // ✅ Get selected wallet dynamically
  const selectedAddress = WALLET_ADDRESSES[method];

  const handleCopy = () => {
    if (!selectedAddress) return;
    navigator.clipboard.writeText(selectedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    setLoading(true); 
    setError("");

    try {
      const res = await axiosInstance.post("/auth/deposit", { 
        amount: Number(amount), 
        coinType: method 
      });

      if (res.status === 200 || res.status === 201) {
        navigate("/transaction");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <div className="mesh-bg" />
      <AuthHeader />

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>

          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>
            Add Funds
          </p>

          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Deposit</h2>

          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {["Select Method", "Confirm & Pay"].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step >= i + 1 ? "linear-gradient(135deg,#F0A500,#FFD166)" : "rgba(240,165,0,0.1)",
                    border: "1px solid rgba(240,165,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: step >= i + 1 ? "#000" : "var(--muted)"
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: "0.78rem" }}>{s}</span>
                </div>
                {i < 1 && <div style={{ flex: 1, height: 1, background: "rgba(240,165,0,0.15)" }} />}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 ? (
            <div className="glass" style={{ padding: "2rem" }}>

              <h5 style={{ marginBottom: "1.25rem" }}>Select Payment Method</h5>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {methods.map(m => (
                  <div key={m.value} 
                       className={`radio-card ${method === m.value ? "active" : ""}`} 
                       onClick={() => setMethod(m.value)}>
                    <input type="radio" checked={method === m.value} readOnly />
                    <i className={`bi ${m.icon}`} style={{ color: m.color }}></i>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="x-input"
              />

              <motion.button
                onClick={() => { if (method && amount) setStep(2); }}
                className="btn-gold"
                style={{ width: "100%", marginTop: "1rem" }}
                disabled={!method || !amount}
              >
                Continue
              </motion.button>

            </div>
          ) : (

            /* STEP 2 */
            <div className="glass" style={{ padding: "2rem" }}>

              {/* QR */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <QRCodeCanvas value={selectedAddress || ""} size={160} />
              </div>

              {/* Address */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <input 
                  value={selectedAddress || ""} 
                  readOnly 
                  className="x-input" 
                />

                <button onClick={handleCopy} className="btn-ghost">
                  {copied ? "✓" : "Copy"}
                </button>
              </div>

              {error && <div style={{ color: "red" }}>{error}</div>}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setStep(1)} className="btn-ghost">
                  Back
                </button>

                <motion.button
                  onClick={handleDeposit}
                  className="btn-gold"
                  disabled={loading}
                >
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