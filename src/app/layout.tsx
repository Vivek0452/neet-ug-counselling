import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1e3a8a", // brand-blue
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://neetugcounselling.in"),
  title: {
    default: "NEET UG Counselling 2026 — All India MCC & State Quota Admission Portal",
    template: "%s | NEET UG Counselling 2026",
  },
  description:
    "Official public information portal for NEET UG 2026 counselling. Real-time MCC All India Quota (15%) notices, 85% state quota rules, MBBS/BDS closing ranks, seat matrix, and document formats.",
  keywords: [
    "NEET UG Counselling 2026",
    "MCC Counselling 2026",
    "NEET Cutoff 2026",
    "All India Quota 15%",
    "State Medical Counselling",
    "MBBS Seat Matrix",
    "Rajasthan NEET Counselling",
    "UP NEET Counselling",
    "Maharashtra CET Cell NEET",
    "KEA Karnataka NEET",
    "Medical College Cutoff Ranks",
    "NEET Registration Date",
  ],
  authors: [{ name: "NEET UG Counselling Information Board", url: "https://neetugcounselling.in" }],
  creator: "NEET UG Counselling Information Portal",
  publisher: "NEET UG Counselling Board",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://neetugcounselling.in",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://neetugcounselling.in",
    siteName: "NEET UG Counselling 2026",
    title: "NEET UG Counselling 2026 — All India MCC & State Quota Portal",
    description:
      "Real-time updates, state counselling guidelines, MBBS/BDS closing cutoffs, category seat matrix, and official document downloads.",
    images: [
      {
        url: "https://neetugcounselling.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NEET UG Counselling 2026 Official Information Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET UG Counselling 2026 — MCC & State Admission Information",
    description:
      "Latest MCC updates, state-wise registration dates, MBBS closing rank cutoffs & seat matrix.",
    images: ["https://neetugcounselling.in/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
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
        <Analytics />
      </body>
    </html>
  );
}
