import type { Metadata } from "next";
import CollegesClient from "./CollegesClient";

export const metadata: Metadata = {
  title: "All Medical Colleges Directory 2026 — Govt & Private MBBS Seats & Fees",
  description:
    "Comprehensive database of Government and Private medical colleges across India. Search by state, MBBS seat capacity, annual tuition fees, NMC recognition status, service bond, and stipend amount.",
  keywords: [
    "Medical Colleges Directory India",
    "Govt MBBS Colleges List",
    "Private Medical College Fees",
    "NMC Recognized Colleges",
    "NEET College Predictor Directory",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/colleges",
  },
  openGraph: {
    title: "All Medical Colleges Directory 2026 — MBBS Seats & Fees",
    description:
      "Search Govt & Private medical colleges by state, tuition fees, MBBS seat intake, and bond conditions.",
    url: "https://neetugcounselling.in/colleges",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Medical Colleges Directory 2026",
    description: "Govt & Private medical college fee structures and seat matrix.",
  },
};

export default function CollegesPage() {
  return <CollegesClient />;
}
