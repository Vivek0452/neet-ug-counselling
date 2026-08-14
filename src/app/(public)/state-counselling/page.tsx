import type { Metadata } from "next";
import StateCounsellingClient from "./StateCounsellingClient";

export const metadata: Metadata = {
  title: "State Wise NEET UG Counselling 2026 Portals & Registration Guidelines",
  description:
    "Official 85% state quota medical counselling authorities across Indian states (Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, Delhi). Registration links, eligibility, document checklists, and counselling procedures.",
  keywords: [
    "State NEET UG Counselling 2026",
    "85 Percent State Quota",
    "Rajasthan Medical Counselling",
    "UP NEET Counselling Portal",
    "KEA NEET Admission",
    "Maharashtra CET Cell NEET",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/state-counselling",
  },
  openGraph: {
    title: "State Wise NEET UG Counselling 2026 Portals & Rules",
    description:
      "Direct links to state medical admission portals, eligibility rules, and registration schedules.",
    url: "https://neetugcounselling.in/state-counselling",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "State Wise NEET UG Counselling 2026 Portals",
    description: "State medical authority official links and eligibility criteria.",
  },
};

export default function StateCounsellingPage() {
  return <StateCounsellingClient />;
}
