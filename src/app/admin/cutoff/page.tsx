"use client";

import React, { useState, useEffect } from "react";
import { Plus, Upload, Trash2, BarChart3, X } from "lucide-react";
import { store } from "@/lib/mockData";
import { CutoffItem, CollegeItem } from "@/types";
import CsvImporter from "@/components/admin/CsvImporter";

export default function AdminCutoffPage() {
  const [cutoffs, setCutoffs] = useState<CutoffItem[]>([]);
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [collegeId, setCollegeId] = useState("");
  const [year, setYear] = useState(2025);
  const [category, setCategory] = useState("General");
  const [quota, setQuota] = useState("AIQ");
  const [round, setRound] = useState("Round 1");
  const [openingRank, setOpeningRank] = useState<number | "">("");
  const [closingRank, setClosingRank] = useState(1500);

  useEffect(() => {
    const load = () => {
      setCutoffs([...store.cutoffs]);
      setColleges([...store.colleges]);
      if (store.colleges.length > 0 && !collegeId) {
        setCollegeId(store.colleges[0].id);
      }
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, [collegeId]);

  const handleCsvImport = (parsedRows: Record<string, any>[]) => {
    const items: Omit<CutoffItem, "id">[] = parsedRows.map((r) => {
      const col = colleges.find(
        (c) => c.name.toLowerCase() === (r.college_name || "").toLowerCase()
      ) || colleges[0];

      return {
        college_id: col ? col.id : "col-1",
        college_name: r.college_name || (col ? col.name : "Medical College"),
        year: Number(r.year) || 2025,
        state_slug: r.state || (col ? col.state_slug : "rajasthan"),
        category: r.category || "General",
        quota: r.quota || "AIQ",
        round: r.round || "Round 1",
        opening_rank: r.opening_rank ? Number(r.opening_rank) : undefined,
        closing_rank: Number(r.closing_rank) || 1000,
      };
    });

    store.importCutoffs(items);
  };

  const handleSaveSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const col = colleges.find((c) => c.id === collegeId) || colleges[0];
    if (!col) return;

    store.addCutoff({
      college_id: col.id,
      college_name: col.name,
      year: Number(year),
      state_slug: col.state_slug,
      category,
      quota,
      round,
      opening_rank: openingRank ? Number(openingRank) : undefined,
      closing_rank: Number(closingRank),
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Cutoff Database CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add individual closing ranks or import bulk cutoff datasets using CSV / Excel files.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV Cutoffs</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Cutoff</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Year</th>
                <th className="p-4">Medical College</th>
                <th className="p-4">Quota</th>
                <th className="p-4">Category</th>
                <th className="p-4">Round</th>
                <th className="p-4">Closing Rank</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cutoffs.map((k) => (
                <tr key={k.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-brand-dark">{k.year}</td>
                  <td className="p-4 font-bold text-brand-dark">{k.college_name}</td>
                  <td className="p-4 font-semibold text-slate-700">{k.quota}</td>
                  <td className="p-4 font-semibold text-blue-600">{k.category}</td>
                  <td className="p-4 text-slate-600">{k.round}</td>
                  <td className="p-4 font-black text-brand-blue text-sm">{k.closing_rank}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => store.deleteCutoff(k.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal Component */}
      {isCsvModalOpen && (
        <CsvImporter
          title="Import Cutoff Data via CSV"
          expectedHeaders={["college_name", "year", "state", "category", "quota", "round", "opening_rank", "closing_rank"]}
          onImport={handleCsvImport}
          onClose={() => setIsCsvModalOpen(false)}
        />
      )}

      {/* Single Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">Add Single Cutoff Record</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSingle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Medical College *</label>
                <select
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                >
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                  >
                    <option value="General">General / UR</option>
                    <option value="OBC">OBC-NCL</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quota</label>
                  <select
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                  >
                    <option value="AIQ">AIQ (15%)</option>
                    <option value="State Quota">State Quota (85%)</option>
                    <option value="Management">Management Quota</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Round</label>
                  <input
                    type="text"
                    value={round}
                    onChange={(e) => setRound(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Closing NEET Rank *</label>
                <input
                  type="number"
                  required
                  value={closingRank}
                  onChange={(e) => setClosingRank(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-brand-blue"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-hover text-white font-bold px-5 py-2.5 rounded-xl shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
