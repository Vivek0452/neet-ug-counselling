import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { store } from "@/lib/mockData";
import StateDetailClient from "./StateDetailClient";

export const dynamic = "force-static";
export const dynamicParams = true;

interface Props {
  params: { slug: string };
}

function findStateBySlug(rawSlug?: string) {
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
    store.states.find((s) => {
      if (!s) return false;
      const sSlug = (s.slug || "").toLowerCase().trim();
      const sName = (s.name || "").toLowerCase().trim();
      const sId = (s.id || "").toLowerCase().trim();

      return (
        sSlug === cleanSlug ||
        sSlug.replace(/-/g, "") === cleanSlug.replace(/-/g, "") ||
        sName === cleanSlug ||
        sName.replace(/\s+/g, "-") === cleanSlug ||
        sId === cleanSlug
      );
    }) || null
  );
}

export async function generateStaticParams() {
  return store.states
    .filter((s) => s && s.slug)
    .map((s) => ({
      slug: s.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParam = params?.slug || "";
  const stateData = findStateBySlug(slugParam);

  if (!stateData) {
    return {
      title: "State Medical Counselling | NEET UG 2026",
      description: "State-wise 85% quota NEET UG 2026 medical admission guidelines.",
    };
  }

  const title = `${stateData.name} NEET UG Counselling 2026 — Process, Fees & Eligibility`;
  const description = `${stateData.name} 85% State Quota counselling conducted by ${stateData.counselling_authority || "State Medical Board"}. Official portal: ${stateData.official_website || "https://mcc.nic.in"}. Registration, document list, college cutoff ranks, and seat matrix.`;

  return {
    title,
    description,
    keywords: [
      `${stateData.name} NEET UG Counselling 2026`,
      `${stateData.counselling_authority || ""} Registration`,
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
  const slugParam = params?.slug || "";
  const stateData = findStateBySlug(slugParam);

  if (!stateData) {
    notFound();
  }

  let initialUpdates: any[] = [];
  let initialDates: any[] = [];
  let initialColleges: any[] = [];

  if (stateData) {
    const cleanSlug = (stateData.slug || "").toLowerCase().trim();
    const cleanName = (stateData.name || "").toLowerCase().trim();

    const matchState = (targetSlug?: string) => {
      if (!targetSlug) return false;
      const clean = targetSlug.toLowerCase().trim();
      return (
        clean === cleanSlug ||
        clean === cleanName ||
        clean.replace(/-/g, "") === cleanSlug.replace(/-/g, "")
      );
    };

    initialUpdates = store.updates.filter(
      (u) => matchState(u.state_slug) && u.status === "published"
    );
    initialDates = store.dates.filter((d) => matchState(d.state_slug));
    initialColleges = store.colleges.filter((c) => matchState(c.state_slug));
  }

  const stateSchema = stateData
    ? {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: `${stateData.name} Medical Counselling Authority`,
        alternateName: stateData.counselling_authority || stateData.name,
        url: stateData.official_website || "https://mcc.nic.in",
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
      <StateDetailClient
        slug={slugParam}
        initialState={stateData}
        initialUpdates={initialUpdates}
        initialDates={initialDates}
        initialColleges={initialColleges}
      />
    </>
  );
}
