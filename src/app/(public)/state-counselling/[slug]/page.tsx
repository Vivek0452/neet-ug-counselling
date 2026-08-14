import type { Metadata } from "next";
import { store } from "@/lib/mockData";
import StateDetailClient from "./StateDetailClient";

interface Props {
  params: { slug: string };
}

function findStateBySlug(slug: string) {
  if (!slug) return null;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
  return (
    store.states.find(
      (s) =>
        s.slug.toLowerCase() === decodedSlug ||
        s.slug.toLowerCase().replace(/-/g, "") === decodedSlug.replace(/-/g, "") ||
        s.name.toLowerCase() === decodedSlug ||
        s.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug ||
        s.id === decodedSlug
    ) || null
  );
}

export async function generateStaticParams() {
  return store.states.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stateData = findStateBySlug(params.slug);

  if (!stateData) {
    return {
      title: "State Medical Counselling | NEET UG 2026",
      description: "State-wise 85% quota NEET UG 2026 medical admission guidelines.",
    };
  }

  const title = `${stateData.name} NEET UG Counselling 2026 — Process, Fees & Eligibility`;
  const description = `${stateData.name} 85% State Quota counselling conducted by ${stateData.counselling_authority}. Official portal: ${stateData.official_website}. Registration, document list, college cutoff ranks, and seat matrix.`;

  return {
    title,
    description,
    keywords: [
      `${stateData.name} NEET UG Counselling 2026`,
      `${stateData.counselling_authority} Registration`,
      `${stateData.name} MBBS Seat Matrix`,
      `${stateData.name} Medical College Cutoff`,
      `${stateData.name} 85% State Quota`,
    ],
    alternates: {
      canonical: `https://neetugcounselling.in/state-counselling/${stateData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neetugcounselling.in/state-counselling/${stateData.slug}`,
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

export default function StateDetailPage({ params }: Props) {
  const stateData = findStateBySlug(params.slug);

  const stateSchema = stateData
    ? {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: `${stateData.name} Medical Counselling Authority`,
        alternateName: stateData.counselling_authority,
        url: stateData.official_website,
        description: `Official state body conducting 85% state quota MBBS/BDS counselling for ${stateData.name}.`,
      }
    : null;

  return (
    <>
      {stateSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(stateSchema) }}
        />
      )}
      <StateDetailClient slug={params.slug} />
    </>
  );
}
