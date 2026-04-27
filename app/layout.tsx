import type { Metadata } from "next";
import "./globals.css";
import { Share_Tech, Titillium_Web } from "next/font/google";

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Opal — The Future of Task Management",
  description:
    "Opal transforms how you manage work. One intelligent platform for tasks, teams, and timelines — built for people who ship things that matter.",
  keywords: ["task management", "productivity", "team collaboration", "AI"],
  openGraph: {
    title: "Opal — The Future of Task Management",
    description:
      "Opal transforms how you manage work. One intelligent platform for tasks, teams, and timelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${shareTech.variable} ${titilliumWeb.variable}`}>
      <body suppressHydrationWarning className={`${shareTech.className} ${titilliumWeb.className}`}>{children}</body>
    </html>
  );
}
