import React from "react";
import StateDetailClient from "./StateDetailClient";
import { store } from "@/lib/mockData";

export const dynamicParams = true;

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
