"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Building2, FileText, BellRing, Calendar, ArrowRight } from "lucide-react";
import { store } from "@/lib/mockData";
import { SearchResultItem } from "@/types";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const list: SearchResultItem[] = [];

    // Search Updates
    store.updates
      .filter(
        (u) =>
          u.status === "published" &&
          (u.title.toLowerCase().includes(q) ||
            u.content.toLowerCase().includes(q) ||
            u.authority.toLowerCase().includes(q))
      )
      .forEach((u) => {
        list.push({
          id: u.id,
          title: u.title,
          type: "update",
          url: `/updates/${u.slug}`,
          snippet: u.short_description || u.authority,
          categoryOrState: u.category,
        });
      });

    // Search States
    store.states
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.counselling_authority.toLowerCase().includes(q)
      )
      .forEach((s) => {
        list.push({
          id: s.id,
          title: `${s.name} NEET UG Counselling`,
          type: "state",
          url: `/state-counselling/${s.slug}`,
          snippet: s.counselling_authority,
          categoryOrState: "State",
        });
      });

    // Search Colleges
    store.colleges
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.state_slug.toLowerCase().includes(q)
      )
      .forEach((c) => {
        list.push({
          id: c.id,
          title: c.name,
          type: "college",
          url: `/colleges/${c.slug}`,
          snippet: `${c.city}, ${c.state_slug.toUpperCase()} • ${c.is_govt ? "Government" : "Private"}`,
          categoryOrState: "College",
        });
      });

    // Search Documents
    store.documents
      .filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          (d.description && d.description.toLowerCase().includes(q))
      )
      .forEach((d) => {
        list.push({
          id: d.id,
          title: d.title,
          type: "document",
          url: "/documents",
          snippet: d.description || d.category,
          categoryOrState: d.category,
        });
      });

    setResults(list);
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative max-w-2xl mx-auto"
        >
          <Search className="w-5 h-5 text-brand-blue absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search updates, states, colleges, or documents..."
            className="w-full pl-12 pr-4 py-3 text-sm text-brand-dark border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50 focus:bg-white shadow-inner"
          />
        </form>
      </div>

      {/* Results List */}
      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
          Search Results ({results.length})
        </h2>

        {results.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
            {query.trim()
              ? `No results found for "${query}". Try searching another term like "Rajasthan", "MCC", "Seats", or "MAMC".`
              : "Enter a keyword above to search the entire portal."}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="bg-white border border-brand-border hover:border-brand-blue rounded-2xl p-5 block transition-all hover:shadow-md group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {item.type === "update" && <BellRing className="w-5 h-5" />}
                      {item.type === "state" && <MapPin className="w-5 h-5" />}
                      {item.type === "college" && <Building2 className="w-5 h-5" />}
                      {item.type === "document" && <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        {item.categoryOrState && (
                          <span className="text-[10px] font-bold text-brand-blue">
                            {item.categoryOrState}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-base text-brand-dark group-hover:text-brand-blue transition-colors">
                        {item.title}
                      </h3>
                      {item.snippet && (
                        <p className="text-xs text-slate-500 mt-1">{item.snippet}</p>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0 mt-3" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            Portal Global Search
          </h1>
          <p className="text-sm text-brand-textSecondary mt-1">
            Instant search across counselling updates, states, medical colleges, cutoffs, and documents.
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading search...</div>}>
          <SearchResultsContent />
        </Suspense>
      </div>
    </div>
  );
}
