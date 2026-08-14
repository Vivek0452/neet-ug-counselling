"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { store } from "@/lib/mockData";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      store.addContact({ name, email, phone, message });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.warn("API submission notice:", data.error);
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-wider block mb-1">
            Student & Parent Helpdesk
          </span>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            Contact Counselling Helpdesk
          </h1>
          <p className="text-sm text-brand-textSecondary mt-1 max-w-xl mx-auto">
            Have questions about NEET UG counselling registration, domicile eligibility, or security fee refunds? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Side */}
          <div className="bg-brand-dark text-white rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-brand-blue" />
                <span className="font-bold text-base">Portal Support</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our helpdesk assists students and parents with general counselling guidance and portal navigation.
              </p>

              <div className="space-y-3 pt-4 text-xs">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>support@neetugcounselling.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>1800-11-NEET (Toll Free)</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-4">
              Operational Hours: Mon - Sat (9:00 AM to 6:00 PM IST)
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2 bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">Message Submitted Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for reaching out. Our support team will review your query and reply to your email address shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-brand-blue hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg text-brand-dark mb-2">Send an Enquiry</h3>

                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full py-2 px-3 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full py-2 px-3 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full py-2 px-3 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">
                    Message / Query *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your counselling query in detail..."
                    className="w-full py-2 px-3 text-xs border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-blue hover:bg-brand-hover disabled:opacity-60 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
