import type { Metadata } from "next";
import ImportantDatesClient from "./ImportantDatesClient";

export const metadata: Metadata = {
  title: "Important NEET UG Counselling Dates 2026 — Schedule & Deadlines",
  description:
    "Auto-updated NEET UG 2026 counselling schedule. Registration dates, choice filling deadlines, seat allotment result dates, and physical reporting schedules for MCC and state boards.",
  keywords: [
    "NEET Counselling Dates 2026",
    "MCC Choice Filling Schedule",
    "NEET Allotment Result Date",
    "State Medical Registration Start Date",
    "NEET Counselling Schedule PDF",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/important-dates",
  },
  openGraph: {
    title: "Important NEET UG Counselling Dates 2026 — Official Schedule",
    description:
      "Track ongoing and upcoming MCC and state counselling registration deadlines.",
    url: "https://neetugcounselling.in/important-dates",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Important NEET UG Counselling Dates 2026",
    description: "Ongoing & upcoming medical admission schedules.",
  },
};

export default function ImportantDatesPage() {
  return <ImportantDatesClient />;
}
