"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { store } from "@/lib/mockData";

export default function AdminSettingsPage() {
  const [siteTitle, setSiteTitle] = useState("NEET UG Counselling 2026 — Official Portal");
  const [metaDesc, setMetaDesc] = useState("Simple and reliable information for NEET UG medical counselling in India.");
  const [canonicalUrl, setCanonicalUrl] = useState("https://neetugcounselling.in");
  const [ogImage, setOgImage] = useState("https://neetugcounselling.in/og-image.jpg");
  const [robotsIndex, setRobotsIndex] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.addLog("Updated SEO Settings", "Settings", "site_settings", "Updated site meta title & indexing configuration.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
          Website Settings & Global SEO
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure site meta title, default description, OpenGraph images, and search engine indexing.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Website SEO & Site Settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-brand-dark border-b pb-2">Global Meta & OpenGraph</h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Portal Title Tag *</label>
            <input
              type="text"
              required
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Global Meta Description *</label>
            <textarea
              rows={3}
              required
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Canonical Base URL</label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">OpenGraph Image URL</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-brand-dark border-b pb-2">Search Engine Robots & Indexing</h3>

          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="robots"
              checked={robotsIndex}
              onChange={(e) => setRobotsIndex(e.target.checked)}
              className="w-4 h-4 text-brand-blue rounded"
            />
            <label htmlFor="robots" className="font-bold text-slate-700 cursor-pointer">
              Allow Search Engine Indexing (robots.txt: User-agent: * Allow: /)
            </label>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
