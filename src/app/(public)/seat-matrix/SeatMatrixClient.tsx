"use client";

import React, { useState, useEffect } from "react";
import { Zap, Search, Filter } from "lucide-react";
import { store } from "@/lib/mockData";
import { SeatMatrixItem, StateItem } from "@/types";

export default function SeatMatrixClient() {
  const [matrix, setMatrix] = useState<SeatMatrixItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);

  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedQuota, setSelectedQuota] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const load = () => {
      setMatrix(store.seatMatrix);
      setStates(store.states);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filtered = matrix.filter((item) => {
    const matchesSearch = item.college_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesState =
      selectedState === "All" || item.state_slug === selectedState;
    const matchesQuota =
      selectedQuota === "All" || item.quota === selectedQuota;
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesState && matchesQuota && matchesCategory;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
            Category Seat Intake & Vacancy
          </span>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            MBBS / BDS Category Seat Matrix 2026
          </h1>
          <p className="text-sm text-brand-textSecondary mt-1">
            Real-time seat distribution across rounds, quotas, and reserved categories in medical colleges.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* State Filter */}
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

            {/* Quota Filter */}
            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              aria-label="Filter by quota"
              className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 focus:outline-none focus:border-brand-blue font-semibold text-brand-dark"
            >
              <option value="All">All Quotas</option>
              <option value="AIQ">AIQ (15%)</option>
              <option value="State Quota">State Quota (85%)</option>
              <option value="Management">Management</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 focus:outline-none focus:border-brand-blue font-semibold text-brand-dark"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="EWS">EWS</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search college name..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Seat Matrix Table */}
        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No seat matrix records found for selected criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-brand-dark border-b border-brand-border">
                  <tr>
                    <th className="p-4">Medical College</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Quota</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Round</th>
                    <th className="p-4 text-right">Available Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-extrabold text-brand-dark">
                        {item.college_name}
                      </td>
                      <td className="p-4 font-bold text-slate-700">{item.course}</td>
                      <td className="p-4 font-semibold uppercase text-slate-500">
                        {item.state_slug}
                      </td>
                      <td className="p-4 font-bold text-brand-blue">{item.quota}</td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-slate-600">{item.round}</td>
                      <td className="p-4 text-right font-black text-brand-blue text-sm">
                        {item.available_seats} Seats
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
