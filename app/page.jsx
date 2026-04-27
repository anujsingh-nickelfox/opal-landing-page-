"use client";

import dynamic from "next/dynamic";

const LandingContent = dynamic(() => import("./LandingContent"), {
  ssr: false,
  loading: () => <div style={{ background: "#050810", minHeight: "100vh" }} />,
});

export default function OpalLandingPage() {
  return <LandingContent />;
}
