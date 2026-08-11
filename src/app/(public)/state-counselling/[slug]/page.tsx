"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  Building2,
  FileText,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { StateItem, UpdateItem, ImportantDateItem, CollegeItem } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StateDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;

  const [stateData, setStateData] = useState<StateItem | null>(null);
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [dates, setDates] = useState<ImportantDateItem[]>([]);
  const [colleges, setColleges] = useState<CollegeItem[]>([]);

  useEffect(() => {
    if (!rawSlug) return;
    const decodedSlug = decodeURIComponent(rawSlug).toLowerCase();
    const st = store.states.find(
      (s) => s.slug.toLowerCase() === decodedSlug || s.slug.toLowerCase() === rawSlug.toLowerCase()
    );
    if (st) {
      setStateData(st);
      setUpdates(store.updates.filter((u) => u.state_slug === st.slug && u.status === "published"));
      setDates(store.dates.filter((d) => d.state_slug === st.slug));
      setColleges(store.colleges.filter((c) => c.state_slug === st.slug));
    }
  }, [rawSlug]);

  if (!stateData) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">State Information Not Found</h1>
        <p className="text-sm text-slate-500">No counselling details found for this state in our directory.</p>
        <Link
          href="/state-counselling"
          className="inline-flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All States</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/state-counselling"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to State Directory</span>
        </Link>

        {/* State Banner Header */}
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>State Medical & Dental Admissions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              {stateData.name} NEET UG Counselling 2026
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Counselling Authority: <strong className="text-brand-dark">{stateData.counselling_authority}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={stateData.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-brand-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {stateData.registration_link && (
              <a
                href={stateData.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <span>Register Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <span>Eligibility Criteria</span>
              </h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {stateData.eligibility || "Standard state domicile criteria applies as notified by authority."}
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span>Counselling & Admission Process</span>
              </h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                {stateData.counselling_process || "Online registration -> Merit List -> Choice Filling -> Seat Allotment -> Reporting."}
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>Application Fee & Security Deposit</span>
              </h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {stateData.fees_info || "Registration and security deposit fees as prescribed by state government."}
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-brand-dark flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Documents Required</span>
              </h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {stateData.documents_required || "NEET UG Scorecard, Class 10/12 Marksheet, Domicile, Caste certificate, Photo ID."}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-brand-dark flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-brand-blue" />
                  <span>Medical Colleges</span>
                </span>
                <span className="text-xs text-slate-500 font-normal">({colleges.length})</span>
              </h3>
              {colleges.length === 0 ? (
                <p className="text-xs text-slate-400">No colleges listed for this state yet.</p>
              ) : (
                <div className="space-y-2">
                  {colleges.map((col) => (
                    <Link
                      key={col.id}
                      href={`/colleges/${col.slug}`}
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-xs font-semibold text-brand-dark hover:text-brand-blue transition-colors"
                    >
                      {col.name} ({col.city})
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-brand-dark">Latest State Notices</h3>
              {updates.length === 0 ? (
                <p className="text-xs text-slate-400">No specific updates published for {stateData.name} yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {updates.map((u) => (
                    <Link
                      key={u.id}
                      href={`/updates/${u.slug}`}
                      className="block p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 space-y-1 transition-colors"
                    >
                      <h4 className="font-bold text-xs text-brand-dark line-clamp-2">{u.title}</h4>
                      <p className="text-[10px] text-slate-400">{formatDate(u.published_at)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
