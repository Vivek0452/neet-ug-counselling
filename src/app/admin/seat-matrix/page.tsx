"use client";

import React, { useState, useEffect } from "react";
import { Plus, Upload, Trash2, Zap, X } from "lucide-react";
import { store } from "@/lib/mockData";
import { SeatMatrixItem, CollegeItem } from "@/types";
import CsvImporter from "@/components/admin/CsvImporter";

export default function AdminSeatMatrixPage() {
  const [matrix, setMatrix] = useState<SeatMatrixItem[]>([]);
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [collegeId, setCollegeId] = useState("");
  const [course, setCourse] = useState("MBBS");
  const [category, setCategory] = useState("General");
  const [quota, setQuota] = useState("AIQ");
  const [round, setRound] = useState("Round 1");
  const [seats, setSeats] = useState(25);

  useEffect(() => {
    const load = () => {
      setMatrix([...store.seatMatrix]);
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
    const items: Omit<SeatMatrixItem, "id">[] = parsedRows.map((r) => {
      const getVal = (...keys: string[]) => {
        for (const k of keys) {
          const cleanK = k.toLowerCase().trim().replace(/[\s-]+/g, "_");
          if (r[cleanK] !== undefined && r[cleanK] !== null && String(r[cleanK]).trim() !== "") {
            return String(r[cleanK]).trim();
          }
          if (r[k] !== undefined && r[k] !== null && String(r[k]).trim() !== "") {
            return String(r[k]).trim();
          }
        }
        return "";
      };

      const collegeName = getVal("college_name", "college", "name", "institution", "college_full_name");
      const col = colleges.find(
        (c) => c.name.toLowerCase().trim() === collegeName.toLowerCase()
      ) || colleges[0];

      const seatsStr = getVal("available_seats", "seats", "total_seats", "available", "intake", "seat_count");

      return {
        college_id: col ? col.id : "col-1",
        college_name: collegeName || (col ? col.name : "Medical College"),
        state_slug: (getVal("state_slug", "state", "state_name") || (col ? col.state_slug : "rajasthan")).toLowerCase().replace(/\s+/g, "-"),
        course: getVal("course", "degree", "program") || "MBBS",
        category: getVal("category", "seat_category", "caste_category") || "General",
        quota: getVal("quota", "seat_quota", "category_quota") || "AIQ",
        round: getVal("round", "counselling_round", "allotment_round") || "Round 1",
        available_seats: Number(seatsStr.replace(/,/g, "")) || 10,
      };
    });

    store.importSeatMatrix(items);
  };

  const handleSaveSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const col = colleges.find((c) => c.id === collegeId) || colleges[0];
    if (!col) return;

    store.addSeatMatrix({
      college_id: col.id,
      college_name: col.name,
      state_slug: col.state_slug,
      course,
      category,
      quota,
      round,
      available_seats: Number(seats),
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Seat Matrix CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage category-wise available MBBS seat matrix or import bulk CSV files.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Import CSV Seat Matrix</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Record</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Medical College</th>
                <th className="p-4">Course</th>
                <th className="p-4">Quota</th>
                <th className="p-4">Category</th>
                <th className="p-4">Round</th>
                <th className="p-4">Available Seats</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {matrix.map((sm) => (
                <tr key={sm.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-brand-dark">{sm.college_name}</td>
                  <td className="p-4 font-semibold text-slate-700">{sm.course}</td>
                  <td className="p-4 font-semibold text-slate-700">{sm.quota}</td>
                  <td className="p-4 font-bold text-emerald-600">{sm.category}</td>
                  <td className="p-4 text-slate-600">{sm.round}</td>
                  <td className="p-4 font-black text-emerald-600 text-sm">{sm.available_seats} Seats</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => store.deleteSeatMatrix(sm.id)}
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

      {isCsvModalOpen && (
        <CsvImporter
          title="Import Seat Matrix Data via CSV"
          expectedHeaders={["college_name", "course", "state", "category", "quota", "round", "available_seats"]}
          onImport={handleCsvImport}
          onClose={() => setIsCsvModalOpen(false)}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">Add Seat Matrix Record</h3>
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
                  <label className="block font-bold text-slate-700 mb-1">Course</label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
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
                  <label className="block font-bold text-slate-700 mb-1">Available Seats *</label>
                  <input
                    type="number"
                    required
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-emerald-600"
                  />
                </div>
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
