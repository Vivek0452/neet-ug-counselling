import type { Metadata } from "next";
import { store } from "@/lib/mockData";
import CollegeDetailClient from "./CollegeDetailClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return store.colleges.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug).toLowerCase();
  const college = store.colleges.find(
    (c) =>
      c.slug.toLowerCase() === decodedSlug ||
      c.slug.toLowerCase() === params.slug.toLowerCase() ||
      c.id === params.slug
  );

  if (!college) {
    return {
      title: "Medical College Details | NEET UG Counselling 2026",
      description: "Find medical college MBBS seats, annual fees, and cutoff ranks.",
    };
  }

  const title = `${college.name} — MBBS Seats, Fees, Cutoff & Bond 2026`;
  const description = `${college.name} in ${college.city}, ${college.state_slug.toUpperCase()}. Total MBBS Seats: ${college.mbbs_seats}, Annual Fees: ${college.fees_annual || "N/A"}, Hostel: ${college.hostel_available ? "Yes" : "No"}, NMC Status: ${college.nmc_status}. Check NEET UG category closing ranks.`;

  return {
    title,
    description,
    keywords: [
      college.name,
      `${college.name} MBBS Cutoff`,
      `${college.name} Seat Matrix`,
      `${college.name} Fees Structure`,
      `${college.city} Medical College`,
      `${college.state_slug.toUpperCase()} NEET Counselling`,
    ],
    alternates: {
      canonical: `https://neetugcounselling.in/colleges/${college.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neetugcounselling.in/colleges/${college.slug}`,
      siteName: "NEET UG Counselling 2026",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CollegeDetailPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug).toLowerCase();
  const college = store.colleges.find(
    (c) =>
      c.slug.toLowerCase() === decodedSlug ||
      c.slug.toLowerCase() === params.slug.toLowerCase() ||
      c.id === params.slug
  );

  const collegeSchema = college
    ? {
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: college.name,
        url: `https://neetugcounselling.in/colleges/${college.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: college.city,
          addressRegion: college.state_slug.toUpperCase(),
          addressCountry: "IN",
        },
        description: `Medical institution offering MBBS degree with ${college.mbbs_seats} seats under NMC status ${college.nmc_status}.`,
      }
    : null;

  return (
    <>
      {collegeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }}
        />
      )}
      <CollegeDetailClient slug={params.slug} />
    </>
  );
}
