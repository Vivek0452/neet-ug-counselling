"use client";

import React from "react";
import Link from "next/link";
import { User, Bell, ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-brand-border px-6 flex items-center justify-between shrink-0 shadow-sm">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Admin Control Center
        </span>
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
          LIVE CMS ACTIVE
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue"
        >
          <span>Open Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
          <div className="text-xs">
            <span className="font-bold text-brand-dark block leading-none">
              Portal Admin
            </span>
            <span className="text-[10px] text-slate-400">admin@neetugcounselling.in</span>
          </div>
        </div>
      </div>
    </header>
  );
}
