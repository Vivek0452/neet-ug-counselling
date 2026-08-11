import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold mx-auto">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-brand-dark">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md">
        The counselling page, document, or notice you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
