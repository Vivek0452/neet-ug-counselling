"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Download, X } from "lucide-react";
import { store } from "@/lib/mockData";
import { DocumentItem } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<DocumentItem["category"]>("General");
  const [pdfUrl, setPdfUrl] = useState("");
  const [fileSize, setFileSize] = useState("1.5 MB");

  useEffect(() => {
    const load = () => setDocuments([...store.documents]);
    load();
    const unsub = store.subscribe(load);
    return () => unsub();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !pdfUrl) return;

    store.addDocument({
      title,
      description,
      category,
      pdf_url: pdfUrl,
      file_size: fileSize,
    });

    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setPdfUrl("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Document Downloads CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload PDF brochures, domicile formats, OBC/EWS proformas, and admission checklists.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-1.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New PDF Document</span>
        </button>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 font-bold text-brand-dark border-b border-slate-200">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Size</th>
                <th className="p-4">Uploaded Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-brand-dark">
                    {doc.title}
                    {doc.description && (
                      <p className="text-[11px] text-slate-500 font-normal line-clamp-1">{doc.description}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-brand-blue font-bold px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{doc.file_size || "-"}</td>
                  <td className="p-4 text-slate-600">{formatDate(doc.uploaded_at)}</td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={doc.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg inline-block"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => store.deleteDocument(doc.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-brand-dark">Upload / Add Document</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Proforma for OBC-NCL Certificate"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocumentItem["category"])}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                >
                  <option value="General">General</option>
                  <option value="MCC">MCC</option>
                  <option value="State Counselling">State Counselling</option>
                  <option value="Category">Category</option>
                  <option value="Domicile">Domicile</option>
                  <option value="NRI">NRI</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PDF File URL *</label>
                <input
                  type="text"
                  required
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="/docs/obc-ncl-central-format.pdf"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief details about document usage..."
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
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
