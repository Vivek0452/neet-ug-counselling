import type { Metadata } from "next";
import MccClient from "./MccClient";

export const metadata: Metadata = {
  title: "MCC NEET UG Counselling 2026 — 15% AIQ, Deemed & Central Universities Guide",
  description:
    "Complete registration guide for Medical Counselling Committee (MCC) 15% All India Quota (AIQ), AIIMS, JIPMER, Central Universities, and Deemed Universities MBBS/BDS admissions.",
  keywords: [
    "MCC NEET Counselling 2026",
    "All India Quota 15 Percent",
    "mcc.nic.in Registration",
    "Deemed University MBBS Admission",
    "MCC Security Deposit Refund",
    "AIIMS NEET Counselling",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/mcc-counselling",
  },
  openGraph: {
    title: "MCC NEET UG Counselling 2026 — AIQ & Central Universities",
    description:
      "Step-by-step registration, choice filling, fee details, and FAQs for MCC All India Quota.",
    url: "https://neetugcounselling.in/mcc-counselling",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCC NEET UG Counselling 2026 Guide",
    description: "MCC 15% AIQ, Deemed Universities fee structure and allotment process.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I exit in Round 1 without penalty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MCC Round 1 has Free Exit. Security deposit will not be forfeited if you do not report to the allotted college.",
      },
    },
    {
      "@type": "Question",
      name: "Is the security deposit refundable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you join the allotted seat or do not get any seat after counselling rounds, security deposit is refunded to the same bank account.",
      },
    },
  ],
};

export default function MccCounsellingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MccClient />
    </>
  );
}
