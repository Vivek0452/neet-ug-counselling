"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Pin,
  Flame,
  FileText,
  Clock,
  Search,
  CheckCircle2,
  X,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem, UpdateCategory, UpdateStatus } from "@/types";
import { slugify, formatDate, formatDateTime } from "@/lib/utils";

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<UpdateCategory>("MCC");
  const [stateSlug, setStateSlug] = useState("");
  const [authority, setAuthority] = useState("MCC");
  const [round, setRound] = useState("Round 1");
  const [pdfUrl, setPdfUrl] = useState("");
  const [officialName, setOfficialName] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [status, setStatus] = useState<UpdateStatus>("published");

  useEffect(() => {
    const load = () => setUpdates([...store.updates]);
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setShortDesc("");
    setContent("");
    setCategory("MCC");
    setStateSlug("");
    setAuthority("MCC");
    setRound("Round 1");
    setPdfUrl("");
    setOfficialName("");
    setOfficialUrl("");
    setScheduledAt("");
    setIsBreaking(false);
    setIsPinned(false);
    setStatus("published");
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: UpdateItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setShortDesc(item.short_description || "");
    setContent(item.content);
    setCategory(item.category);
    setStateSlug(item.state_slug || "");
    setAuthority(item.authority);
    setRound(item.round || "Round 1");
    setPdfUrl(item.pdf_url || "");
    setOfficialName(item.official_source_name || "");
    setOfficialUrl(item.official_source_url || "");
    setScheduledAt(item.scheduled_at || "");
    setIsBreaking(item.is_breaking);
    setIsPinned(item.is_pinned);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const slug = slugify(title);

    if (editingId) {
      store.editUpdate(editingId, {
        title,
        slug,
        short_description: shortDesc,
        content,
        category,
        state_slug: stateSlug || undefined,
        authority,
        round,
        pdf_url: pdfUrl || undefined,
        official_source_name: officialName || undefined,
        official_source_url: officialUrl || undefined,
        scheduled_at: scheduledAt || undefined,
        is_breaking: isBreaking,
        is_pinned: isPinned,
        status,
      });
    } else {
      store.addUpdate({
        title,
        slug,
        short_description: shortDesc,
        content,
        category,
        state_slug: stateSlug || undefined,
        authority,
        round,
        pdf_url: pdfUrl || undefined,
        official_source_name: officialName || undefined,
        official_source_url: officialUrl || undefined,
        published_at: status === "scheduled" && scheduledAt ? scheduledAt : new Date().toISOString(),
        scheduled_at: scheduledAt || undefined,
        is_breaking: isBreaking,
        is_pinned: isPinned,
        status,
      });
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this update?")) {
      store.deleteUpdate(id);
    }
  };

  const filtered = updates.filter(
    (u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.authority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Latest Updates CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish notifications, scheduled announcements, and real-time breaking news.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Update</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search updates by title or authority..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-white shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Title & Details</th>
                <th className="p-4">Category / State</th>
                <th className="p-4">Status</th>
                <th className="p-4">Toggles</th>
                <th className="p-4">Published Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 max-w-md space-y-1">
                    <div className="font-bold text-brand-dark text-sm leading-snug">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      Authority: {item.authority}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-brand-blue font-bold px-2.5 py-0.5 rounded">
                      {item.state_slug ? item.state_slug.toUpperCase() : item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                        item.status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "scheduled"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => store.toggleBreaking(item.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        item.is_breaking
                          ? "bg-red-600 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      Breaking
                    </button>
                    <button
                      onClick={() => store.togglePinned(item.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        item.is_pinned
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      Pinned
                    </button>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {formatDate(item.published_at)}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg"
                      title="Edit Update"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete Update"
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

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">
                {editingId ? "Edit Update Notice" : "Publish New Update Notice"}
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
                <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. MCC NEET UG Round 1 Registration Started"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as UpdateCategory)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                  >
                    <option value="MCC">MCC</option>
                    <option value="State">State</option>
                    <option value="Seat Matrix">Seat Matrix</option>
                    <option value="Cutoff">Cutoff</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State (Optional)</label>
                  <input
                    type="text"
                    value={stateSlug}
                    onChange={(e) => setStateSlug(e.target.value.toLowerCase())}
                    placeholder="e.g. rajasthan, delhi"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Authority Name *</label>
                  <input
                    type="text"
                    required
                    value={authority}
                    onChange={(e) => setAuthority(e.target.value)}
                    placeholder="MCC / RajUGMedical / CET Cell"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Round</label>
                  <input
                    type="text"
                    value={round}
                    onChange={(e) => setRound(e.target.value)}
                    placeholder="Round 1 / Round 2 / Mop-Up"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Brief 1-2 sentence overview..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Notice Content *</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter full notice text, guidelines, key highlights..."
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official PDF URL (Optional)</label>
                  <input
                    type="text"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="/docs/notice.pdf"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Source Name & Link</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={officialName}
                      onChange={(e) => setOfficialName(e.target.value)}
                      placeholder="Official Portal"
                      className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50"
                    />
                    <input
                      type="text"
                      value={officialUrl}
                      onChange={(e) => setOfficialUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Options */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="rounded text-brand-blue"
                    />
                    <span>Mark as Breaking News (Real-time Banner)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="rounded text-brand-blue"
                    />
                    <span>Pin to Top of Homepage</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Publishing Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as UpdateStatus)}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-bold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {status === "scheduled" && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Scheduled Date & Time</label>
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-xl bg-white font-medium"
                      />
                    </div>
                  )}
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
                  {editingId ? "Save Changes" : "Publish Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
