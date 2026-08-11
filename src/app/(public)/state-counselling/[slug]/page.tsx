import React from "react";
import StateDetailClient from "./StateDetailClient";
import { store } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return store.states.map((s) => ({
    slug: s.slug,
  }));
}

export default function StateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <StateDetailClient slug={params.slug} />;
}
