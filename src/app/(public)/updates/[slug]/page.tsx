import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { store } from "@/lib/mockData";
import UpdateDetailClient from "./UpdateDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

function findUpdateBySlug(rawSlug?: string) {
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
    store.updates.find(
      (u) =>
        u &&
        ((u.slug || "").toLowerCase() === cleanSlug ||
          (u.slug || "").toLowerCase() === (rawSlug || "").toLowerCase() ||
          u.id === rawSlug)
    ) || null
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParam = params?.slug || "";
  const updateItem = findUpdateBySlug(slugParam);

  if (!updateItem) {
    return {
      title: "Counselling Update | NEET UG 2026",
      description: "Latest NEET UG 2026 counselling updates and official notices.",
    };
  }

  const title = `${updateItem.title} | NEET UG 2026 Update`;
  const description =
    updateItem.short_description ||
    `Official update issued by ${updateItem.authority || "MCC / State Authority"}. Category: ${updateItem.category}. Read complete guidelines and download PDF.`;

  return {
    title,
    description,
    keywords: [
      updateItem.title,
      `${updateItem.authority} Notice 2026`,
      `${updateItem.category} Counselling Update`,
      "NEET UG Latest News",
    ],
    alternates: {
      canonical: `https://neetugcounselling.in/updates/${updateItem.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neetugcounselling.in/updates/${updateItem.slug}`,
      siteName: "NEET UG Counselling 2026",
      type: "article",
      publishedTime: updateItem.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function UpdateDetailPage({ params }: Props) {
  const slugParam = params?.slug || "";
  const updateItem = findUpdateBySlug(slugParam);

  if (!updateItem) {
    notFound();
  }

  const newsArticleSchema = updateItem
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: updateItem.title,
        description: updateItem.short_description || updateItem.title,
        datePublished: updateItem.published_at,
        author: {
          "@type": "Organization",
          name: updateItem.authority || "NEET UG Counselling Board",
          url: updateItem.official_source_url || "https://mcc.nic.in",
        },
        publisher: {
          "@type": "Organization",
          name: "NEET UG Counselling Portal 2026",
          logo: {
            "@type": "ImageObject",
            url: "https://neetugcounselling.in/logo.png",
          },
        },
        mainEntityOfPage: `https://neetugcounselling.in/updates/${updateItem.slug}`,
      }
    : null;

  return (
    <>
      {newsArticleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
        />
      )}
      <UpdateDetailClient slug={slugParam} initialUpdate={updateItem} />
    </>
  );
}
