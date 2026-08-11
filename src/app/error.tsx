"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold mx-auto">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-brand-dark">Something went wrong</h1>
      <p className="text-xs text-slate-500 max-w-md">
        An unexpected error occurred while loading this page. Please try refreshing.
      </p>
      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center space-x-1.5 bg-brand-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="text-xs font-bold text-slate-600 bg-slate-200 px-4 py-2.5 rounded-xl"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
