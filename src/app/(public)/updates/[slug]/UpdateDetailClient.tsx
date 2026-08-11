"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Building2,
  ExternalLink,
  FileText,
  Download,
  CheckCircle,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem } from "@/types";
import { formatDateTime } from "@/lib/utils";

export default function UpdateDetailClient({ slug }: { slug: string }) {
  const [updateItem, setUpdateItem] = useState<UpdateItem | null>(null);

  useEffect(() => {
    if (!slug) return;
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    const item = store.updates.find(
      (u) => u.slug.toLowerCase() === decodedSlug || u.slug.toLowerCase() === slug.toLowerCase()
    );
    if (item) setUpdateItem(item);
  }, [slug]);

  if (!updateItem) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">Notice Not Found</h1>
        <p className="text-sm text-slate-500">The update you are looking for may have been archived or removed.</p>
        <Link
          href="/updates"
          className="inline-flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Updates</span>
        </Link>
      </div>
    );
  }

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": updateItem.title,
    "description": updateItem.short_description || updateItem.title,
    "datePublished": updateItem.published_at,
    "author": {
      "@type": "Organization",
      "name": updateItem.authority || "NEET UG Counselling Board",
      "url": updateItem.official_source_url || "https://mcc.nic.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEET UG Counselling Portal 2026",
      "logo": {
        "@type": "ImageObject",
        "url": "https://neetugcounselling.in/logo.png"
      }
    },
    "mainEntityOfPage": `https://neetugcounselling.in/updates/${updateItem.slug}`
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/updates"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Updates</span>
        </Link>

        <article className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center flex-wrap gap-2">
            <span className="bg-blue-100 text-brand-blue text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
              {updateItem.category}
            </span>
            {updateItem.state_slug && (
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-md uppercase">
                {updateItem.state_slug}
              </span>
            )}
            {updateItem.round && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md">
                {updateItem.round}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
            {updateItem.title}
          </h1>

          <div className="flex items-center flex-wrap gap-4 text-xs text-slate-500 py-3 border-y border-slate-100">
            <div className="flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Authority: <strong className="text-brand-dark">{updateItem.authority}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: <strong className="text-brand-dark">{formatDateTime(updateItem.published_at)}</strong></span>
            </div>
          </div>

          {updateItem.official_source_name && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500">Official Source: </span>
                  <strong className="text-brand-dark font-bold">{updateItem.official_source_name}</strong>
                </div>
              </div>
              {updateItem.official_source_url && (
                <a
                  href={updateItem.official_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Visit Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          <div className="prose max-w-none text-slate-800 text-sm leading-relaxed space-y-4 whitespace-pre-line pt-2">
            {updateItem.content}
          </div>

          {updateItem.pdf_url && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 mt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-red-950">Official PDF Notification Attached</h4>
                  <p className="text-xs text-red-700">Download official PDF issued by authority</p>
                </div>
              </div>
              <a
                href={updateItem.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF</span>
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
