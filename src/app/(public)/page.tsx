"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeroSearch from "@/components/public/HeroSearch";
import LiveUpdatesFeed from "@/components/public/LiveUpdatesFeed";
import {
  MapPin,
  Calendar,
  FileText,
  Building2,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { StateItem, ImportantDateItem } from "@/types";
import { formatDate, calculateDateStatus } from "@/lib/utils";

export default function HomePage() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [dates, setDates] = useState<ImportantDateItem[]>([]);

  useEffect(() => {
    const load = () => {
      setStates(store.states.filter((s) => s.status === "active").slice(0, 12));
      setDates(store.dates.slice(0, 5));
    };
    load();
    const unsubscribe = store.subscribe(load);
    return () => unsubscribe();
  }, []);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NEET UG Counselling Portal 2026",
    "alternateName": "NEET Medical Admission Information Portal",
    "url": "https://neetugcounselling.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://neetugcounselling.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NEET UG Counselling Information Services",
    "url": "https://neetugcounselling.in",
    "logo": "https://neetugcounselling.in/logo.png",
    "sameAs": [
      "https://mcc.nic.in",
      "https://exams.nta.ac.in/NEET"
    ],
  };

  return (
    <div className="space-y-0">
      {/* Structured Data JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Search Section */}
      <HeroSearch />

      {/* Realtime Live Updates Feed */}
      <LiveUpdatesFeed limit={6} showViewAll={true} />

      {/* State Counselling Quick Grid */}
      <section className="py-14 bg-slate-50 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
                State Admissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                State Wise Counselling Portals
              </h2>
              <p className="text-xs sm:text-sm text-brand-textSecondary mt-1">
                Select your state to view eligibility, registration process, cutoff, and notices.
              </p>
            </div>
            <Link
              href="/state-counselling"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-brand-blue hover:text-brand-hover shrink-0"
            >
              <span>All 28+ States & UTs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* State Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {states.map((st) => (
              <Link
                key={st.id}
                href={`/state-counselling/${st.slug}`}
                className="bg-white border border-brand-border rounded-xl p-4 text-center hover:border-brand-blue hover:shadow-md transition-all group flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-sm group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-brand-dark group-hover:text-brand-blue transition-colors">
                  {st.name}
                </span>
                <span className="text-[10px] text-brand-textSecondary truncate max-w-full">
                  {st.counselling_authority.split("(")[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates Timeline Preview */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
                Timeline & Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                Important Counselling Dates
              </h2>
            </div>
            <Link
              href="/important-dates"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-brand-blue hover:text-brand-hover shrink-0"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-50 border border-brand-border rounded-2xl overflow-hidden divide-y divide-slate-200">
            {dates.map((dt) => {
              const status = calculateDateStatus(dt.start_date, dt.end_date);
              return (
                <div
                  key={dt.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-brand-blue">
                        {dt.authority}
                      </span>
                      {dt.state_slug && (
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {dt.state_slug.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-brand-dark text-base">
                      {dt.event_name}
                    </h3>
                    {dt.description && (
                      <p className="text-xs text-brand-textSecondary">
                        {dt.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 justify-between sm:justify-end">
                    <div className="text-right text-xs">
                      <div className="font-semibold text-brand-dark">
                        {formatDate(dt.start_date)}
                      </div>
                      {dt.end_date && (
                        <div className="text-slate-500">
                          to {formatDate(dt.end_date)}
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        status === "Ongoing"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse"
                          : status === "Upcoming"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Essential Tools for Aspirants
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Everything you need to analyze cutoffs, check seat availability, and download official formats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/colleges"
              className="bg-slate-800/80 border border-slate-700 hover:border-brand-blue rounded-2xl p-6 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Medical Colleges
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Directory of Government and Private MBBS colleges with seat matrix, fees & bond details.
              </p>
              <span className="text-xs font-bold text-brand-blue inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/cutoff"
              className="bg-slate-800/80 border border-slate-700 hover:border-brand-blue rounded-2xl p-6 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Opening & Closing Cutoff
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Search round-wise closing ranks for General, OBC, SC, ST & EWS categories.
              </p>
              <span className="text-xs font-bold text-emerald-400 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Check Cutoffs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/seat-matrix"
              className="bg-slate-800/80 border border-slate-700 hover:border-brand-blue rounded-2xl p-6 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Category Seat Matrix
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Explore available seats by college, state quota, AIQ, and counseling round.
              </p>
              <span className="text-xs font-bold text-amber-400 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>View Seat Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/documents"
              className="bg-slate-800/80 border border-slate-700 hover:border-brand-blue rounded-2xl p-6 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Document Formats
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Download central OBC-NCL, EWS, Domicile formats, and admission checklists.
              </p>
              <span className="text-xs font-bold text-purple-400 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Download PDFs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
