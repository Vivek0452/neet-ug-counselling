"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { store } from "@/lib/mockData";
import { StateItem } from "@/types";

export default function StateCounsellingClient() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = () => {
      setStates(store.states);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filtered = states.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.counselling_authority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
              85% State Quota Admissions
            </span>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              State Wise NEET UG Counselling Portals
            </h1>
            <p className="text-sm text-brand-textSecondary mt-1">
              Find official registration portals, state authority websites, eligibility rules, and dates for all Indian states & UTs.
            </p>
          </div>

          {/* Search box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search state (e.g. Rajasthan, Delhi)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue shadow-sm bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* State Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
            No state found matching &quot;{search}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((st) => (
              <div
                key={st.id}
                className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue hover:shadow-lg transition-all group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-lg group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {st.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                      {st.counselling_authority}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={st.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-slate-500 hover:text-brand-blue inline-flex items-center space-x-1"
                    title="Official Website"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href={`/state-counselling/${st.slug}`}
                    className="text-xs font-extrabold text-brand-blue hover:text-brand-hover inline-flex items-center space-x-1"
                  >
                    <span>State Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
