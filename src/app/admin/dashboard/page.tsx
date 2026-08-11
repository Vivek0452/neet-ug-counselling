"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BellRing,
  CheckCircle,
  FileClock,
  Clock,
  MapPin,
  Building2,
  FileText,
  BarChart3,
  Zap,
  MessageSquare,
  HardDrive,
  Plus,
  ArrowRight,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem, AdminLog } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUpdates: 0,
    publishedUpdates: 0,
    draftUpdates: 0,
    scheduledUpdates: 0,
    totalStates: 0,
    totalColleges: 0,
    totalDocs: 0,
    totalCutoffs: 0,
    totalSeats: 0,
    contactEnquiries: 0,
    storageUsage: "7.0 MB",
  });

  const [recentUpdates, setRecentUpdates] = useState<UpdateItem[]>([]);
  const [recentLogs, setRecentLogs] = useState<AdminLog[]>([]);

  useEffect(() => {
    const loadData = () => {
      const updates = store.updates;
      const published = updates.filter((u) => u.status === "published").length;
      const draft = updates.filter((u) => u.status === "draft").length;
      const scheduled = updates.filter((u) => u.status === "scheduled").length;

      setStats({
        totalUpdates: updates.length,
        publishedUpdates: published,
        draftUpdates: draft,
        scheduledUpdates: scheduled,
        totalStates: store.states.length,
        totalColleges: store.colleges.length,
        totalDocs: store.documents.length,
        totalCutoffs: store.cutoffs.length,
        totalSeats: store.seatMatrix.length,
        contactEnquiries: store.contacts.length,
        storageUsage: "7.0 MB / 10 GB",
      });

      setRecentUpdates(updates.slice(0, 4));
      setRecentLogs(store.logs.slice(0, 5));
    };

    loadData();
    const unsub = store.subscribe(loadData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
            System Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Administrator Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage real-time counselling updates, states, medical colleges, cutoffs, and documents.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/admin/updates?action=new"
            className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Update</span>
          </Link>
          <Link
            href="/admin/important-dates?action=new"
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-brand-dark text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Date</span>
          </Link>
          <Link
            href="/admin/colleges?action=new"
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-brand-dark text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add College</span>
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Updates</span>
          <span className="text-2xl font-black text-brand-dark">{stats.totalUpdates}</span>
          <span className="text-[10px] text-emerald-600 font-bold block">{stats.publishedUpdates} Published</span>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Drafts / Scheduled</span>
          <span className="text-2xl font-black text-amber-600">{stats.draftUpdates + stats.scheduledUpdates}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">{stats.scheduledUpdates} Scheduled</span>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Counselling States</span>
          <span className="text-2xl font-black text-brand-blue">{stats.totalStates}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">28+ Portals Active</span>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Colleges Directory</span>
          <span className="text-2xl font-black text-brand-dark">{stats.totalColleges}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Govt & Pvt</span>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Cutoffs & Seats</span>
          <span className="text-2xl font-black text-purple-600">{stats.totalCutoffs + stats.totalSeats}</span>
          <span className="text-[10px] text-purple-600 font-bold block">CSV Import Ready</span>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Contact Enquiries</span>
          <span className="text-2xl font-black text-emerald-600">{stats.contactEnquiries}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Student Messages</span>
        </div>
      </div>

      {/* Secondary Dashboard Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Updates Manager (Col 2/3) */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-dark flex items-center space-x-2">
              <BellRing className="w-5 h-5 text-brand-blue" />
              <span>Recent Updates & Notices</span>
            </h3>
            <Link
              href="/admin/updates"
              className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center space-x-1"
            >
              <span>Manage All ({stats.totalUpdates})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentUpdates.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase bg-blue-100 text-brand-blue px-2 py-0.5 rounded">
                      {u.category}
                    </span>
                    {u.is_breaking && (
                      <span className="text-[10px] font-extrabold uppercase bg-red-600 text-white px-2 py-0.5 rounded animate-pulse">
                        BREAKING
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-brand-dark leading-snug">{u.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    Published: {formatDate(u.published_at)} • Authority: {u.authority}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <Link
                    href={`/admin/updates?edit=${u.id}`}
                    className="text-xs font-bold text-brand-blue bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log Feed (Col 1/3) */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-dark flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Admin Activity Log</span>
            </h3>
            <Link href="/admin/logs" className="text-xs font-bold text-brand-blue hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-dark">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{formatDateTime(log.created_at)}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
