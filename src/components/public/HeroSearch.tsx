"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, MapPin, Building2, BellRing, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-brand-dark text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Year Tag */}
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>NEET UG Counselling Season 2026</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          NEET UG Counselling 2026
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Simple and reliable information for NEET UG medical counselling.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-6">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white p-1.5">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5 text-brand-blue" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search counselling, college, state or update..."
              className="w-full py-3 px-3 text-sm text-brand-dark placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-hover text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center space-x-1.5 shrink-0 shadow-md"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Action Buttons & Quick Search Tags */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Link
            href="/updates"
            className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/25"
          >
            <BellRing className="w-4 h-4" />
            <span>Latest Updates</span>
          </Link>

          <Link
            href="/state-counselling"
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <MapPin className="w-4 h-4 text-blue-300" />
            <span>State Counselling</span>
          </Link>

          <Link
            href="/mcc-counselling"
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Building2 className="w-4 h-4 text-blue-300" />
            <span>MCC All India Quota</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
