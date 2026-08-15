import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { store } from "@/lib/mockData";
import CollegeDetailClient from "./CollegeDetailClient";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

async function getSlug(params: Props["params"]): Promise<string> {
  if (!params) return "";
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  return resolvedParams?.slug || "";
}

function findCollegeBySlug(rawSlug?: string) {
  if (!rawSlug) return null;
  let decodedSlug = rawSlug;
  try {
    decodedSlug = decodeURIComponent(rawSlug);
  } catch (e) {
    decodedSlug = rawSlug;
  }
  const cleanSlug = (decodedSlug || "").toLowerCase().trim();
  if (!cleanSlug) return null;

  return (
    store.colleges.find(
      (c) =>
        c &&
        ((c.slug || "").toLowerCase() === cleanSlug ||
          (c.slug || "").toLowerCase() === (rawSlug || "").toLowerCase() ||
          c.id === rawSlug)
    ) || null
  );
}

export async function generateStaticParams() {
  return store.colleges
    .filter((c) => c && c.slug)
    .map((c) => ({
      slug: c.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParam = await getSlug(params);
  const college = findCollegeBySlug(slugParam);

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

export default async function CollegeDetailPage({ params }: Props) {
  const slugParam = await getSlug(params);
  const college = findCollegeBySlug(slugParam);

  if (!college) {
    notFound();
  }

  let initialCutoffs: any[] = [];
  let initialSeats: any[] = [];

  if (college) {
    initialCutoffs = store.cutoffs.filter(
      (k) =>
        k.college_id === college.id ||
        k.college_name.toLowerCase() === college.name.toLowerCase()
    );
    initialSeats = store.seatMatrix.filter(
      (s) =>
        s.college_id === college.id ||
        s.college_name.toLowerCase() === college.name.toLowerCase()
    );
  }

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
      <CollegeDetailClient
        slug={slugParam}
        initialCollege={college}
        initialCutoffs={initialCutoffs}
        initialSeats={initialSeats}
      />
    </>
  );
}
