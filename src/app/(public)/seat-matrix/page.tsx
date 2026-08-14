import type { Metadata } from "next";
import SeatMatrixClient from "./SeatMatrixClient";

export const metadata: Metadata = {
  title: "MBBS / BDS Category Seat Matrix 2026 — Round & Quota Seat Distribution",
  description:
    "Real-time medical college seat matrix directory. Check available MBBS and BDS seat intake across AIQ 15% quota, 85% state quota, General, OBC, EWS, SC, and ST reserved seats.",
  keywords: [
    "NEET Seat Matrix 2026",
    "MBBS Category Wise Seats",
    "AIQ Seat Intake Medical Colleges",
    "State Quota Reserved Seats",
    "Govt Medical College Vacancy",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/seat-matrix",
  },
  openGraph: {
    title: "MBBS / BDS Category Seat Matrix 2026 — Seat Intake Directory",
    description:
      "Real-time seat intake and vacant seat breakdown across medical colleges in India.",
    url: "https://neetugcounselling.in/seat-matrix",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS / BDS Category Seat Matrix 2026",
    description: "Category and quota seat intake across Indian medical colleges.",
  },
};

export default function SeatMatrixPage() {
  return <SeatMatrixClient />;
}
