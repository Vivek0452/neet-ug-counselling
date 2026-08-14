import type { Metadata } from "next";
import CutoffClient from "./CutoffClient";

export const metadata: Metadata = {
  title: "NEET UG Cutoff Ranks 2026 — Category-Wise Closing Ranks (AIQ & State)",
  description:
    "Explore historical and expected NEET UG MBBS/BDS closing ranks. Filter by college name, General, OBC, EWS, SC, ST category, AIQ 15% quota, and 85% state quota.",
  keywords: [
    "NEET Cutoff 2026",
    "MBBS Closing Rank",
    "NEET AIQ Cutoff Ranks",
    "NEET Category Wise Cutoff",
    "General Category MBBS Cutoff",
    "OBC NEET Cutoff Rank",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/cutoff",
  },
  openGraph: {
    title: "NEET UG Cutoff Ranks 2026 — Category Closing Ranks",
    description:
      "Filter AIQ and State Quota NEET closing ranks for Government & Private medical colleges.",
    url: "https://neetugcounselling.in/cutoff",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET UG Cutoff Ranks 2026",
    description: "Category-wise medical college closing ranks directory.",
  },
};

export default function CutoffPage() {
  return <CutoffClient />;
}
