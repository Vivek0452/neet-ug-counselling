import type { Metadata } from "next";
import UpdatesClient from "./UpdatesClient";

export const metadata: Metadata = {
  title: "Latest NEET UG Counselling Updates 2026 — Official MCC & State Notices",
  description:
    "Real-time notifications, schedule extensions, reporting rules, registration dates, and security fee refund updates published by MCC and State Medical Counselling Authorities.",
  keywords: [
    "NEET UG Updates 2026",
    "MCC Official Notice",
    "State Counselling Announcement",
    "NEET Allotment Letter Release",
    "Stray Vacancy Round Notice",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/updates",
  },
  openGraph: {
    title: "Latest NEET UG Counselling Updates 2026 — MCC & State Notices",
    description:
      "Real-time official announcements, schedule releases, and allotment updates for NEET UG 2026.",
    url: "https://neetugcounselling.in/updates",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest NEET UG Counselling Updates 2026",
    description: "Official notifications from MCC & state medical admission bodies.",
  },
};

export default function UpdatesPage() {
  return <UpdatesClient />;
}
