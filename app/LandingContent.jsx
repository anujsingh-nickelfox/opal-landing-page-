"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  CheckCircle, Zap, Layout, Pointer, ChevronLeft, ChevronRight,
  Menu, X, ArrowRight, Star, Shield, BarChart3, Clock, Users,
  Sparkles, ListTodo, Calendar, Bell, Target, TrendingUp
} from "lucide-react";
import { PricingSection } from "@/components/ui/pricing";
import TestimonialMarquee from "@/components/ui/testimonial-marquee";
import FeatureMarquee from "@/components/ui/feature-marquee";

/* ─────────────────────────────────────────────
   GOOGLE FONTS injected via style tag
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style suppressHydrationWarning>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech&family=Titillium+Web:wght@200;300;400;600;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #050810;
      --black-2: #0a0e1a;
      --black-3: #0f1322;
      --white: #ffffff;
      --white-dim: rgba(240,244,255,0.65);
      --white-ghost: rgba(240,244,255,0.08);
      --border: rgba(240,244,255,0.1);
      --font-primary: 'Share Tech', monospace;
      --font-secondary: 'Titillium Web', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-secondary);
      background: var(--black);
      color: var(--white);
      overflow-x: hidden;
    }

    ::selection { background: var(--white-dim); color: #000; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--white-dim); border-radius: 2px; }

    .font-primary { font-family: var(--font-primary); }
    .font-secondary { font-family: var(--font-secondary); }

    .section-heading {
      font-family: var(--font-primary);
      font-size: clamp(2rem, 5vw, 3.5rem);
      letter-spacing: 0.04em;
      line-height: 1.1;
    }

    .section-sub {
      font-family: var(--font-secondary);
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--white-dim);
      font-weight: 300;
      line-height: 1.7;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--white);
      color: #000000;
      font-family: var(--font-primary);
      font-size: 0.95rem;
      letter-spacing: 0.08em;
      padding: 14px 32px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    }
    .btn-primary::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-primary:hover { background: var(--white-dim); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,255,255,0.2); }
    .btn-primary:hover::before { opacity: 1; }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--white);
      font-family: var(--font-primary);
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      padding: 13px 30px;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.3s ease;
      clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    }
    .btn-outline:hover { border-color: var(--white); color: var(--white-dim); }

    .grid-bg {
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .glow-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--white), transparent);
    }

    .card-glass {
      background: var(--white-ghost);
      border: 1px solid var(--border);
      backdrop-filter: blur(12px);
      transition: all 0.3s ease;
    }
    .card-glass:hover {
      border-color: rgba(255,255,255,0.4);
      box-shadow: 0 0 30px rgba(255,255,255,0.1);
    }

    .tab-active {
      background: rgba(255,255,255,0.1);
      border-color: var(--white) !important;
      color: var(--white-dim) !important;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    @keyframes scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }

    .floating { animation: float 6s ease-in-out infinite; }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  `}</style>
);

/* ─────────────────────────────────────────────
   FLOATING PATHS BACKGROUND
───────────────────────────────────────────── */
function FloatingPaths({ position = 1 }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.04,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" style={{ opacity: 0.35 }}>
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="#ffffff"
            strokeWidth={p.width}
            strokeOpacity={0.1 + p.id * 0.025}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2], pathOffset: [0, 1, 0] }}
            transition={{ duration: 18 + Math.random() * 12, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["Home", "Features", "Pricing", "Testimonials", "Contact Us"];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        suppressHydrationWarning
        style={{
          position: "fixed", top: "0px", left: "0px", right: "0px", zIndex: 100,
          padding: "0 5%",
          background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.2)" : "none",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px",
            background: "linear-gradient(135deg, #ffffff, #cccccc)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <ListTodo size={16} color="#000000" />
          </div>
          <span style={{ fontFamily: "var(--font-primary)", fontSize: "1.4rem", letterSpacing: "0.12em", color: "var(--white)" }}>
            OPAL
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "var(--font-secondary)", fontSize: "0.88rem", fontWeight: 400,
                color: "var(--white-dim)", textDecoration: "none", letterSpacing: "0.04em",
                position: "relative",
              }}
              whileHover={{
                color: "var(--white-dim)",
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
                y: -2,
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "9px 20px", fontSize: "0.82rem" }}
            onClick={() => alert("Navigate to Login")}>
            Log In
          </button>
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.82rem" }}
            onClick={() => alert("Navigate to Sign Up")}>
            Get Started
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", display: "none" }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: "68px", left: "0px", right: "0px", zIndex: 99,
              background: "rgba(5,8,16,0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "20px 5%", display: "flex", flexDirection: "column", gap: 16
            }}
            suppressHydrationWarning
          >
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
                style={{ fontFamily: "var(--font-secondary)", color: "var(--white-dim)", textDecoration: "none", fontSize: "1rem" }}
                onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => alert("Navigate to Login")}>
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }} className="grid-bg" suppressHydrationWarning>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none"
      }} className="pulse-glow" />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "120px 5% 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        {/* Left — Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", background: "var(--white)" }} />
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.78rem", letterSpacing: "0.2em", color: "var(--white-dim)", textTransform: "uppercase" }}>
              The Future of Task Management
            </span>
          </div>

          {/* Main headline */}
          <h1 className="section-heading" style={{ marginBottom: "20px", color: "var(--white)" }}>
            YOUR TASKS.<br />
            <span style={{ color: "var(--white-dim)", textShadow: "0 0 40px rgba(255,255,255,0.3)" }}>
              YOUR RULES.
            </span><br />
            YOUR OPAL.
          </h1>

          {/* Typographic accent line */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
              ◆ ORGANIZE ◆ PRIORITIZE ◆ EXECUTE ◆
            </span>
          </div>

          <p className="section-sub" style={{ maxWidth: "460px", marginBottom: "36px", fontSize: "1.05rem" }}>
            Opal transforms how you manage work. One intelligent platform for tasks, teams, and timelines — built for people who ship things that matter.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", marginBottom: "40px" }}>
            {[["50K+", "Active Users"], ["99.9%", "Uptime"], ["4.9★", "Avg Rating"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-primary)", fontSize: "1.5rem", color: "var(--white-dim)", letterSpacing: "0.04em" }}>{val}</div>
                <div style={{ fontFamily: "var(--font-secondary)", fontSize: "0.75rem", color: "var(--white-dim)", fontWeight: 300, letterSpacing: "0.08em" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => alert("Navigate to Sign Up")}>
              Get Started Free <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => alert("Navigate to Login")}>
              Log In
            </button>
          </div>

          {/* Trust badge */}
          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  alt={`User ${i}`}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--black)",
                    marginLeft: i > 1 ? "-12px" : "0px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.85rem", color: "var(--white-dim)", fontWeight: 400 }}>
              Trusted by 50,000+ professionals
            </span>
          </div>
        </motion.div>

        {/* Right — Hero Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "480px" }} className="floating">
            {/* Main dashboard card */}
            <div className="card-glass" style={{ borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", color: "var(--white-dim)", letterSpacing: "0.1em" }}>OPAL DASHBOARD</div>
                  <div style={{ fontFamily: "var(--font-secondary)", fontSize: "1.1rem", fontWeight: 600, color: "var(--white)", marginTop: "2px" }}>Today&apos;s Focus</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid var(--white)", borderRadius: "8px", padding: "6px 14px" }}>
                  <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", color: "var(--white-dim)" }}>8 tasks</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--white-dim)", fontFamily: "var(--font-secondary)" }}>Sprint Progress</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--white-dim)", fontFamily: "var(--font-primary)" }}>68%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #ffffff, #cccccc)", borderRadius: "3px" }}
                  />
                </div>
              </div>

              {/* Task items */}
              {[
                { label: "Design system audit", done: true, priority: "high" },
                { label: "API integration review", done: true, priority: "medium" },
                { label: "Write onboarding copy", done: false, priority: "high" },
                { label: "Deploy staging build", done: false, priority: "low" },
              ].map((task, i) => (
                <motion.div
                  key={task.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 12px", marginBottom: "8px",
                    background: task.done ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                    borderRadius: "8px", border: `1px solid ${task.done ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                    background: task.done ? "var(--white)" : "transparent",
                    border: task.done ? "none" : "1px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {task.done && <CheckCircle size={12} color="#000000" />}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-secondary)", fontSize: "0.85rem",
                    color: task.done ? "var(--white-dim)" : "var(--white)",
                    textDecoration: task.done ? "line-through" : "none", flex: 1
                  }}>{task.label}</span>
                  <span style={{
                    fontFamily: "var(--font-primary)", fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: task.priority === "high" ? "#ff6b6b" : task.priority === "medium" ? "#ffd166" : "var(--white-dim)",
                    textTransform: "uppercase"
                  }}>{task.priority}</span>
                </motion.div>
              ))}
            </div>

            {/* Floating notification badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -4, 0],
              }}
              transition={{
                delay: 1.2,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                position: "absolute", top: "-16px", right: "-16px",
                background: "linear-gradient(135deg, #ffffff, #cccccc)",
                borderRadius: "12px", padding: "8px 14px",
                boxShadow: "0 4px 20px rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", gap: "6px",
                cursor: "pointer"
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 6px 30px rgba(255,255,255,0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Bell size={13} color="#000000" />
              </motion.div>
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", color: "#000000" }}>3 due today</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="glow-line" style={{ position: "absolute", bottom: "0px", left: "0px", right: "0px" }} />

      <style>{`
        @media (max-width: 900px) {
          #home > div > div { grid-template-columns: 1fr !important; }
          #home > div > div > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────── */
const featureTabs = [
  {
    value: "tab-1",
    icon: <Zap size={16} />,
    label: "Smart Prioritization",
    badge: "AI-Powered",
    title: "Let intelligence decide what matters next.",
    description: "Opal's AI engine analyzes deadlines, dependencies, and your work patterns to surface the highest-impact tasks automatically — so you always know exactly where to focus.",
    buttonText: "Get Started Free",
    image: "https://lumenalta.com/_next/image?url=https%3A%2F%2Fassets.lumenalta.com%2Ff%2F1019928%2F1920x728%2Fb42f25c12e%2Fwhat-is-ai.png%2Fm%2F&w=3840&q=75"
  },
  {
    value: "tab-2",
    icon: <Users size={16} />,
    label: "Team Collaboration",
    badge: "Real-Time Sync",
    title: "Your whole team, perfectly in sync.",
    description: "Assign tasks, track progress, and communicate directly within Opal. Real-time updates mean your team always works from the same source of truth — no more dropped balls.",
    buttonText: "Start Collaborating",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
  },
  {
    value: "tab-3",
    icon: <BarChart3 size={16} />,
    label: "Deep Analytics",
    badge: "Insights Engine",
    title: "Understand how work actually flows.",
    description: "Velocity reports, burndown charts, and bottleneck detection reveal exactly where your team excels and where improvement is hiding. Turn data into decisions.",
    buttonText: "Explore Analytics",
    image: "https://smtcenter.net/wp-content/uploads/2022/11/Big-Data-Advanced-Analytics-scaled-1.jpg"
  },
];

function Features() {
  const [active, setActive] = useState("tab-1");
  const current = featureTabs.find(t => t.value === active);

  return (
    <section id="features" style={{ padding: "100px 5%", position: "relative", overflow: "hidden" }} suppressHydrationWarning>
      {/* BG accent */}
      <div style={{
        position: "absolute", top: "50%", right: "-10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--white-dim)" }}>WHAT OPAL CAN DO</span>
            <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
          </div>
          <h2 className="section-heading" style={{ marginBottom: "16px" }}>BUILT FOR HOW<br /><span style={{ color: "var(--white-dim)" }}>YOU ACTUALLY WORK</span></h2>
          <p className="section-sub" style={{ maxWidth: "560px", margin: "0 auto" }}>
            Every feature in Opal is designed around one question: does this help you ship faster?
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
            {featureTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={active === tab.value ? "tab-active card-glass" : "card-glass"}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 24px", border: "1px solid var(--border)",
                  background: "none", cursor: "pointer",
                  fontFamily: "var(--font-primary)", fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  color: active === tab.value ? "var(--white-dim)" : "var(--white-dim)",
                  borderRadius: "8px", transition: "all 0.3s ease",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="card-glass"
              style={{
                borderRadius: "16px", overflow: "hidden",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "0px"
              }}
            >
              {/* Text side */}
              <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "20px", padding: "4px 14px", marginBottom: "20px", width: "fit-content"
                }}>
                  <Sparkles size={12} color="var(--white-dim)" />
                  <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--white-dim)" }}>{current.badge}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "0.03em", color: "var(--white)", marginBottom: "16px", lineHeight: 1.2 }}>
                  {current.title}
                </h3>
                <p style={{ fontFamily: "var(--font-secondary)", fontSize: "1rem", color: "var(--white-dim)", lineHeight: 1.75, marginBottom: "32px", fontWeight: 300 }}>
                  {current.description}
                </p>
                <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => alert("Navigate to Sign Up")}>
                  {current.buttonText} <ArrowRight size={15} />
                </button>
              </div>

              {/* Image side */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: "320px" }}>
                <img
                  src={current.image}
                  alt={current.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: "0px",
                  background: "linear-gradient(135deg, rgba(5,8,16,0.4) 0%, transparent 60%)"
                }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Feature Marquee */}
        <div style={{ marginTop: "50px" }}>
          <FeatureMarquee />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING SECTION
───────────────────────────────────────────── */
const plans = [
  {
    name: "Starter",
    price: "0",
    yearlyPrice: "0",
    period: "month",
    description: "Perfect for solo taskers and personal projects.",
    features: ["Up to 3 projects", "50 tasks/month", "Basic analytics", "Mobile app access", "Community support"],
    buttonText: "Start Free",
    href: "#",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "19",
    yearlyPrice: "15",
    period: "month",
    description: "For power users who need serious productivity.",
    features: ["Unlimited projects", "Unlimited tasks", "AI prioritization", "Advanced analytics", "Priority support", "Team sharing (5 seats)"],
    buttonText: "Get Started",
    href: "#",
    isPopular: true,
  },
  {
    name: "Team",
    price: "49",
    yearlyPrice: "39",
    period: "month",
    description: "Built for teams that move fast and ship often.",
    features: ["Everything in Pro", "Unlimited seats", "Admin controls", "SSO integration", "Dedicated CSM", "Custom workflows", "SLA guarantee"],
    buttonText: "Contact Sales",
    href: "#",
    isPopular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing">
      <PricingSection
        plans={plans}
        title="Invest in Your Productivity"
        description="No surprises. No hidden fees. Start free and scale when you're ready."
      />
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }} suppressHydrationWarning>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "50px", padding: "0 5%" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
          <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--white-dim)" }}>WHAT USERS SAY</span>
          <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
        </div>
        <h2 className="section-heading" style={{ marginBottom: "16px" }}>
          LOVED BY THOUSANDS<br />
          <span style={{ color: "var(--white-dim)" }}>OF PROFESSIONALS</span>
        </h2>
      </motion.div>

      {/* Marquee Testimonials */}
      <TestimonialMarquee />
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const navLinks = [
    { label: "Products", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "#contact-us" },
    { label: "Privacy Policy", href: "#" },
  ];

  const socialLinks = [
    {
      label: "Twitter / X", href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    },
    {
      label: "LinkedIn", href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    },
    {
      label: "GitHub", href: "#",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
    },
  ];

  return (
    <footer id="contact-us" style={{ borderTop: "1px solid var(--border)", background: "var(--black-2)", padding: "70px 5% 40px" }} suppressHydrationWarning>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "48px", marginBottom: "60px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, #ffffff, #cccccc)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <ListTodo size={16} color="#000000" />
              </div>
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "1.3rem", letterSpacing: "0.12em" }}>OPAL</span>
            </div>
            <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.87rem", color: "var(--white-dim)", lineHeight: 1.75, fontWeight: 300, maxWidth: "280px" }}>
              Empowering individuals and teams to work smarter, ship faster, and achieve more — every single day.
            </p>
            <div style={{ marginTop: "20px" }}>
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.82rem" }} onClick={() => alert("Navigate to Sign Up")}>
                Get Started Free
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: "20px", textTransform: "uppercase" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ fontFamily: "var(--font-secondary)", fontSize: "0.87rem", color: "var(--white-dim)", textDecoration: "none", fontWeight: 300, transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--white-dim)"}
                    onMouseLeave={e => e.target.style.color = "var(--white-dim)"}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: "20px", textTransform: "uppercase" }}>Follow Us</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {socialLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--white-dim)", textDecoration: "none", fontFamily: "var(--font-secondary)", fontSize: "0.87rem", fontWeight: 300, transition: "color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--blue-light)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--white-dim)"; }}>
                    {link.icon} {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: "8px", textTransform: "uppercase" }}>Newsletter</h4>
            <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.82rem", color: "var(--white-dim)", marginBottom: "16px", fontWeight: 300 }}>
              Get productivity tips and product updates delivered weekly.
            </p>
            <form onSubmit={handleSubscribe} style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: "0px" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={status !== "idle"}
                  style={{
                    flex: 1, padding: "11px 16px",
                    background: "var(--white-ghost)", border: "1px solid var(--border)",
                    borderRight: "none", color: "var(--white)",
                    fontFamily: "var(--font-secondary)", fontSize: "0.85rem",
                    outline: "none", borderRadius: "4px 0 0 4px"
                  }}
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  style={{
                    padding: "11px 18px",
                    background: "var(--white)", border: "1px solid var(--white)",
                    color: "#000", cursor: "pointer",
                    fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.06em",
                    borderRadius: "0 4px 4px 0", transition: "background 0.3s"
                  }}
                >
                  {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
                </button>
              </div>
              {status === "success" && (
                <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.78rem", color: "#4ade80", marginTop: "8px" }}>
                  You&apos;re subscribed! Welcome to the Opal community 🎉
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="glow-line" style={{ marginBottom: "28px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.8rem", color: "var(--white-dim)", fontWeight: 300 }}>
            © 2026 Opal. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Terms", "Privacy", "Cookies"].map(item => (
              <a key={item} href="#" style={{ fontFamily: "var(--font-secondary)", fontSize: "0.8rem", color: "var(--white-dim)", textDecoration: "none", fontWeight: 300 }}
                onMouseEnter={e => e.target.style.color = "var(--blue-light)"}
                onMouseLeave={e => e.target.style.color = "var(--white-dim)"}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div[style*="grid-template-columns: 2fr 1fr 1fr 2fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div > div[style*="grid-template-columns: 2fr 1fr 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   LANDING CONTENT EXPORT
───────────────────────────────────────────── */
export default function LandingContent() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main suppressHydrationWarning>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
