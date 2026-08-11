"use client";

import React, { useState, useEffect } from "react";
import { History, ShieldCheck, Search } from "lucide-react";
import { store } from "@/lib/mockData";
import { AdminLog } from "@/types";
import { formatDateTime } from "@/lib/utils";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = () => setLogs([...store.logs]);
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(search.toLowerCase())) ||
      l.admin_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Admin Activity Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of administrator actions including publishes, edits, deletes, and configuration updates.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit logs..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-white shadow-sm"
        />
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Admin Email</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-mono text-[11px]">
                    {formatDateTime(l.created_at)}
                  </td>
                  <td className="p-4 font-bold text-brand-dark">{l.admin_email}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-brand-blue font-bold px-2.5 py-0.5 rounded">
                      {l.action}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {l.content_type || "System"}
                  </td>
                  <td className="p-4 text-slate-700 max-w-md">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
