"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  CheckCircle, Zap, Layout, Pointer, ChevronLeft, ChevronRight,
  Menu, X, ArrowRight, Star, Shield, BarChart3, Clock, Users,
  Sparkles, ListTodo, Calendar, Bell, Target, TrendingUp
} from "lucide-react";

/* ─────────────────────────────────────────────
   GOOGLE FONTS injected via style tag
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech&family=Titillium+Web:wght@200;300;400;600;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #050810;
      --black-2: #0a0e1a;
      --black-3: #0f1322;
      --blue: #1d6cf6;
      --blue-light: #3d82ff;
      --blue-glow: rgba(29,108,246,0.35);
      --blue-dim: rgba(29,108,246,0.12);
      --white: #f0f4ff;
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

    ::selection { background: var(--blue); color: #fff; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }

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
      background: var(--blue);
      color: #fff;
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
    .btn-primary:hover { background: var(--blue-light); transform: translateY(-2px); box-shadow: 0 8px 30px var(--blue-glow); }
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
    .btn-outline:hover { border-color: var(--blue); color: var(--blue-light); }

    .grid-bg {
      background-image:
        linear-gradient(rgba(29,108,246,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(29,108,246,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .glow-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--blue), transparent);
    }

    .card-glass {
      background: var(--white-ghost);
      border: 1px solid var(--border);
      backdrop-filter: blur(12px);
      transition: all 0.3s ease;
    }
    .card-glass:hover {
      border-color: rgba(29,108,246,0.4);
      box-shadow: 0 0 30px var(--blue-dim);
    }

    .tab-active {
      background: var(--blue-dim);
      border-color: var(--blue) !important;
      color: var(--blue-light) !important;
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
            stroke="#1d6cf6"
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
        style={{
          position: "fixed", top: "0px", left: "0px", right: "0px", zIndex: 100,
          padding: "0 5%",
          background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(29,108,246,0.2)" : "none",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: "34px", height: "34px",
            background: "linear-gradient(135deg, #1d6cf6, #3d82ff)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <ListTodo size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: "var(--font-primary)", fontSize: "1.4rem", letterSpacing: "0.12em", color: "var(--white)" }}>
            OPAL
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "var(--font-secondary)", fontSize: "0.88rem", fontWeight: 400,
                color: "var(--white-dim)", textDecoration: "none", letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#1d6cf6"}
              onMouseLeave={e => e.target.style.color = "var(--white-dim)"}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "9px 20px", fontSize: "0.82rem" }}
            onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
            Log In
          </button>
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.82rem" }}
            onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
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
          >
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
                style={{ fontFamily: "var(--font-secondary)", color: "var(--white-dim)", textDecoration: "none", fontSize: "1rem" }}
                onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
            <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
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
    <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }} className="grid-bg">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(29,108,246,0.18) 0%, transparent 70%)",
        pointerEvents: "none"
      }} className="pulse-glow" />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "120px 5% 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left — Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: "32px", height: "1px", background: "var(--blue)" }} />
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.78rem", letterSpacing: "0.2em", color: "var(--blue-light)", textTransform: "uppercase" }}>
              The Future of Task Management
            </span>
          </div>

          {/* Main headline */}
          <h1 className="section-heading" style={{ marginBottom: 20, color: "var(--white)" }}>
            YOUR TASKS.<br />
            <span style={{ color: "var(--blue-light)", textShadow: "0 0 40px rgba(29,108,246,0.6)" }}>
              YOUR RULES.
            </span><br />
            YOUR OPAL.
          </h1>

          {/* Typographic accent line */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(29,108,246,0.6)", textTransform: "uppercase" }}>
              ◆ ORGANIZE ◆ PRIORITIZE ◆ EXECUTE ◆
            </span>
          </div>

          <p className="section-sub" style={{ maxWidth: 460, marginBottom: 36, fontSize: "1.05rem" }}>
            Opal transforms how you manage work. One intelligent platform for tasks, teams, and timelines — built for people who ship things that matter.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
            {[["50K+", "Active Users"], ["99.9%", "Uptime"], ["4.9★", "Avg Rating"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-primary)", fontSize: "1.5rem", color: "var(--blue-light)", letterSpacing: "0.04em" }}>{val}</div>
                <div style={{ fontFamily: "var(--font-secondary)", fontSize: "0.75rem", color: "var(--white-dim)", fontWeight: 300, letterSpacing: "0.08em" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
              Get Started Free <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
              Log In
            </button>
          </div>

          {/* Trust badge */}
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex" }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: `hsl(${210 + i*15},60%,${40 + i*8}%)`,
                  border: "2px solid var(--black)", marginLeft: i > 1 ? -10 : 0
                }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.8rem", color: "var(--white-dim)", fontWeight: 300 }}>
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
          <div style={{ position: "relative", width: "100%", maxWidth: 480 }} className="floating">
            {/* Main dashboard card */}
            <div className="card-glass" style={{ borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", color: "var(--blue-light)", letterSpacing: "0.1em" }}>OPAL DASHBOARD</div>
                  <div style={{ fontFamily: "var(--font-secondary)", fontSize: "1.1rem", fontWeight: 600, color: "var(--white)", marginTop: 2 }}>Today&apos;s Focus</div>
                </div>
                <div style={{ background: "var(--blue-dim)", border: "1px solid var(--blue)", borderRadius: 8, padding: "6px 14px" }}>
                  <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", color: "var(--blue-light)" }}>8 tasks</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--white-dim)", fontFamily: "var(--font-secondary)" }}>Sprint Progress</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--blue-light)", fontFamily: "var(--font-primary)" }}>68%</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #1d6cf6, #3d82ff)", borderRadius: 3 }}
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
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", marginBottom: 8,
                    background: task.done ? "rgba(29,108,246,0.06)" : "rgba(255,255,255,0.03)",
                    borderRadius: 8, border: `1px solid ${task.done ? "rgba(29,108,246,0.2)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div style={{
                    width: "18px", height: "18px", borderRadius: 4, flexShrink: 0,
                    background: task.done ? "var(--blue)" : "transparent",
                    border: task.done ? "none" : "1px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {task.done && <CheckCircle size={12} color="#fff" />}
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
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                position: "absolute", top: "-16px", right: "-16px",
                background: "linear-gradient(135deg, #1d6cf6, #3d82ff)",
                borderRadius: "12px", padding: "8px 14px",
                boxShadow: "0 4px 20px rgba(29,108,246,0.5)",
                display: "flex", alignItems: "center", gap: "6px"
              }}
            >
              <Bell size={13} color="#fff" />
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", color: "#fff" }}>3 due today</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="glow-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

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
    <section id="features" style={{ padding: "100px 5%", position: "relative", overflow: "hidden" }}>
      {/* BG accent */}
      <div style={{
        position: "absolute", top: "50%", right: "-10%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(29,108,246,0.1) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--blue-light)" }}>WHAT OPAL CAN DO</span>
            <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
          </div>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>BUILT FOR HOW<br /><span style={{ color: "var(--blue-light)" }}>YOU ACTUALLY WORK</span></h2>
          <p className="section-sub" style={{ maxWidth: 560, margin: "0 auto" }}>
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
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {featureTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={active === tab.value ? "tab-active card-glass" : "card-glass"}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", border: "1px solid var(--border)",
                  background: "none", cursor: "pointer",
                  fontFamily: "var(--font-primary)", fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  color: active === tab.value ? "var(--blue-light)" : "var(--white-dim)",
                  borderRadius: 8, transition: "all 0.3s ease",
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
                borderRadius: 16, overflow: "hidden",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 0
              }}
            >
              {/* Text side */}
              <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "var(--blue-dim)", border: "1px solid rgba(29,108,246,0.3)",
                  borderRadius: 20, padding: "4px 14px", marginBottom: 20, width: "fit-content"
                }}>
                  <Sparkles size={12} color="var(--blue-light)" />
                  <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--blue-light)" }}>{current.badge}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "0.03em", color: "var(--white)", marginBottom: 16, lineHeight: 1.2 }}>
                  {current.title}
                </h3>
                <p style={{ fontFamily: "var(--font-secondary)", fontSize: "1rem", color: "var(--white-dim)", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
                  {current.description}
                </p>
                <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
                  {current.buttonText} <ArrowRight size={15} />
                </button>
              </div>

              {/* Image side */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
                <img
                  src={current.image}
                  alt={current.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(5,8,16,0.4) 0%, transparent 60%)"
                }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Icon grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 50 }}>
          {[
            { icon: <Clock size={22} />, title: "Time Tracking", desc: "Log hours without friction" },
            { icon: <Target size={22} />, title: "Goal Setting", desc: "Align tasks to outcomes" },
            { icon: <Shield size={22} />, title: "Secure & Private", desc: "Enterprise-grade protection" },
            { icon: <TrendingUp size={22} />, title: "Performance Metrics", desc: "Track what moves the needle" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glass"
              style={{ borderRadius: 12, padding: "24px 20px" }}
            >
              <div style={{ color: "var(--blue-light)", marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontFamily: "var(--font-primary)", fontSize: "0.9rem", letterSpacing: "0.06em", color: "var(--white)", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontFamily: "var(--font-secondary)", fontSize: "0.82rem", color: "var(--white-dim)", fontWeight: 300 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #features .card-glass[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
    desc: "Perfect for solo taskers and personal projects.",
    features: ["Up to 3 projects", "50 tasks/month", "Basic analytics", "Mobile app access", "Community support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "19",
    desc: "For power users who need serious productivity.",
    features: ["Unlimited projects", "Unlimited tasks", "AI prioritization", "Advanced analytics", "Priority support", "Team sharing (5 seats)"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "49",
    desc: "Built for teams that move fast and ship often.",
    features: ["Everything in Pro", "Unlimited seats", "Admin controls", "SSO integration", "Dedicated CSM", "Custom workflows", "SLA guarantee"],
    cta: "Contact Sales",
    popular: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 5%", position: "relative", overflow: "hidden" }} className="grid-bg">
      {/* BG glow */}
      <div style={{
        position: "absolute", top: "40%", left: "20%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(29,108,246,0.1) 0%, transparent 65%)",
        pointerEvents: "none"
      }} className="pulse-glow" />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
            <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--blue-light)" }}>SIMPLE PRICING</span>
            <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
          </div>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            INVEST IN YOUR<br />
            <span style={{ color: "var(--blue-light)" }}>PRODUCTIVITY</span>
          </h2>
          <p className="section-sub" style={{ maxWidth: 500, margin: "0 auto" }}>
            No surprises. No hidden fees. Start free and scale when you&apos;re ready.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="card-glass"
              style={{
                borderRadius: 16, padding: "36px 28px",
                position: "relative", display: "flex", flexDirection: "column",
                border: plan.popular ? "1px solid rgba(29,108,246,0.5)" : "1px solid var(--border)",
                boxShadow: plan.popular ? "0 0 40px rgba(29,108,246,0.15)" : "none",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #1d6cf6, #3d82ff)",
                  borderRadius: 20, padding: "4px 18px",
                  fontFamily: "var(--font-primary)", fontSize: "0.72rem", letterSpacing: "0.12em", color: "#fff"
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: "var(--font-primary)", fontSize: "1.8rem", letterSpacing: "0.06em", color: "var(--white)" }}>{plan.name}</div>
                <div style={{ fontFamily: "var(--font-secondary)", fontSize: "0.85rem", color: "var(--white-dim)", marginTop: 4, fontWeight: 300 }}>{plan.desc}</div>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 4, margin: "24px 0", padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-primary)", fontSize: "3rem", color: plan.popular ? "var(--blue-light)" : "var(--white)" }}>
                  ${plan.price}
                </span>
                <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.85rem", color: "var(--white-dim)" }}>/month</span>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle size={15} color="#1d6cf6" />
                    <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.88rem", color: "var(--white-dim)", fontWeight: 300 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={plan.popular ? "btn-primary" : "btn-outline"}
                style={{ width: "100%", justifyContent: "center", clipPath: "none", borderRadius: 8 }}
                onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 50 }}
        >
          <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.88rem", color: "var(--white-dim)" }}>
            All plans include 14-day free trial. No credit card required.{" "}
            <span style={{ color: "var(--blue-light)", cursor: "pointer" }} onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
              Already have an account? Log in →
            </span>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pricing > div > div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const testimonials = [
  { id: 0, text: "Opal completely changed how our engineering team operates. We shipped 40% more features last quarter.", by: "Sarah K., VP Engineering at Vertikal", img: "https://i.pravatar.cc/150?img=1" },
  { id: 1, text: "The AI prioritization alone is worth 10x the price. I never miss what matters anymore.", by: "Marcus T., Founder at LayerOne", img: "https://i.pravatar.cc/150?img=2" },
  { id: 2, text: "I&apos;ve tried every todo app out there. Opal is the first one I actually stuck with.", by: "Priya R., Product Lead at Nexus", img: "https://i.pravatar.cc/150?img=3" },
  { id: 3, text: "Our team collaboration improved overnight. Real-time sync means no more &apos;I didn&apos;t see that&apos; excuses.", by: "James W., CTO at DataShift", img: "https://i.pravatar.cc/150?img=4" },
  { id: 4, text: "The analytics dashboard showed us we were spending 60% of time on low-impact work. Game changer.", by: "Amina D., COO at BuildFast", img: "https://i.pravatar.cc/150?img=5" },
  { id: 5, text: "Setup took 10 minutes. Our team was fully onboarded in an hour. Opal just works.", by: "Leo N., CTO at Sprinto", img: "https://i.pravatar.cc/150?img=6" },
  { id: 6, text: "I recommended Opal to 3 other founders after just one week. That never happens.", by: "Rachel B., Founder at Orbit", img: "https://i.pravatar.cc/150?img=7" },
  { id: 7, text: "The ROI is insane. We cancelled 4 other subscriptions after switching to Opal.", by: "Dev P., Operations at Streamline", img: "https://i.pravatar.cc/150?img=8" },
];

const SQRT_5000 = Math.sqrt(5000);

function TestimonialCard({ position, testimonial, handleMove, cardSize }) {
  const isCenter = position === 0;
  return (
    <div
      onClick={() => handleMove(position)}
      style={{
        position: "absolute", left: "50%", top: "50%", cursor: "pointer",
        width: cardSize, height: cardSize,
        padding: 28,
        background: isCenter ? "var(--blue)" : "var(--white-ghost)",
        border: `2px solid ${isCenter ? "var(--blue-light)" : "var(--border)"}`,
        backdropFilter: "blur(10px)",
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -60 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(29,108,246,0.3)" : "none",
        transition: "all 0.5s ease",
        zIndex: isCenter ? 10 : 0,
      }}
    >
      <span style={{
        position: "absolute", right: "-2px", top: "40px",
        width: SQRT_5000, height: 2,
        background: "rgba(255,255,255,0.1)",
        display: "block",
        transform: "rotate(45deg)",
        transformOrigin: "top right",
      }} />
      <img src={testimonial.img} alt="" style={{ width: "44px", height: "52px", objectFit: "cover", objectPosition: "top", marginBottom: 14, boxShadow: "3px 3px 0 rgba(0,0,0,0.3)" }} />
      <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.92rem", fontWeight: 500, color: isCenter ? "#fff" : "var(--white)", lineHeight: 1.6, marginBottom: 12 }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <p style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px", fontFamily: "var(--font-secondary)", fontSize: "0.78rem", fontStyle: "italic", color: isCenter ? "rgba(255,255,255,0.8)" : "var(--white-dim)" }}>
        — {testimonial.by}
      </p>
    </div>
  );
}

function Testimonials() {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, id: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, id: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const update = () => setCardSize(window.innerWidth >= 640 ? 340 : 270);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="testimonials" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 50, padding: "0 5%" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
          <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--blue-light)" }}>WHAT USERS SAY</span>
          <div style={{ width: 40, height: 1, background: "var(--blue)" }} />
        </div>
        <h2 className="section-heading" style={{ marginBottom: 16 }}>
          LOVED BY THOUSANDS<br />
          <span style={{ color: "var(--blue-light)" }}>OF PROFESSIONALS</span>
        </h2>
      </motion.div>

      {/* Stagger carousel */}
      <div style={{ position: "relative", width: "100%", height: 560, overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
        {list.map((t, index) => {
          const position = list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
          return (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        {/* Nav buttons */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12 }}>
          {[{ dir: -1, Icon: ChevronLeft }, { dir: 1, Icon: ChevronRight }].map(({ dir, Icon }) => (
            <button
              key={dir}
              onClick={() => handleMove(dir)}
              style={{
                width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--black-3)", border: "1px solid var(--border)", cursor: "pointer",
                color: "var(--white)", transition: "all 0.3s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--blue)"; e.currentTarget.style.borderColor = "var(--blue)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--black-3)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>
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
    <footer id="contact-us" style={{ borderTop: "1px solid var(--border)", background: "var(--black-2)", padding: "70px 5% 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, #1d6cf6, #3d82ff)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <ListTodo size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "var(--font-primary)", fontSize: "1.3rem", letterSpacing: "0.12em" }}>OPAL</span>
            </div>
            <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.87rem", color: "var(--white-dim)", lineHeight: 1.75, fontWeight: 300, maxWidth: 280 }}>
              Empowering individuals and teams to work smarter, ship faster, and achieve more — every single day.
            </p>
            <div style={{ marginTop: 20 }}>
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.82rem" }} onClick={() => window.open('https://opal-log-in-sign-up-6jc6.vercel.app/', '_self')}>
                Get Started Free
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: 20, textTransform: "uppercase" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ fontFamily: "var(--font-secondary)", fontSize: "0.87rem", color: "var(--white-dim)", textDecoration: "none", fontWeight: 300, transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--blue-light)"}
                    onMouseLeave={e => e.target.style.color = "var(--white-dim)"}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: 20, textTransform: "uppercase" }}>Follow Us</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {socialLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--white-dim)", textDecoration: "none", fontFamily: "var(--font-secondary)", fontSize: "0.87rem", fontWeight: 300, transition: "color 0.2s" }}
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
            <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.18em", color: "var(--white)", marginBottom: 8, textTransform: "uppercase" }}>Newsletter</h4>
            <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.82rem", color: "var(--white-dim)", marginBottom: 16, fontWeight: 300 }}>
              Get productivity tips and product updates delivered weekly.
            </p>
            <form onSubmit={handleSubscribe} style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 0 }}>
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
                    background: "var(--blue)", border: "1px solid var(--blue)",
                    color: "#fff", cursor: "pointer",
                    fontFamily: "var(--font-primary)", fontSize: "0.8rem", letterSpacing: "0.06em",
                    borderRadius: "0 4px 4px 0", transition: "background 0.3s"
                  }}
                >
                  {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
                </button>
              </div>
              {status === "success" && (
                <p style={{ fontFamily: "var(--font-secondary)", fontSize: "0.78rem", color: "#4ade80", marginTop: 8 }}>
                  You&apos;re subscribed! Welcome to the Opal community 🎉
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="glow-line" style={{ marginBottom: 28 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-secondary)", fontSize: "0.8rem", color: "var(--white-dim)", fontWeight: 300 }}>
            © 2026 Opal. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
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
   ROOT APP
───────────────────────────────────────────── */
export default function OpalLandingPage() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
