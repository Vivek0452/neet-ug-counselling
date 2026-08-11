"use client";

import React, { useState } from "react";
import { FolderKanban, Upload, FileText, Copy, Check, Trash2, Search, ExternalLink } from "lucide-react";
import { store } from "@/lib/mockData";
import { MediaFile } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaFile[]>(store.media);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newMedia: MediaFile = {
      id: "med-" + Date.now(),
      name: file.name,
      url: `/docs/${file.name}`,
      type: file.type || "application/pdf",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded_at: new Date().toISOString(),
    };

    store.media.unshift(newMedia);
    setMedia([...store.media]);
    store.addLog("Uploaded Media File", "Media", newMedia.id, `Uploaded file: ${file.name}`);
  };

  const handleDelete = (id: string) => {
    store.media = store.media.filter((m) => m.id !== id);
    setMedia([...store.media]);
  };

  const filtered = media.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Media Library & Storage
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse uploaded PDFs, images, and document files hosted on Supabase Storage.
          </p>
        </div>
        <label className="cursor-pointer inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0">
          <Upload className="w-4 h-4" />
          <span>Upload File to Storage</span>
          <input type="file" onChange={handleUploadSim} className="hidden" />
        </label>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media files by filename..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-white shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-brand-border rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="space-y-2">
              <div className="w-full h-24 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500 space-y-1">
                <FileText className="w-8 h-8 text-brand-blue" />
                <span className="text-[10px] font-bold uppercase">{m.type.split("/")[1] || "PDF"}</span>
              </div>
              <h4 className="font-bold text-xs text-brand-dark truncate" title={m.name}>
                {m.name}
              </h4>
              <p className="text-[10px] text-slate-400">
                {m.size} • {formatDate(m.uploaded_at)}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleCopy(m.id, m.url)}
                className="inline-flex items-center space-x-1 text-[11px] font-bold text-brand-blue hover:underline"
              >
                {copiedId === m.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(m.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Delete File"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
