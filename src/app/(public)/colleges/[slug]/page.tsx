import React from "react";
import CollegeDetailClient from "./CollegeDetailClient";
import { store } from "@/lib/mockData";

export const dynamicParams = true;

export function generateStaticParams() {
  return store.colleges.map((c) => ({
    slug: c.slug,
  }));
}

export default function CollegeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CollegeDetailClient slug={params.slug} />;
}
