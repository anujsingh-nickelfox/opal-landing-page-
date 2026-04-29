import type { Metadata } from "next";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
