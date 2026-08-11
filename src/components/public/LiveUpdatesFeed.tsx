"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Pin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Download,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem } from "@/types";
import { formatDate, formatDateTime, isNewUpdate } from "@/lib/utils";

interface LiveUpdatesFeedProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function LiveUpdatesFeed({
  limit = 6,
  showViewAll = true,
}: LiveUpdatesFeedProps) {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    const fetchUpdates = () => {
      // Sort pinned first, then by published_at DESC
      const published = store.updates
        .filter((u) => u.status === "published")
        .sort((a, b) => {
          if (a.is_pinned && !b.is_pinned) return -1;
          if (!a.is_pinned && b.is_pinned) return 1;
          return (
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
          );
        });

      setUpdates(published.slice(0, limit));
    };

    fetchUpdates();
    const unsubscribe = store.subscribe(fetchUpdates);
    return () => unsubscribe();
  }, [limit]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-brand-border gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-blue font-bold text-xs uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
              <span>Real-Time Notifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              Latest Counselling Updates
            </h2>
          </div>
          {showViewAll && (
            <Link
              href="/updates"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-brand-blue hover:text-brand-hover group"
            >
              <span>View All Updates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Updates Grid */}
        {updates.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500">
            No updates available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((item) => {
              const isNew = isNewUpdate(item.published_at);
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col justify-between bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg ${
                    item.is_pinned
                      ? "border-blue-300 bg-gradient-to-b from-blue-50/40 to-white"
                      : "border-brand-border hover:border-blue-200"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Badges & Meta */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        {item.is_pinned && (
                          <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                            <Pin className="w-3 h-3 fill-amber-800" />
                            <span>PINNED</span>
                          </span>
                        )}
                        <span className="bg-slate-100 text-brand-textSecondary text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                          {item.state_slug
                            ? item.state_slug.toUpperCase()
                            : item.category}
                        </span>
                        {isNew && (
                          <span className="inline-flex items-center space-x-1 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>NEW</span>
                          </span>
                        )}
                      </div>

                      {item.pdf_url && (
                        <div
                          title="Official Document Attached"
                          className="inline-flex items-center space-x-1 text-red-600 bg-red-50 text-[11px] font-bold px-2 py-0.5 rounded-md border border-red-100"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <Link
                      href={`/updates/${item.slug}`}
                      className="block group"
                    >
                      <h3 className="font-bold text-base text-brand-dark group-hover:text-brand-blue leading-snug transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    {item.short_description && (
                      <p className="text-xs text-brand-textSecondary line-clamp-2 leading-relaxed">
                        {item.short_description}
                      </p>
                    )}
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(item.published_at)}</span>
                    </div>

                    <Link
                      href={`/updates/${item.slug}`}
                      className="font-bold text-brand-blue hover:text-brand-hover inline-flex items-center space-x-1 text-xs"
                    >
                      <span>Read Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
