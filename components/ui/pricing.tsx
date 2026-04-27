"use client";

import { motion, useSpring } from "framer-motion";
import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";

// --- UTILITY FUNCTIONS ---

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);
    return () => result.removeEventListener("change", onChange);
  }, [query]);
  return value;
}

// --- INTERACTIVE STARFIELD ---

function Star({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const starX =
      containerRect.left +
      (parseFloat(initialPos.left) / 100) * containerRect.width;
    const starY =
      containerRect.top +
      (parseFloat(initialPos.top) / 100) * containerRect.height;
    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const radius = 600;
    if (distance < radius) {
      const force = 1 - distance / radius;
      const pullX = deltaX * force * 0.5;
      const pullY = deltaY * force * 0.5;
      springX.set(pullX);
      springY.set(pullY);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  return (
    <motion.div
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        x: springX,
        y: springY,
        position: "absolute",
        background: "rgba(240, 244, 255, 0.5)",
        borderRadius: "50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: 150 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

// --- PRICING COMPONENT LOGIC ---

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => {},
});

export function PricingSection({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you. All plans include our core features and support.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        style={{
          position: "relative",
          width: "100%",
          background: "var(--black)",
          padding: "100px 5%",
        }}
      >
        <InteractiveStarfield
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  color: "var(--white)",
                }}
              >
                SIMPLE PRICING
              </span>
              <div style={{ width: "40px", height: "1px", background: "var(--white)" }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                marginBottom: "16px",
                color: "var(--white)",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-secondary)",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "var(--white-dim)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              {description}
            </p>
          </div>

          <PricingToggle />

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              alignItems: "stretch",
            }}
            className="pricing-grid"
          >
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>

          <style>{`
            @media (max-width: 768px) {
              .pricing-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
              }
              .pricing-card {
                padding: 24px 20px !important;
              }
              .pricing-card h2 {
                font-size: 1.5rem !important;
              }
              .pricing-card .price {
                font-size: 2rem !important;
              }
              .pricing-toggle {
                width: 100% !important;
                padding: 8px !important;
              }
              .pricing-toggle button {
                flex: 1 !important;
                padding: 8px 16px !important;
                font-size: 0.85rem !important;
              }
            }
          `}</style>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);
    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ["#ffffff", "#050810", "#cccccc"],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        ref={confettiRef}
        className="pricing-toggle"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderRadius: "9999px",
          background: "rgba(240, 244, 255, 0.08)",
          padding: "4px",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            borderRadius: "9999px",
            background: "var(--white)",
            padding: "4px",
            ...pillStyle,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          style={{
            position: "relative",
            zIndex: 10,
            borderRadius: "9999px",
            padding: "8px 24px",
            fontSize: "0.875rem",
            fontWeight: 500,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: isMonthly ? "#000000" : "var(--white-dim)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!isMonthly) e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            if (!isMonthly) e.currentTarget.style.color = "var(--white-dim)";
          }}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          style={{
            position: "relative",
            zIndex: 10,
            borderRadius: "9999px",
            padding: "8px 24px",
            fontSize: "0.875rem",
            fontWeight: 500,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: !isMonthly ? "#000000" : "var(--white-dim)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (isMonthly) e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            if (isMonthly) e.currentTarget.style.color = "var(--white-dim)";
          }}
        >
          Annual
          <span
            style={{
              display: "inline-block",
              marginLeft: "4px",
              opacity: !isMonthly ? 0.8 : 1,
            }}
          >
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      style={{
        borderRadius: "16px",
        padding: "36px 28px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: plan.isPopular
          ? "1px solid rgba(255, 255, 255, 0.5)"
          : "1px solid var(--border)",
        boxShadow: plan.isPopular
          ? "0 0 40px rgba(255, 255, 255, 0.15)"
          : "none",
        transform: plan.isPopular ? "scale(1.03)" : "scale(1)",
        background: "rgba(240, 244, 255, 0.02)",
        backdropFilter: "blur(10px)",
      }}
      className="pricing-card"
    >
      {plan.isPopular && (
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #1d6cf6, #3d82ff)",
            borderRadius: "20px",
            padding: "4px 18px",
            fontFamily: "var(--font-primary)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LucideStar size={12} fill="currentColor" />
          <span>MOST POPULAR</span>
        </div>
      )}

      <div style={{ marginBottom: "8px" }}>
        <div
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "1.8rem",
            letterSpacing: "0.06em",
            color: "var(--white)",
          }}
        >
          {plan.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "0.85rem",
            color: "var(--white-dim)",
            marginTop: "4px",
            fontWeight: 300,
          }}
        >
          {plan.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
          margin: "24px 0",
          padding: "20px 0",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "3rem",
            color: "var(--white)",
          }}
        >
          <NumberFlow
            value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
            format={{
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }}
          />
        </span>
        <span
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "0.85rem",
            color: "var(--white-dim)",
          }}
        >
          / {plan.period}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--white-dim)",
          marginTop: "0",
          marginBottom: "16px",
        }}
      >
        {isMonthly ? "Billed Monthly" : "Billed Annually"}
      </p>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
          flex: 1,
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Check size={15} color="#000000" />
            <span
              style={{
                fontFamily: "var(--font-secondary)",
                fontSize: "0.88rem",
                color: "var(--white-dim)",
                fontWeight: 300,
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: plan.isPopular ? "var(--white)" : "transparent",
          color: plan.isPopular ? "#000000" : "var(--white)",
          fontFamily: "var(--font-primary)",
          fontSize: "0.95rem",
          letterSpacing: "0.08em",
          padding: "14px 32px",
          border: plan.isPopular ? "none" : "1px solid var(--border)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          clipPath: "none",
          borderRadius: "8px",
          width: "100%",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          if (plan.isPopular) {
            e.currentTarget.style.background = "var(--white-dim)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.2)";
          } else {
            e.currentTarget.style.background = "var(--white-ghost)";
            e.currentTarget.style.color = "#000000";
          }
        }}
        onMouseLeave={(e) => {
          if (plan.isPopular) {
            e.currentTarget.style.background = "var(--white)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          } else {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--white)";
          }
        }}
      >
        {plan.buttonText}
      </Link>
    </motion.div>
  );
}
