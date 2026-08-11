"use client";

import React, { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X } from "lucide-react";
import Papa from "papaparse";

interface CsvImporterProps {
  title: string;
  expectedHeaders: string[];
  onImport: (parsedRows: Record<string, any>[]) => void;
  onClose: () => void;
}

export default function CsvImporter({
  title,
  expectedHeaders,
  onImport,
  onClose,
}: CsvImporterProps) {
  const [csvText, setCsvText] = useState("");
  const [parsedData, setParsedData] = useState<Record<string, any>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError("Error parsing CSV file: " + results.errors[0].message);
        } else {
          setHeaders(results.meta.fields || []);
          setParsedData(results.data as Record<string, any>[]);
          setError("");
        }
      },
    });
  };

  const handlePasteParse = () => {
    if (!csvText.trim()) return;
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setHeaders(results.meta.fields || []);
        setParsedData(results.data as Record<string, any>[]);
        setError("");
      },
    });
  };

  const handleConfirmImport = () => {
    if (parsedData.length === 0) return;
    onImport(parsedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-brand-border">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-brand-dark">{title}</h3>
              <p className="text-xs text-slate-500">Upload or paste CSV data to import in bulk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
            <Upload className="w-8 h-8 text-brand-blue mx-auto" />
            <div>
              <label className="cursor-pointer inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md">
                <span>Select CSV / Excel File</span>
                <input
                  type="file"
                  accept=".csv, .txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-[11px] text-slate-400">Supported columns: {expectedHeaders.join(", ")}</p>
          </div>

          {/* Textarea Paste Alternative */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Or Paste Raw CSV Content</label>
            <textarea
              rows={3}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste header and comma-separated rows here..."
              className="w-full p-3 font-mono text-[11px] border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
            />
            <button
              type="button"
              onClick={handlePasteParse}
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              Parse Pasted CSV
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Preview Table */}
          {parsedData.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">
                  Parsed Data Preview ({parsedData.length} Rows)
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  READY TO IMPORT
                </span>
              </div>
              <div className="max-h-48 overflow-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      {headers.map((h) => (
                        <th key={h} className="p-2 border-b">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {parsedData.slice(0, 10).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        {headers.map((h) => (
                          <td key={h} className="p-2 truncate max-w-[150px]">
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={parsedData.length === 0}
            onClick={handleConfirmImport}
            className="disabled:opacity-50 inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Import {parsedData.length} Records</span>
          </button>
        </div>
      </div>
    </div>
  );
}
