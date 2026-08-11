"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Building2, Search, X, FileSpreadsheet } from "lucide-react";
import { store } from "@/lib/mockData";
import { CollegeItem, StateItem } from "@/types";
import { slugify } from "@/lib/utils";
import CsvImporter from "@/components/admin/CsvImporter";

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [stateSlug, setStateSlug] = useState("rajasthan");
  const [city, setCity] = useState("");
  const [isGovt, setIsGovt] = useState(true);
  const [university, setUniversity] = useState("");
  const [nmcStatus, setNmcStatus] = useState("Recognized");
  const [mbbsSeats, setMbbsSeats] = useState(250);
  const [fees, setFees] = useState("");
  const [hostel, setHostel] = useState(true);
  const [stipend, setStipend] = useState("");
  const [bond, setBond] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const load = () => {
      setColleges([...store.colleges]);
      setStates([...store.states]);
    };
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setStateSlug("rajasthan");
    setCity("");
    setIsGovt(true);
    setUniversity("");
    setNmcStatus("Recognized");
    setMbbsSeats(250);
    setFees("");
    setHostel(true);
    setStipend("");
    setBond("");
    setWebsite("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col: CollegeItem) => {
    setEditingId(col.id);
    setName(col.name);
    setStateSlug(col.state_slug);
    setCity(col.city);
    setIsGovt(col.is_govt);
    setUniversity(col.university || "");
    setNmcStatus(col.nmc_status || "Recognized");
    setMbbsSeats(col.mbbs_seats);
    setFees(col.fees_annual || "");
    setHostel(col.hostel_available);
    setStipend(col.stipend_amount || "");
    setBond(col.bond_details || "");
    setWebsite(col.website_url || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city) return;

    const slug = slugify(name);

    if (editingId) {
      store.editCollege(editingId, {
        name,
        slug,
        state_slug: stateSlug,
        city,
        is_govt: isGovt,
        university,
        nmc_status: nmcStatus,
        mbbs_seats: mbbsSeats,
        fees_annual: fees,
        hostel_available: hostel,
        stipend_amount: stipend,
        bond_details: bond,
        website_url: website,
      });
    } else {
      store.addCollege({
        name,
        slug,
        state_slug: stateSlug,
        city,
        is_govt: isGovt,
        university,
        nmc_status: nmcStatus,
        mbbs_seats: mbbsSeats,
        fees_annual: fees,
        hostel_available: hostel,
        stipend_amount: stipend,
        bond_details: bond,
        website_url: website,
      });
    }

    setIsModalOpen(false);
  };

  const handleCsvImport = (rows: Record<string, any>[]) => {
    rows.forEach((row) => {
      const colName = row.name || row.college_name || row.Name;
      if (!colName) return;

      const slug = slugify(colName);
      const isGovtVal =
        row.is_govt !== undefined
          ? String(row.is_govt).toLowerCase() === "true" || String(row.is_govt) === "1"
          : (row.type || "").toLowerCase().includes("govt");

      const hostelVal =
        row.hostel_available !== undefined
          ? String(row.hostel_available).toLowerCase() === "true" || String(row.hostel_available) === "1"
          : true;

      store.addCollege({
        name: colName,
        slug: slug,
        state_slug: (row.state_slug || row.state || "rajasthan").toLowerCase().replace(/\s+/g, "-"),
        city: row.city || "Jaipur",
        is_govt: isGovtVal,
        university: row.university || "",
        nmc_status: row.nmc_status || "Recognized",
        mbbs_seats: Number(row.mbbs_seats || row.seats || 250),
        fees_annual: row.fees_annual || row.fees || "",
        hostel_available: hostelVal,
        stipend_amount: row.stipend_amount || row.stipend || "",
        bond_details: row.bond_details || row.bond || "",
        website_url: row.website_url || row.website || "",
      });
    });

    store.addLog("Imported Medical Colleges via CSV", "colleges", `${rows.length} Colleges`);
  };

  const filtered = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Medical Colleges CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add and manage MBBS government and private medical institutions in bulk via CSV or manual entry.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medical College</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search college name or city..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-white shadow-sm"
        />
      </div>

      {/* Colleges Table */}
      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">College Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">MBBS Seats</th>
                <th className="p-4">Annual Fees</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((col) => (
                <tr key={col.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-brand-dark">{col.name}</td>
                  <td className="p-4 text-slate-600 font-medium">
                    {col.city}, {col.state_slug.toUpperCase()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        col.is_govt
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {col.is_govt ? "Govt" : "Private"}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{col.mbbs_seats} Seats</td>
                  <td className="p-4 text-slate-700 font-medium">{col.fees_annual || "N/A"}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(col)}
                      className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => store.deleteCollege(col.id)}
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

      {/* Manual Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">
                {editingId ? "Edit Medical College" : "Add Medical College"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">College Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sawai Man Singh Medical College"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State</label>
                  <select
                    value={stateSlug}
                    onChange={(e) => setStateSlug(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                  >
                    {states.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Jaipur"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ownership</label>
                  <select
                    value={isGovt ? "govt" : "private"}
                    onChange={(e) => setIsGovt(e.target.value === "govt")}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                  >
                    <option value="govt">Government</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MBBS Seat Intake</label>
                  <input
                    type="number"
                    value={mbbsSeats}
                    onChange={(e) => setMbbsSeats(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Annual Tuition Fee</label>
                  <input
                    type="text"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    placeholder="e.g. ₹53,500 / year"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Bond Details</label>
                <textarea
                  rows={2}
                  value={bond}
                  onChange={(e) => setBond(e.target.value)}
                  placeholder="2 Years bond or ₹5 Lakh penalty..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
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
                  Save College Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Importer Modal */}
      {isCsvModalOpen && (
        <CsvImporter
          title="Import Medical Colleges (CSV)"
          expectedHeaders={[
            "name",
            "state_slug",
            "city",
            "is_govt",
            "mbbs_seats",
            "fees_annual",
            "stipend_amount",
            "bond_details",
          ]}
          onImport={handleCsvImport}
          onClose={() => setIsCsvModalOpen(false)}
        />
      )}
    </div>
  );
}
