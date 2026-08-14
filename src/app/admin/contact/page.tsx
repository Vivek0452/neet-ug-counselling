"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Download, CheckCircle2, Clock, Mail, Phone } from "lucide-react";
import { store } from "@/lib/mockData";
import { ContactMessage } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchLiveMessages = async () => {
      try {
        const res = await fetch("/api/contact");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Merge with store
          json.data.forEach((msg: ContactMessage) => {
            if (!store.contacts.some((c) => c.id === msg.id)) {
              store.contacts.unshift(msg);
            }
          });
          store.notify();
        }
      } catch (err) {
        console.warn("Failed to fetch live API contact messages:", err);
      }
      setContacts([...store.contacts]);
    };

    fetchLiveMessages();
    const unsub = store.subscribe(() => setContacts([...store.contacts]));
    return () => unsub();
  }, []);

  const handleStatusChange = async (id: string, status: ContactMessage["status"]) => {
    store.updateContactStatus(id, status);
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      console.warn("Failed to patch status via API:", err);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Message", "Status", "Submitted Date"];
    const rows = contacts.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone || ""}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      `"${c.status}"`,
      `"${formatDate(c.created_at)}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `contact_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Contact Enquiries
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student and parent counselling queries submitted via the contact form.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
        {contacts.map((c) => (
          <div key={c.id} className="p-6 space-y-3 hover:bg-slate-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">{c.name}</h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{c.email}</span>
                    </span>
                    {c.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{c.phone}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400">{formatDate(c.created_at)}</span>
                <select
                  value={c.status}
                  onChange={(e) =>
                    handleStatusChange(c.id, e.target.value as ContactMessage["status"])
                  }
                  className={`text-xs font-bold py-1 px-2.5 rounded-lg border focus:outline-none ${
                    c.status === "new"
                      ? "bg-blue-50 text-brand-blue border-blue-200"
                      : c.status === "in_progress"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {c.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
