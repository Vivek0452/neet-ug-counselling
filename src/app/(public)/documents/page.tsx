import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const metadata: Metadata = {
  title: "Official NEET UG Counselling Documents & Certificate Formats PDF",
  description:
    "Download official medical admission certificate formats (OBC-NCL, EWS, Domicile, PwD, NRI Annexure), allotment letter checklists, and bond affidavit formats.",
  keywords: [
    "NEET Counselling Document Checklist",
    "OBC NCL Format NEET UG",
    "EWS Certificate Format Medical Admission",
    "Domicile Certificate Rules",
    "NEET Allotment Document Checklist PDF",
  ],
  alternates: {
    canonical: "https://neetugcounselling.in/documents",
  },
  openGraph: {
    title: "NEET UG Counselling Official Document Downloads PDF",
    description:
      "Direct PDF downloads for official category certificate formats, domicile rules, and reporting document checklists.",
    url: "https://neetugcounselling.in/documents",
    siteName: "NEET UG Counselling 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET UG Counselling Document Downloads PDF",
    description: "Official certificate formats & reporting document checklist.",
  },
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}
