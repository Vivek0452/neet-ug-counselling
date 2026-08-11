"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, Search } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Updates", href: "/updates" },
  { label: "MCC Quota", href: "/mcc-counselling" },
  { label: "State Counselling", href: "/state-counselling" },
  { label: "Colleges", href: "/colleges" },
  { label: "Cutoff", href: "/cutoff" },
  { label: "Seat Matrix", href: "/seat-matrix" },
  { label: "Dates", href: "/important-dates" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20 group-hover:bg-brand-hover transition-colors">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg text-brand-dark tracking-tight leading-none">
                NEET UG <span className="text-brand-blue">Counselling</span>
              </span>
              <span className="text-[10px] text-brand-textSecondary font-bold uppercase tracking-wider mt-0.5">
                Portal 2026
              </span>
            </div>
          </Link>

          {/* Middle: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 mx-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg text-[12px] xl:text-[13px] font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-brand-blue font-bold shadow-xs border border-blue-100/60"
                      : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search) */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            <Link
              href="/search"
              className="p-2 text-slate-500 hover:text-brand-blue hover:bg-slate-100 rounded-xl transition-colors flex items-center space-x-1 text-xs font-semibold"
              title="Search Counselling Portal"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
              <span>Search</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-1.5">
            <Link
              href="/search"
              className="p-2 text-slate-600 hover:text-brand-blue rounded-lg"
              title="Search Portal"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-dark hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-4 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 py-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-brand-dark bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
