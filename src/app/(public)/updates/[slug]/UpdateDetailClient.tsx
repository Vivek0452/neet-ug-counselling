"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  Tag,
  ExternalLink,
  FileText,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  slug: string;
  initialUpdate?: UpdateItem | null;
}

export default function UpdateDetailClient({ slug, initialUpdate }: Props) {
  const [updateItem, setUpdateItem] = useState<UpdateItem | null>(initialUpdate || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = () => {
      let decodedSlug = slug;
      try {
        decodedSlug = decodeURIComponent(slug);
      } catch (e) {
        decodedSlug = slug;
      }
      const cleanSlug = (decodedSlug || "").toLowerCase().trim();
      const item = store.updates.find(
        (u) =>
          u &&
          ((u.slug || "").toLowerCase() === cleanSlug ||
            (u.slug || "").toLowerCase() === (slug || "").toLowerCase() ||
            u.id === slug)
      );
      if (item) setUpdateItem(item);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!updateItem) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">Notice / Update Not Found</h1>
        <p className="text-sm text-slate-500">The requested counselling update could not be found or may have been removed.</p>
        <Link
          href="/updates"
          className="inline-flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-brand-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Updates</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Link */}
        <Link
          href="/updates"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Counselling Notices</span>
        </Link>

        {/* Main Article Content */}
        <article className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          {/* Metadata Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {updateItem.category}
              </span>
              {updateItem.state_slug && (
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {updateItem.state_slug}
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-blue bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied Link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Notice</span>
                </>
              )}
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
            {updateItem.title}
          </h1>

          {/* Publisher Details */}
          <div className="flex flex-wrap items-center text-xs text-slate-500 gap-4 border-y border-slate-100 py-3">
            <span className="flex items-center space-x-1.5 font-bold text-brand-dark">
              <Building2 className="w-4 h-4 text-brand-blue" />
              <span>{updateItem.authority}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: {formatDate(updateItem.published_at)}</span>
            </span>
          </div>

          {/* Short Description */}
          {updateItem.short_description && (
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs sm:text-sm font-semibold text-brand-dark leading-relaxed">
              {updateItem.short_description}
            </div>
          )}

          {/* Detailed Content */}
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 pt-2">
            {updateItem.content}
          </div>

          {/* PDF Download and Official Source Action Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            {updateItem.pdf_url && (
              <a
                href={updateItem.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official Gazette PDF</span>
              </a>
            )}

            {updateItem.official_source_url && (
              <a
                href={updateItem.official_source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-brand-dark text-xs font-bold px-4 py-3 rounded-xl transition-all"
              >
                <span>Visit Official Source Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
