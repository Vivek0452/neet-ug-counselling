import React from "react";
import UpdateDetailClient from "./UpdateDetailClient";
import { store } from "@/lib/mockData";

export const dynamicParams = true;

export function generateStaticParams() {
  return store.updates.map((u) => ({
    slug: u.slug,
  }));
}

export default function UpdateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <UpdateDetailClient slug={params.slug} />;
}
