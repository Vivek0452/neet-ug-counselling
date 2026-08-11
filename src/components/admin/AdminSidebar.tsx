"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BellRing,
  Calendar,
  FileText,
  MapPin,
  Building2,
  BarChart3,
  Zap,
  FolderKanban,
  MessageSquare,
  History,
  Settings,
  LogOut,
  ShieldCheck,
  Globe,
} from "lucide-react";

const SIDEBAR_SECTIONS = [
  {
    title: "Core CMS",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Latest Updates", href: "/admin/updates", icon: BellRing },
      { label: "Important Dates", href: "/admin/important-dates", icon: Calendar },
      { label: "Documents CMS", href: "/admin/documents", icon: FileText },
    ],
  },
  {
    title: "Counselling Portals",
    items: [
      { label: "MCC Counselling", href: "/admin/mcc", icon: Globe },
      { label: "State Counselling", href: "/admin/states", icon: MapPin },
    ],
  },
  {
    title: "Medical Colleges & Data",
    items: [
      { label: "Medical Colleges", href: "/admin/colleges", icon: Building2 },
      { label: "Cutoff Database", href: "/admin/cutoff", icon: BarChart3 },
      { label: "Seat Matrix Data", href: "/admin/seat-matrix", icon: Zap },
    ],
  },
  {
    title: "System & Management",
    items: [
      { label: "Media Library", href: "/admin/media", icon: FolderKanban },
      { label: "Contact Enquiries", href: "/admin/contact", icon: MessageSquare },
      { label: "Activity Logs", href: "/admin/logs", icon: History },
      { label: "SEO & Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-dark text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight block">
              NEET Admin <span className="text-brand-blue">CMS</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Management Portal
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6">
          {SIDEBAR_SECTIONS.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {sec.title}
              </h4>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-brand-blue text-white shadow-md font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Quick View Public Portal */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-brand-blue" />
          <span>View Public Site</span>
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center justify-center space-x-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Session</span>
        </Link>
      </div>
    </aside>
  );
}
