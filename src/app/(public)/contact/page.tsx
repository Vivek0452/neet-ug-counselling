import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact NEET UG Counselling Helpdesk — Student & Parent Support",
  description:
    "Get assistance with NEET UG 2026 counselling registration, domicile eligibility rules, security deposit refunds, and document verification.",
  keywords: [
    "NEET Counselling Helpdesk",
    "MCC Support Contact",
    "Medical Counselling Query",
    "NEET Security Deposit Refund Help",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/contact",
  },
  openGraph: {
    title: "Contact NEET UG Counselling Helpdesk",
    description: "Send your NEET UG counselling queries to our support team.",
    url: "https://neetugcounselling.in/contact",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NEET UG Counselling Helpdesk",
    description: "Student & Parent helpline for medical admission guidance.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
