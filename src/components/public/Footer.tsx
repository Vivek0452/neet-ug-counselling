import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                NEET UG <span className="text-brand-blue">Portal</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simple, reliable, and updated counselling information for NEET UG medical admissions across India. Helping students and parents make informed choices.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <span>support@neetugcounselling.in</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span>+91 1800-11-NEET (Toll Free)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Counselling Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/mcc-counselling" className="hover:text-brand-blue transition-colors">
                  MCC All India Counselling
                </Link>
              </li>
              <li>
                <Link href="/state-counselling" className="hover:text-brand-blue transition-colors">
                  State Wise Counselling Portals
                </Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-brand-blue transition-colors">
                  Medical Colleges Directory
                </Link>
              </li>
              <li>
                <Link href="/cutoff" className="hover:text-brand-blue transition-colors">
                  College Cutoff Ranks (2024 - 2026)
                </Link>
              </li>
              <li>
                <Link href="/seat-matrix" className="hover:text-brand-blue transition-colors">
                  Category Seat Matrix Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources & Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/updates" className="hover:text-brand-blue transition-colors">
                  Live Counselling Updates
                </Link>
              </li>
              <li>
                <Link href="/important-dates" className="hover:text-brand-blue transition-colors">
                  Important Counselling Dates
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-brand-blue transition-colors">
                  Download Official Documents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue transition-colors">
                  Student Helpdesk & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Authority Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Official Authorities</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://mcc.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-brand-blue transition-colors"
                >
                  <span>MCC Official Website (mcc.nic.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://exams.nta.ac.in/NEET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-brand-blue transition-colors"
                >
                  <span>NTA NEET Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nmc.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-brand-blue transition-colors"
                >
                  <span>National Medical Commission (NMC)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 text-center text-[11px] text-slate-500 space-y-2">
          <p>
            <strong className="text-slate-400">Disclaimer:</strong> This website is an independent information service created to help NEET UG students and parents easily access counselling notifications, schedules, cutoffs, and college data. Always refer to official websites (MCC, NTA, and State Counselling Authorities) for binding notifications.
          </p>
          <p>© {new Date().getFullYear()} NEET UG Counselling Information Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
