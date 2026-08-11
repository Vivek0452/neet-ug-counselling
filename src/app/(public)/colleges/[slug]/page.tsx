"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPin,
  ExternalLink,
  ArrowLeft,
  DollarSign,
  Briefcase,
  BarChart3,
  Zap,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { CollegeItem, CutoffItem, SeatMatrixItem } from "@/types";

export default function CollegeDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;

  const [college, setCollege] = useState<CollegeItem | null>(null);
  const [cutoffs, setCutoffs] = useState<CutoffItem[]>([]);
  const [seats, setSeats] = useState<SeatMatrixItem[]>([]);

  useEffect(() => {
    if (!rawSlug) return;

    const loadCollegeData = () => {
      const decodedSlug = decodeURIComponent(rawSlug).toLowerCase();
      const col = store.colleges.find(
        (c) =>
          c.slug.toLowerCase() === decodedSlug ||
          c.slug.toLowerCase() === rawSlug.toLowerCase() ||
          c.id === rawSlug
      );

      if (col) {
        setCollege(col);
        setCutoffs(
          store.cutoffs.filter(
            (k) =>
              k.college_id === col.id ||
              k.college_name.toLowerCase() === col.name.toLowerCase()
          )
        );
        setSeats(
          store.seatMatrix.filter(
            (s) =>
              s.college_id === col.id ||
              s.college_name.toLowerCase() === col.name.toLowerCase()
          )
        );
      }
    };

    loadCollegeData();
    const unsub = store.subscribe(loadCollegeData);
    return () => unsub();
  }, [rawSlug]);

  if (!college) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold mx-auto">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-dark">College Details Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested medical college could not be located in our active directory.
        </p>
        <Link
          href="/colleges"
          className="inline-flex items-center space-x-2 bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-brand-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Colleges Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/colleges"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to College Directory</span>
        </Link>

        {/* Header Hero Card */}
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-md ${
                  college.is_govt
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {college.is_govt ? "Government College" : "Private College"}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-md flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{college.city}, {college.state_slug.toUpperCase()}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              {college.name}
            </h1>

            {college.university && (
              <p className="text-xs text-slate-500 font-medium">
                University Affiliation: <strong className="text-brand-dark">{college.university}</strong>
              </p>
            )}
          </div>

          {college.website_url && (
            <a
              href={college.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
            >
              <span>College Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-brand-border rounded-2xl p-5 text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">Total MBBS Seats</span>
            <span className="text-2xl font-black text-brand-blue">{college.mbbs_seats}</span>
          </div>
          <div className="bg-white border border-brand-border rounded-2xl p-5 text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">Annual Fee</span>
            <span className="text-lg font-extrabold text-brand-dark">{college.fees_annual || "N/A"}</span>
          </div>
          <div className="bg-white border border-brand-border rounded-2xl p-5 text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">Hostel Facility</span>
            <span className="text-base font-bold text-emerald-600">
              {college.hostel_available ? "Available" : "Not Available"}
            </span>
          </div>
          <div className="bg-white border border-brand-border rounded-2xl p-5 text-center space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">NMC Status</span>
            <span className="text-base font-bold text-emerald-600">{college.nmc_status}</span>
          </div>
        </div>

        {/* Bond & Internship Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-2">
            <h3 className="font-bold text-base text-brand-dark flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-brand-blue" />
              <span>Service Bond Details</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {college.bond_details || "Standard state service bond applies upon completion of MBBS degree."}
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-2">
            <h3 className="font-bold text-base text-brand-dark flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Monthly Stipend</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {college.stipend_amount ? `Internship Stipend: ${college.stipend_amount}` : "Stipend as per state medical education rules."}
            </p>
          </div>
        </div>

        {/* Category Seat Matrix */}
        {seats.length > 0 && (
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-brand-dark flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Available Category Seats</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 font-bold text-brand-dark">
                  <tr>
                    <th className="p-3">Course</th>
                    <th className="p-3">Quota</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Round</th>
                    <th className="p-3">Available Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {seats.map((s) => (
                    <tr key={s.id}>
                      <td className="p-3 font-bold">{s.course}</td>
                      <td className="p-3 font-semibold">{s.quota}</td>
                      <td className="p-3 font-semibold text-emerald-600">{s.category}</td>
                      <td className="p-3">{s.round}</td>
                      <td className="p-3 font-bold text-emerald-600">{s.available_seats} Seats</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* College Cutoff Records */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-brand-dark flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-brand-blue" />
            <span>Category Cutoff Ranks</span>
          </h3>
          {cutoffs.length === 0 ? (
            <p className="text-xs text-slate-400">No cutoff data recorded for this college yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 font-bold text-brand-dark">
                  <tr>
                    <th className="p-3">Year</th>
                    <th className="p-3">Quota</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Round</th>
                    <th className="p-3">Opening Rank</th>
                    <th className="p-3">Closing Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cutoffs.map((k) => (
                    <tr key={k.id}>
                      <td className="p-3 font-bold">{k.year}</td>
                      <td className="p-3 font-semibold">{k.quota}</td>
                      <td className="p-3 font-semibold">{k.category}</td>
                      <td className="p-3">{k.round}</td>
                      <td className="p-3">{k.opening_rank || "-"}</td>
                      <td className="p-3 font-bold text-brand-blue">{k.closing_rank}</td>
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
