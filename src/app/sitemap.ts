import { MetadataRoute } from "next";
import { store } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neetugcounselling.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/updates`, lastModified: new Date() },
    { url: `${baseUrl}/mcc-counselling`, lastModified: new Date() },
    { url: `${baseUrl}/state-counselling`, lastModified: new Date() },
    { url: `${baseUrl}/colleges`, lastModified: new Date() },
    { url: `${baseUrl}/cutoff`, lastModified: new Date() },
    { url: `${baseUrl}/seat-matrix`, lastModified: new Date() },
    { url: `${baseUrl}/important-dates`, lastModified: new Date() },
    { url: `${baseUrl}/documents`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const updateRoutes: MetadataRoute.Sitemap = store.updates.map((u) => ({
    url: `${baseUrl}/updates/${u.slug}`,
    lastModified: new Date(u.published_at),
  }));

  const stateRoutes: MetadataRoute.Sitemap = store.states.map((s) => ({
    url: `${baseUrl}/state-counselling/${s.slug}`,
    lastModified: new Date(),
  }));

  const collegeRoutes: MetadataRoute.Sitemap = store.colleges.map((c) => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...updateRoutes, ...stateRoutes, ...collegeRoutes];
}
