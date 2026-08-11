"use client";

import React, { useState, useEffect } from "react";
import { Zap, Search, Filter } from "lucide-react";
import { store } from "@/lib/mockData";
import { SeatMatrixItem, StateItem } from "@/types";

export default function SeatMatrixPage() {
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

  const filtered = matrix.filter((m) => {
    const matchesSearch = m.college_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesState =
      selectedState === "All" || m.state_slug === selectedState;
    const matchesQuota =
      selectedQuota === "All" || m.quota === selectedQuota;
    const matchesCat =
      selectedCategory === "All" || m.category === selectedCategory;
    return matchesSearch && matchesState && matchesQuota && matchesCat;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
            Seat Distribution Matrix
          </span>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            Category Wise Seat Availability
          </h1>
          <p className="text-sm text-brand-textSecondary mt-1">
            Check official seat distribution per college, course, category, and quota round.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search college name..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            aria-label="Filter by state"
            className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 font-medium text-brand-dark focus:outline-none focus:border-brand-blue"
          >
            <option value="All">All States</option>
            {states.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedQuota}
            onChange={(e) => setSelectedQuota(e.target.value)}
            aria-label="Filter by quota"
            className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 font-medium text-brand-dark focus:outline-none focus:border-brand-blue"
          >
            <option value="All">All Quotas</option>
            <option value="AIQ">15% AIQ</option>
            <option value="State Quota">85% State Quota</option>
            <option value="Management">Management Quota</option>
            <option value="NRI">NRI Quota</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
            className="py-2 px-3 text-xs border border-brand-border rounded-xl bg-slate-50 font-medium text-brand-dark focus:outline-none focus:border-brand-blue"
          >
            <option value="All">All Categories</option>
            <option value="General">General / UR</option>
            <option value="OBC">OBC-NCL</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
            No seat matrix records match your filters.
          </div>
        ) : (
          <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
                  <tr>
                    <th className="p-4">Medical College</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Quota</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Round</th>
                    <th className="p-4">Available Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((sm) => (
                    <tr key={sm.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-brand-dark">{sm.college_name}</td>
                      <td className="p-4 font-semibold text-slate-700">{sm.course}</td>
                      <td className="p-4 uppercase font-semibold text-slate-600">{sm.state_slug}</td>
                      <td className="p-4 font-semibold text-slate-700">{sm.quota}</td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {sm.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{sm.round}</td>
                      <td className="p-4 font-black text-emerald-600 text-sm">{sm.available_seats} Seats</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
