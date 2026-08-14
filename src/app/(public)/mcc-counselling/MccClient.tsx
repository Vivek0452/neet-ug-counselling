"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  FileText,
  Calendar,
  DollarSign,
  ArrowRight,
  ListOrdered,
  Users,
} from "lucide-react";

export default function MccClient() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Who Can Participate" },
    { id: "process", label: "Counselling Process" },
    { id: "fees", label: "Fee & Security Deposit" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-brand-dark to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-400/30">
              15% All India Quota & Deemed / Central Universities
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              MCC NEET UG Counselling 2026
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete step-by-step guide for registration, choice filling, seat allotment, and reporting for AIQ seats across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://mcc.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <span>Visit Official MCC Portal (mcc.nic.in)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/cutoff?quota=AIQ"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all border border-white/20"
              >
                <span>View AIQ Cutoff Ranks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-border space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? "border-brand-blue text-brand-blue bg-white rounded-t-xl"
                  : "border-transparent text-slate-600 hover:text-brand-dark"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-brand-dark flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span>Overview of MCC Counselling</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                The Medical Counselling Committee (MCC) under Directorate General of Health Services (DGHS) conducts online counselling for allocation of MBBS & BDS seats across central medical institutions in India.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-brand-dark">15% All India Quota (AIQ)</h4>
                  <p className="text-xs text-slate-600">All Govt Medical Colleges in India (except J&K seats handled separately).</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-brand-dark">100% Deemed Universities</h4>
                  <p className="text-xs text-slate-600">All private Deemed Medical & Dental Universities across India.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-brand-dark">Central Universities</h4>
                  <p className="text-xs text-slate-600">Delhi University (MAMC, LHMC, UCMS), AMU, BHU, VMMC & Safdarjung.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-brand-dark flex items-center space-x-2">
                <Users className="w-5 h-5 text-brand-blue" />
                <span>Who Can Participate</span>
              </h2>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Must have qualified NEET UG 2026 with valid scorecard.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Indian Nationals, NRIs, OCIs, PIOs, and Foreign Nationals are eligible for Deemed University seats.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>No state domicile restriction for 15% AIQ and Deemed University seats.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-brand-dark flex items-center space-x-2">
                <ListOrdered className="w-5 h-5 text-brand-blue" />
                <span>Counselling Step-by-Step</span>
              </h2>
              <div className="space-y-4">
                {[
                  { step: "Step 1", title: "Online Registration", desc: "Register on mcc.nic.in, fill personal details, NEET Roll No, and pay registration + security fee." },
                  { step: "Step 2", title: "Choice Filling & Locking", desc: "Select preferred medical colleges in order of priority and lock choices before deadline." },
                  { step: "Step 3", title: "Seat Allotment Result", desc: "MCC processes seat allotment based on NEET Rank, category, and choices filled." },
                  { step: "Step 4", title: "Reporting at College", desc: "Report to allotted college with original certificates, pay tuition fee, and complete verification." },
                ].map((s) => (
                  <div key={s.step} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="bg-brand-blue text-white text-xs font-extrabold px-3 py-1 rounded-lg shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-brand-dark">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-brand-dark flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-brand-blue" />
                <span>Registration Fee & Security Deposit</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 font-bold text-brand-dark">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Non-Refundable Fee</th>
                      <th className="p-3">Refundable Security Deposit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold">UR / EWS (15% AIQ & Central)</td>
                      <td className="p-3">₹1,000</td>
                      <td className="p-3">₹10,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">SC / ST / OBC / PwD (AIQ)</td>
                      <td className="p-3">₹500</td>
                      <td className="p-3">₹5,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Deemed Universities (All)</td>
                      <td className="p-3">₹5,000</td>
                      <td className="p-3">₹2,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-dark flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-brand-blue" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-brand-dark">Q: Can I exit in Round 1 without penalty?</h4>
                  <p className="text-xs text-slate-600">Yes, MCC Round 1 has Free Exit. Security deposit will not be forfeited if you do not report.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-1">
                  <h4 className="font-bold text-sm text-brand-dark">Q: Is security deposit refundable?</h4>
                  <p className="text-xs text-slate-600">Yes, if you join the allotted seat or do not get any seat after counseling rounds, security deposit is refunded to the same bank account.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
