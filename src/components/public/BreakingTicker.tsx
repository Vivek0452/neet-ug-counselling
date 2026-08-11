"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronRight, Flame } from "lucide-react";
import { store } from "@/lib/mockData";
import { UpdateItem } from "@/types";

export default function BreakingTicker() {
  const [breakingUpdates, setBreakingUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    // Initial fetch
    const loadBreaking = () => {
      const active = store.updates.filter(
        (u) => u.is_breaking && u.status === "published"
      );
      setBreakingUpdates(active);
    };

    loadBreaking();

    // Subscribe to store updates
    const unsubscribe = store.subscribe(loadBreaking);
    return () => unsubscribe();
  }, []);

  if (breakingUpdates.length === 0) return null;

  return (
    <div className="bg-red-600 text-white text-xs font-semibold overflow-hidden border-b border-red-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-2">
        {/* Ticker Badge */}
        <div className="flex items-center space-x-1.5 bg-red-800 text-red-100 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 mr-3 animate-pulse">
          <Flame className="w-3.5 h-3.5 text-yellow-300" />
          <span>BREAKING NEWS</span>
        </div>

        {/* Marquee / Live Item Feed */}
        <div className="flex-1 overflow-hidden relative">
          <div className="whitespace-nowrap flex items-center space-x-6">
            {breakingUpdates.map((item) => (
              <Link
                key={item.id}
                href={`/updates/${item.slug}`}
                className="inline-flex items-center hover:underline space-x-1.5 transition-opacity hover:opacity-90"
              >
                <span className="text-yellow-200 font-bold">[{item.authority || "ALERT"}]:</span>
                <span className="text-white truncate max-w-md sm:max-w-xl">{item.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-red-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
