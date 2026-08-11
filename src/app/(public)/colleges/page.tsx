"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Building2, MapPin, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { store } from "@/lib/mockData";
import { CollegeItem, StateItem } from "@/types";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  useEffect(() => {
    const load = () => {
      setColleges(store.colleges);
      setStates(store.states);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filtered = colleges.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchesState =
      selectedState === "All" || c.state_slug === selectedState;
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Govt" ? c.is_govt : !c.is_govt);
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
              Medical Colleges Directory
            </span>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              MBBS Colleges & Institutions
            </h1>
            <p className="text-sm text-brand-textSecondary mt-1">
              Detailed database of Government and Private medical colleges across India.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {["All", "Govt", "Private"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedType === t
                      ? "bg-white text-brand-blue shadow-sm"
                      : "text-slate-600 hover:text-brand-dark"
                  }`}
                >
                  {t === "All" ? "All Types" : t}
                </button>
              ))}
            </div>

            {/* State Select */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              aria-label="Filter by state"
              className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 focus:outline-none focus:border-brand-blue font-semibold text-brand-dark"
            >
              <option value="All">All States</option>
              {states.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search college name or city..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Colleges Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
            No colleges match your search parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-blue hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                        c.is_govt
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {c.is_govt ? "Government" : "Private"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {c.city}, {c.state_slug.toUpperCase()}
                      </span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-lg text-brand-dark group-hover:text-brand-blue transition-colors leading-snug">
                      {c.name}
                    </h3>
                    {c.university && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        Affiliation: {c.university}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-3 bg-slate-50 rounded-xl px-3 border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">MBBS Seats</span>
                      <strong className="text-brand-dark">{c.mbbs_seats} Seats</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Annual Fee</span>
                      <strong className="text-brand-dark">{c.fees_annual || "N/A"}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    NMC: <strong className="text-emerald-600">{c.nmc_status}</strong>
                  </span>
                  <Link
                    href={`/colleges/${c.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-extrabold text-brand-blue hover:text-brand-hover"
                  >
                    <span>View Details</span>
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
