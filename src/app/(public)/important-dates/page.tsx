"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ExternalLink, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { store } from "@/lib/mockData";
import { ImportantDateItem } from "@/types";
import { formatDate, calculateDateStatus } from "@/lib/utils";

export default function ImportantDatesPage() {
  const [dates, setDates] = useState<ImportantDateItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    const load = () => {
      setDates(store.dates);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filtered = dates.filter((d) => {
    const status = calculateDateStatus(d.start_date, d.end_date);
    if (selectedStatus === "All") return true;
    return status === selectedStatus;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
              Counselling Schedule & Deadlines
            </span>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              Important Counselling Dates 2026
            </h1>
            <p className="text-sm text-brand-textSecondary mt-1">
              Auto-updated timelines for MCC All India Quota and State Medical Admission Boards.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl self-start md:self-auto">
            {["All", "Ongoing", "Upcoming", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStatus === st
                    ? "bg-white text-brand-blue shadow-sm"
                    : "text-slate-600 hover:text-brand-dark"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Table List */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-brand-border rounded-2xl p-12 text-center text-slate-500">
            No events found for status &quot;{selectedStatus}&quot;.
          </div>
        ) : (
          <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {filtered.map((dt) => {
              const status = calculateDateStatus(dt.start_date, dt.end_date);
              return (
                <div
                  key={dt.id}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className="text-xs font-bold text-brand-blue">
                        {dt.authority}
                      </span>
                      {dt.state_slug && (
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {dt.state_slug}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-brand-dark">
                      {dt.event_name}
                    </h3>
                    {dt.description && (
                      <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                        {dt.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-6 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-left md:text-right text-xs">
                      <div className="font-bold text-brand-dark flex items-center space-x-1 md:justify-end">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Start: {formatDate(dt.start_date)}</span>
                      </div>
                      {dt.end_date && (
                        <div className="text-slate-500 font-medium">
                          End: {formatDate(dt.end_date)}
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full ${
                        status === "Ongoing"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : status === "Upcoming"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {status}
                    </span>

                    {dt.official_link && (
                      <a
                        href={dt.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-brand-blue rounded-lg transition-colors"
                        title="Official Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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
