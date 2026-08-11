import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEET UG Counselling 2026 — Simple & Reliable Medical Counselling Portal",
  description: "Official public information portal for NEET UG 2026 counselling, All India MCC counselling, state counselling, MBBS/BDS cutoffs, seat matrix, and documents.",
  keywords: ["NEET UG Counselling 2026", "MCC Counselling", "State Counselling", "NEET Cutoff 2026", "Medical Colleges Seat Matrix"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-textPrimary antialiased">
        {children}
      </body>
    </html>
  );
}
