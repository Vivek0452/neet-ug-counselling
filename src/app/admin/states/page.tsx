"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, ExternalLink, X } from "lucide-react";
import { store } from "@/lib/mockData";
import { StateItem } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminStatesPage() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [authority, setAuthority] = useState("");
  const [officialWeb, setOfficialWeb] = useState("");
  const [regLink, setRegLink] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [process, setProcess] = useState("");
  const [fees, setFees] = useState("");
  const [docs, setDocs] = useState("");

  useEffect(() => {
    const load = () => setStates([...store.states]);
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setAuthority("");
    setOfficialWeb("");
    setRegLink("");
    setEligibility("");
    setProcess("");
    setFees("");
    setDocs("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (st: StateItem) => {
    setEditingId(st.id);
    setName(st.name);
    setAuthority(st.counselling_authority);
    setOfficialWeb(st.official_website);
    setRegLink(st.registration_link || "");
    setEligibility(st.eligibility || "");
    setProcess(st.counselling_process || "");
    setFees(st.fees_info || "");
    setDocs(st.documents_required || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !authority || !officialWeb) return;

    const slug = slugify(name);

    if (editingId) {
      store.editState(editingId, {
        name,
        slug,
        counselling_authority: authority,
        official_website: officialWeb,
        registration_link: regLink,
        eligibility,
        counselling_process: process,
        fees_info: fees,
        documents_required: docs,
      });
    } else {
      store.addState({
        name,
        slug,
        counselling_authority: authority,
        official_website: officialWeb,
        registration_link: regLink,
        eligibility,
        counselling_process: process,
        fees_info: fees,
        documents_required: docs,
        status: "active",
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            State Counselling CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage authority portals, registration links, eligibility rules, and state dates.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New State</span>
        </button>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">State Name</th>
                <th className="p-4">Counselling Authority</th>
                <th className="p-4">Official Web Portal</th>
                <th className="p-4">Registration Link</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {states.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-brand-dark text-sm">{st.name}</td>
                  <td className="p-4 font-medium text-slate-700">{st.counselling_authority}</td>
                  <td className="p-4">
                    <a
                      href={st.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue font-bold inline-flex items-center space-x-1"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-4 text-slate-600">
                    {st.registration_link ? (
                      <span className="text-emerald-600 font-bold">Active Link</span>
                    ) : (
                      "Not Active"
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(st)}
                      className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => store.deleteState(st.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">
                {editingId ? "Edit State Details" : "Add State Counselling Authority"}
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
                <label className="block font-bold text-slate-700 mb-1">State Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajasthan, Delhi"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Counselling Authority Name *</label>
                <input
                  type="text"
                  required
                  value={authority}
                  onChange={(e) => setAuthority(e.target.value)}
                  placeholder="e.g. NEET UG Medical Board Jaipur"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Website URL *</label>
                  <input
                    type="url"
                    required
                    value={officialWeb}
                    onChange={(e) => setOfficialWeb(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration Portal Link</label>
                  <input
                    type="url"
                    value={regLink}
                    onChange={(e) => setRegLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <textarea
                  rows={3}
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  placeholder="Describe state domicile and NEET rank criteria..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Counselling & Choice Filling Process</label>
                <textarea
                  rows={3}
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                  placeholder="Step 1, Step 2, Step 3..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Application Fee & Security Deposit</label>
                <textarea
                  rows={2}
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  placeholder="Fee details for Govt and Private seats..."
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
                  Save State Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
