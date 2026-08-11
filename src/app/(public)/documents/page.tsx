"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, Filter, Search, ShieldCheck } from "lucide-react";
import { store } from "@/lib/mockData";
import { DocumentItem } from "@/types";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  useEffect(() => {
    const load = () => {
      setDocuments(store.documents);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const categories = [
    "All",
    "General",
    "MCC",
    "State Counselling",
    "Category",
    "Domicile",
    "NRI",
  ];

  const filtered = documents.filter(
    (d) => selectedCat === "All" || d.category === selectedCat
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
              Official Downloads & Formats
            </span>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              Counselling Document Downloads
            </h1>
            <p className="text-sm text-brand-textSecondary mt-1">
              Official PDF guidelines, certificate formats (OBC-NCL, EWS, Domicile), and admission checklists.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCat === cat
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-slate-600 border border-brand-border hover:bg-slate-50"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-brand-blue text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                    {doc.category}
                  </span>
                  {doc.file_size && (
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {doc.file_size}
                    </span>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-brand-dark leading-snug">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Added: {formatDate(doc.uploaded_at)}
                </span>

                <a
                  href={doc.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
