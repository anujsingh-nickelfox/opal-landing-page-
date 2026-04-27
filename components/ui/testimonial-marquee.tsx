"use client";

import React from "react";

type CardT = {
  image: string;
  name: string;
  handle: string;
  date?: string;
};

const DEFAULT_DATA: CardT[] = [
  {
    image: "https://i.pravatar.cc/150?img=1",
    name: "Sarah K.",
    handle: "VP Engineering at Vertikal",
  },
  {
    image: "https://i.pravatar.cc/150?img=2",
    name: "Marcus T.",
    handle: "Founder at LayerOne",
  },
  {
    image: "https://i.pravatar.cc/150?img=3",
    name: "Priya R.",
    handle: "Product Lead at Nexus",
  },
  {
    image: "https://i.pravatar.cc/150?img=4",
    name: "James W.",
    handle: "CTO at DataShift",
  },
  {
    image: "https://i.pravatar.cc/150?img=5",
    name: "Amina D.",
    handle: "COO at BuildFast",
  },
  {
    image: "https://i.pravatar.cc/150?img=6",
    name: "Leo N.",
    handle: "CTO at Sprinto",
  },
];

const VerifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 48 48"
    style={{ display: "inline-block" }}
  >
    <polygon
      fill="#42a5f5"
      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
    ></polygon>
    <polygon
      fill="#fff"
      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
    ></polygon>
  </svg>
);

const Card = ({ card }: { card: CardT }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "8px",
      margin: "0 16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transition: "all 0.2s",
      width: "288px",
      flexShrink: 0,
      background: "rgba(240, 244, 255, 0.05)",
      border: "1px solid var(--border)",
    }}
  >
    <div style={{ display: "flex", gap: "8px" }}>
      <img
        style={{ width: "44px", height: "44px", borderRadius: "50%" }}
        src={card.image}
        alt={card.name}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <p style={{ fontWeight: 500, color: "var(--white)" }}>{card.name}</p>
          <VerifyIcon />
        </div>
        <span style={{ fontSize: "12px", color: "var(--white-dim)" }}>{card.handle}</span>
      </div>
    </div>
    <p style={{ fontSize: "14px", paddingTop: "16px", color: "var(--white-dim)", fontWeight: 300 }}>
      Radiant made undercutting all of our competitors an absolute breeze.
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 15,
}: {
  data: CardT[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data]);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        maxWidth: "100%",
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
          width: "96px",
          zIndex: 10,
          background: "linear-gradient(to right, var(--black), transparent)",
        }}
      />
      <div
        style={{
          display: "flex",
          transform: "translateZ(0)",
          minWidth: "200%",
          paddingTop: reverse ? "20px" : "40px",
          paddingBottom: reverse ? "40px" : "20px",
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "96px",
          zIndex: 10,
          background: "linear-gradient(to left, var(--black), transparent)",
        }}
      />
    </div>
  );
}

export default function TestimonialMarquee({
  row1 = DEFAULT_DATA,
  row2 = DEFAULT_DATA,
}: {
  row1?: CardT[];
  row2?: CardT[];
}) {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <MarqueeRow data={row1} reverse={false} speed={25} />
        <MarqueeRow data={row2} reverse={true} speed={25} />
      </div>
    </>
  );
}
