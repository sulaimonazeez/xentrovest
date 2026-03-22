import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../component/headers.jsx";
import Footer from "../component/footer.jsx";

/* ── helpers ── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { value: "95%",     label: "Average Win Rate" },
  { value: "$2.4B+",  label: "Total Volume Traded" },
  { value: "48K+",    label: "Active Investors" },
  { value: "12hrs",   label: "Avg Trade Duration" },
];

const plans = [
  { name: "Starter",  range: "$699 – $999",       roi: "8%",  days: 12, featured: false },
  { name: "Growth",   range: "$1K – $2,999",      roi: "10%", days: 12, featured: true },
  { name: "Elite",    range: "$3K – $4,999",      roi: "12%", days: 12, featured: false },
  { name: "Titan",    range: "$5K – Unlimited",   roi: "15%", days: 12, featured: false },
];

const features = [
  { icon: "bi-shield-check",      title: "Bank-Grade Security",      text: "256-bit encryption and multi-factor authentication protect every transaction and account." },
  { icon: "bi-lightning-charge",  title: "Instant Execution",        text: "Trades executed in milliseconds with zero slippage on our institutional-grade infrastructure." },
  { icon: "bi-graph-up-arrow",    title: "Copy Trading",             text: "Mirror positions of top-performing traders automatically, 24/7 with full transparency." },
  { icon: "bi-currency-bitcoin",  title: "Multi-Asset",              text: "Trade Bitcoin, Ethereum, Forex, CFDs and more from one unified platform." },
  { icon: "bi-headset",           title: "24/7 Support",             text: "Our expert team is always available to assist you with any questions or issues." },
  { icon: "bi-arrow-repeat",      title: "Instant Withdrawals",      text: "Access your funds at any time. Withdrawals are processed within minutes." },
];

const testimonials = [
  { name: "Amaka J.", role: "Retail Investor", quote: "Xentrovest turned my small capital into a consistent monthly income. The copy trading feature alone is worth everything.", img: "https://i.pravatar.cc/60?img=47" },
  { name: "Marcus T.", role: "Crypto Trader", quote: "Best ROI I've seen on any platform. The dashboard is clean, the payouts are fast, and support is genuinely helpful.", img: "https://i.pravatar.cc/60?img=12" },
  { name: "Yemi B.", role: "Business Owner", quote: "I was skeptical at first but after my first withdrawal I was hooked. Truly professional and transparent.", img: "https://i.pravatar.cc/60?img=32" },
];

const faqs = [
  { q: "What is Xentrovest?", a: "Xentrovest is a premium crypto investment platform that lets you copy professional traders' positions, invest in structured plans, and grow your wealth with institutional-grade tools." },
  { q: "How do I start investing?", a: "Create an account, verify your identity, deposit funds using Bitcoin, USDT, or Ethereum, then choose a plan or start copy trading." },
  { q: "Is my money safe?", a: "Yes. We use bank-level 256-bit encryption, cold storage for funds, and multi-factor authentication to protect all accounts and assets." },
  { q: "How fast are withdrawals?", a: "Withdrawals are processed instantly after confirmation and typically arrive within minutes to your crypto wallet." },
  { q: "What is the minimum deposit?", a: "The minimum deposit to start investing is $699, which qualifies you for our Starter plan with 8% daily ROI." },
];

/* ── FAQ item ── */
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-icon">+</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >{a}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Coin ticker ── */
const CryptoTicker = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1")
      .then(r => r.json()).then(setCoins).catch(() => {});
  }, []);
  if (!coins.length) return null;
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(240,165,0,0.08)", borderBottom: "1px solid rgba(240,165,0,0.08)", padding: "0.75rem 0", background: "rgba(10,14,26,0.6)", marginBottom: "5rem" }}>
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", width: "max-content" }}
      >
        {[...coins, ...coins].map((c, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--muted)" }}>
            <img src={c.image} alt={c.symbol} style={{ width: 18, height: 18 }} />
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{c.symbol?.toUpperCase()}</span>
            <span>${c.current_price?.toLocaleString()}</span>
            <span style={{ color: c.price_change_percentage_24h >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600 }}>
              {c.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ── Main landing ── */
const Landing = () => (
  <div style={{ background: "var(--obsidian)", minHeight: "100vh", overflowX: "hidden" }}>
    <div className="mesh-bg" />
    <Header />

    {/* ── HERO ── */}
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(240,165,0,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 860 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.25)", borderRadius: 20, padding: "0.4rem 1rem", fontSize: "0.78rem", color: "var(--gold)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2rem", fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, background: "var(--success)", borderRadius: "50%", display: "inline-block" }}></span>
            Live Trading Platform
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", lineHeight: 0.95, marginBottom: "1.5rem", letterSpacing: "0.02em" }}
        >
          <span style={{ color: "#fff" }}>Grow Your </span>
          <span style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wealth</span>
          <br />
          <span style={{ color: "#fff" }}>With Crypto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ color: "var(--muted)", fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.7, fontWeight: 400 }}
        >
          Copy elite traders, earn up to 15% daily ROI, and access institutional-grade crypto investment tools — all in one stunning platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/create" className="btn-gold" style={{ textDecoration: "none", fontSize: "1rem", padding: "1rem 2.5rem" }}>
            Start Investing <i className="bi bi-arrow-right ms-2"></i>
          </Link>
          <a href="#plans" className="btn-ghost" style={{ fontSize: "1rem", padding: "1rem 2rem", textDecoration: "none", display: "inline-block" }}>
            View Plans
          </a>
        </motion.div>
      </div>
    </section>

    {/* ── Ticker ── */}
    <CryptoTicker />

    {/* ── Stats ── */}
    <section style={{ padding: "0 1.5rem 6rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1rem" }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fade(i * 0.1)} className="stat-badge" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "2.8rem", lineHeight: 1, background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ color: "var(--muted)", fontSize: "0.78rem", marginTop: "0.4rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── Features ── */}
    <section id="features" style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div {...fade()} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.75rem" }}>Why Xentrovest</p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff" }}>Built for Serious Investors</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1.25rem" }}>
          {features.map((f, i) => (
            <motion.div key={f.title} {...fade(i * 0.07)} className="glass-sm" style={{ padding: "1.75rem" }}>
              <div className="feature-icon"><i className={`bi ${f.icon}`}></i></div>
              <h5 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", color: "#fff", letterSpacing: 0 }}>{f.title}</h5>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0, lineHeight: 1.65 }}>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <hr className="glow-line" style={{ maxWidth: 1100, margin: "0 auto" }} />

    {/* ── Plans ── */}
    <section id="plans" style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div {...fade()} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.75rem" }}>Investment Plans</p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff" }}>Choose Your Plan</h2>
          <p style={{ color: "var(--muted)", marginTop: "1rem", maxWidth: 500, margin: "1rem auto 0" }}>Select the plan that matches your capital and growth goals.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: "1.25rem" }}>
          {plans.map((p, i) => (
            <motion.div key={p.name} {...fade(i * 0.08)} className={`plan-card ${p.featured ? "featured" : ""}`}>
              {p.featured && (
                <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg,#F0A500,#FFD166)", color: "#000", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.25rem 0.7rem", borderRadius: 20 }}>
                  Popular
                </div>
              )}
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: "2rem", color: "#fff", marginBottom: "0.25rem" }}>{p.name}</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.82rem", margin: "0 0 1.5rem" }}>{p.range}</p>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "3.5rem", lineHeight: 1, background: "linear-gradient(135deg,#F0A500,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.25rem" }}>{p.roi}</div>
              <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginBottom: "1.5rem" }}>Daily ROI · {p.days} days</p>
              <div style={{ borderTop: "1px solid rgba(240,165,0,0.12)", paddingTop: "1.5rem" }}>
                {["Capital protection", "24/7 monitoring", "Instant withdrawal"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color: "var(--gold)", fontSize: "0.75rem" }}></i> {f}
                  </div>
                ))}
              </div>
              <Link to="/create" className="btn-gold" style={{ display: "block", textAlign: "center", textDecoration: "none", marginTop: "1.5rem", padding: "0.8rem" }}>
                Invest Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <hr className="glow-line" style={{ maxWidth: 1100, margin: "0 auto" }} />

    {/* ── Testimonials ── */}
    <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div {...fade()} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.75rem" }}>Testimonials</p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff" }}>What Our Investors Say</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.25rem" }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fade(i * 0.1)} className="testimonial-card">
              <div style={{ display: "flex", marginBottom: "1rem" }}>
                {[1,2,3,4,5].map(s => <i key={s} className="bi bi-star-fill" style={{ color: "var(--gold)", fontSize: "0.75rem", marginRight: 2 }}></i>)}
              </div>
              <p style={{ color: "var(--muted)", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img src={t.img} alt={t.name} style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(240,165,0,0.3)" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <motion.div {...fade()} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", color: "#fff" }}>Frequently Asked</h2>
        </motion.div>
        <motion.div {...fade(0.1)} className="glass" style={{ padding: "2rem" }}>
          {faqs.map(f => <FAQItem key={f.q} {...f} />)}
        </motion.div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{ padding: "5rem 1.5rem 7rem", position: "relative", zIndex: 1 }}>
      <motion.div {...fade()} className="glass" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "4rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(240,165,0,0.08), transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", marginBottom: "1rem" }}>Ready to Grow?</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Join 48,000+ investors already earning with Xentrovest.</p>
        <Link to="/create" className="btn-gold" style={{ textDecoration: "none", fontSize: "1.05rem", padding: "1rem 3rem", display: "inline-block" }}>
          Create Free Account
        </Link>
      </motion.div>
    </section>

    <Footer />
  </div>
);

export default Landing;
