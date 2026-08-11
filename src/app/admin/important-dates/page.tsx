"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, X } from "lucide-react";
import { store } from "@/lib/mockData";
import { ImportantDateItem } from "@/types";
import { formatDate, calculateDateStatus } from "@/lib/utils";

export default function AdminImportantDatesPage() {
  const [dates, setDates] = useState<ImportantDateItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [eventName, setEventName] = useState("");
  const [authority, setAuthority] = useState("MCC");
  const [stateSlug, setStateSlug] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [officialLink, setOfficialLink] = useState("");

  useEffect(() => {
    const load = () => setDates([...store.dates]);
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setEventName("");
    setAuthority("MCC");
    setStateSlug("");
    setStartDate(new Date().toISOString().slice(0, 10));
    setEndDate("");
    setDescription("");
    setOfficialLink("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: ImportantDateItem) => {
    setEditingId(d.id);
    setEventName(d.event_name);
    setAuthority(d.authority);
    setStateSlug(d.state_slug || "");
    setStartDate(d.start_date.slice(0, 10));
    setEndDate(d.end_date ? d.end_date.slice(0, 10) : "");
    setDescription(d.description || "");
    setOfficialLink(d.official_link || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !startDate) return;

    if (editingId) {
      store.editDate(editingId, {
        event_name: eventName,
        authority,
        state_slug: stateSlug || undefined,
        start_date: new Date(startDate).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        description,
        official_link: officialLink,
      });
    } else {
      store.addDate({
        event_name: eventName,
        authority,
        state_slug: stateSlug || undefined,
        start_date: new Date(startDate).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        description,
        official_link: officialLink,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Important Dates CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add timeline events. Status (Upcoming, Ongoing, Completed) is calculated automatically based on date/time.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Important Date</span>
        </button>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Event Name</th>
                <th className="p-4">Authority</th>
                <th className="p-4">Start / End Date</th>
                <th className="p-4">Auto Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dates.map((dt) => {
                const status = calculateDateStatus(dt.start_date, dt.end_date);
                return (
                  <tr key={dt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-brand-dark max-w-xs">{dt.event_name}</td>
                    <td className="p-4 text-slate-700 font-semibold">{dt.authority}</td>
                    <td className="p-4 text-slate-600">
                      {formatDate(dt.start_date)} {dt.end_date ? `to ${formatDate(dt.end_date)}` : ""}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          status === "Ongoing"
                            ? "bg-emerald-100 text-emerald-800"
                            : status === "Upcoming"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(dt)}
                        className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => store.deleteDate(dt.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">
                {editingId ? "Edit Event Date" : "Add Important Date Event"}
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
                <label className="block font-bold text-slate-700 mb-1">Event Name *</label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. MCC Round 1 Choice Filling"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Authority *</label>
                  <input
                    type="text"
                    required
                    value={authority}
                    onChange={(e) => setAuthority(e.target.value)}
                    placeholder="MCC / RajUGMedical"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State (Optional)</label>
                  <input
                    type="text"
                    value={stateSlug}
                    onChange={(e) => setStateSlug(e.target.value.toLowerCase())}
                    placeholder="rajasthan, delhi"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Link</label>
                <input
                  type="url"
                  value={officialLink}
                  onChange={(e) => setOfficialLink(e.target.value)}
                  placeholder="https://..."
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
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
