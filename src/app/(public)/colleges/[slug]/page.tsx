import type { Metadata } from "next";
import { store } from "@/lib/mockData";
import CollegeDetailClient from "./CollegeDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
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

  try {
    return (
      (store?.colleges || []).find(
        (c) =>
          c &&
          ((c.slug || "").toLowerCase() === cleanSlug ||
            (c.slug || "").toLowerCase() === (rawSlug || "").toLowerCase() ||
            c.id === rawSlug)
      ) || null
    );
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slugParam = params?.slug || "";
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
  } catch (e) {
    return {
      title: "Medical College Details | NEET UG Counselling 2026",
      description: "Find medical college MBBS seats, annual fees, and cutoff ranks.",
    };
  }
}

export default function CollegeDetailPage({ params }: Props) {
  try {
    const slugParam = params?.slug || "";
    const college = findCollegeBySlug(slugParam);

    let initialCutoffs: any[] = [];
    let initialSeats: any[] = [];

    if (college) {
      try {
        initialCutoffs = (store?.cutoffs || []).filter(
          (k) =>
            k &&
            (k.college_id === college.id ||
              k.college_name?.toLowerCase() === college.name?.toLowerCase())
        );
        initialSeats = (store?.seatMatrix || []).filter(
          (s) =>
            s &&
            (s.college_id === college.id ||
              s.college_name?.toLowerCase() === college.name?.toLowerCase())
        );
      } catch (e) {
        console.error("Filter error:", e);
      }
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
            addressRegion: (college.state_slug || "").toUpperCase(),
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
  } catch (err) {
    console.error("CollegeDetailPage rendering fallback caught:", err);
    return (
      <CollegeDetailClient
        slug={params?.slug || ""}
        initialCollege={null}
        initialCutoffs={[]}
        initialSeats={[]}
      />
    );
  }
}
