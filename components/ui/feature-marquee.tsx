"use client";

import React from "react";
import { Clock, Target, Shield, TrendingUp, Zap, Users, BarChart3, CheckCircle, Calendar, Sparkles, Layout, ArrowRight } from "lucide-react";

type FeatureT = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const DEFAULT_DATA: FeatureT[] = [
  { icon: <Clock size={32} />, title: "Time Tracking", desc: "Log hours without friction" },
  { icon: <Target size={32} />, title: "Goal Setting", desc: "Align tasks to outcomes" },
  { icon: <Shield size={32} />, title: "Secure & Private", desc: "Enterprise-grade protection" },
  { icon: <TrendingUp size={32} />, title: "Performance Metrics", desc: "Track what moves the needle" },
  { icon: <Zap size={32} />, title: "AI Automation", desc: "Smart task prioritization" },
  { icon: <Users size={32} />, title: "Team Collaboration", desc: "Work together seamlessly" },
  { icon: <BarChart3 size={32} />, title: "Advanced Analytics", desc: "Data-driven insights" },
  { icon: <CheckCircle size={32} />, title: "Task Completion", desc: "Track progress in real-time" },
  { icon: <Calendar size={32} />, title: "Smart Scheduling", desc: "Optimize your workflow" },
  { icon: <Sparkles size={32} />, title: "Custom Workflows", desc: "Tailor to your needs" },
  { icon: <Layout size={32} />, title: "Project Management", desc: "Organize with ease" },
  { icon: <ArrowRight size={32} />, title: "Quick Actions", desc: "Get things done fast" },
];

const FeatureItem = ({ feature }: { feature: FeatureT }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      margin: "0 40px",
      whiteSpace: "nowrap",
    }}
  >
    <div style={{ color: "var(--white)", flexShrink: 0 }}>{feature.icon}</div>
    <div>
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "1.5rem",
          letterSpacing: "0.04em",
          color: "var(--white)",
          fontWeight: 600,
          marginBottom: "4px",
        }}
      >
        {feature.title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-secondary)",
          fontSize: "1.1rem",
          color: "var(--white-dim)",
          fontWeight: 400,
        }}
      >
        {feature.desc}
      </div>
    </div>
  </div>
);

function MarqueeRow({
  data,
  speed = 10,
}: {
  data: FeatureT[];
  speed?: number;
}) {
  const quadrupled = React.useMemo(() => [...data, ...data, ...data, ...data], [data]);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100px",
          zIndex: 10,
          background: "linear-gradient(to right, var(--black), transparent)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          transform: "translateZ(0)",
          minWidth: "200%",
          paddingTop: "40px",
          paddingBottom: "20px",
          animation: `marqueeScroll ${speed}s linear infinite`,
        }}
      >
        {quadrupled.map((f, i) => (
          <FeatureItem key={i} feature={f} />
        ))}
      </div>
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "100px",
          zIndex: 10,
          background: "linear-gradient(to left, var(--black), transparent)",
        }}
      />
    </div>
  );
}

export default function FeatureMarquee({
  data = DEFAULT_DATA,
}: {
  data?: FeatureT[];
}) {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <MarqueeRow data={data} speed={10} />
    </>
  );
}
