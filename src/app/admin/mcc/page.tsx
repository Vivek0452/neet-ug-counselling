"use client";

import React, { useState } from "react";
import { Globe, Edit2, Save, CheckCircle2 } from "lucide-react";
import { store } from "@/lib/mockData";

export default function AdminMccPage() {
  const [sections, setSections] = useState(store.mccInfo);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saved, setSaved] = useState(false);

  const handleStartEdit = (sec: typeof sections[0]) => {
    setEditingKey(sec.section_key);
    setEditTitle(sec.title);
    setEditContent(sec.content);
  };

  const handleSave = (key: string) => {
    const idx = sections.findIndex((s) => s.section_key === key);
    if (idx !== -1) {
      sections[idx].title = editTitle;
      sections[idx].content = editContent;
      sections[idx].updated_at = new Date().toISOString();
      setSections([...sections]);
      store.addLog("Updated MCC Guide", "MCC", key, `Updated section: ${editTitle}`);
    }
    setEditingKey(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
          MCC Counselling Guide CMS
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Edit non-hardcoded guidance text for 15% All India Quota, Deemed, and Central Universities.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>MCC counselling content updated successfully!</span>
        </div>
      )}

      <div className="space-y-4">
        {sections.map((sec) => (
          <div key={sec.id} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-blue-50 text-brand-blue text-[11px] font-extrabold px-3 py-1 rounded-md uppercase">
                Section: {sec.section_key}
              </span>
              {editingKey === sec.section_key ? (
                <button
                  onClick={() => handleSave(sec.section_key)}
                  className="inline-flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Section</span>
                </button>
              ) : (
                <button
                  onClick={() => handleStartEdit(sec)}
                  className="inline-flex items-center space-x-1 text-brand-blue hover:bg-blue-50 text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Content</span>
                </button>
              )}
            </div>

            {editingKey === sec.section_key ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl font-bold bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Content Text</label>
                  <textarea
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="font-extrabold text-base text-brand-dark">{sec.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {sec.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
