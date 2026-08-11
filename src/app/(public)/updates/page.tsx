"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Pin, FileText, Sparkles, Clock, ArrowRight } from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem, UpdateCategory } from "@/types";
import { formatDate, isNewUpdate } from "@/lib/utils";

export default function AllUpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const load = () => {
      setUpdates(store.updates.filter((u) => u.status === "published"));
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filteredUpdates = updates.filter((u) => {
    const matchesSearch =
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      (u.short_description && u.short_description.toLowerCase().includes(search.toLowerCase())) ||
      u.authority.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || u.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "MCC", "State", "Seat Matrix", "Cutoff"];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            Live Counselling Updates & Notices
          </h1>
          <p className="text-sm text-brand-textSecondary mt-1">
            Real-time published updates from Medical Counselling Committee (MCC) and State Admission Authorities.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-brand-border rounded-2xl p-4 mb-8 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-slate-100 text-brand-textSecondary hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? "All Updates" : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notices, state, authority..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Updates List */}
        {filteredUpdates.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-brand-textSecondary">
            No updates found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((item) => {
              const isNew = isNewUpdate(item.published_at);
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-lg ${
                    item.is_pinned
                      ? "border-blue-300 bg-gradient-to-b from-blue-50/30 to-white"
                      : "border-brand-border hover:border-blue-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        {item.is_pinned && (
                          <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                            <Pin className="w-3 h-3 fill-amber-800" />
                            <span>PINNED</span>
                          </span>
                        )}
                        <span className="bg-slate-100 text-brand-textSecondary text-[11px] font-bold px-2 py-0.5 rounded-md">
                          {item.state_slug ? item.state_slug.toUpperCase() : item.category}
                        </span>
                        {isNew && (
                          <span className="inline-flex items-center space-x-1 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>NEW</span>
                          </span>
                        )}
                      </div>

                      {item.pdf_url && (
                        <span className="inline-flex items-center space-x-1 text-red-600 bg-red-50 text-[11px] font-bold px-2 py-0.5 rounded border border-red-100">
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </span>
                      )}
                    </div>

                    <Link href={`/updates/${item.slug}`} className="block group">
                      <h3 className="font-bold text-base text-brand-dark group-hover:text-brand-blue leading-snug transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    {item.short_description && (
                      <p className="text-xs text-brand-textSecondary leading-relaxed">
                        {item.short_description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(item.published_at)}</span>
                    </div>

                    <Link
                      href={`/updates/${item.slug}`}
                      className="font-bold text-brand-blue hover:text-brand-hover inline-flex items-center space-x-1"
                    >
                      <span>Read Full Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
