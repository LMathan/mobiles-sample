"use client";

import React from "react";
import { ExchangeCalculator } from "@/components/exchange/ExchangeCalculator";
import { ArrowRightLeft, ShieldCheck, Zap, RefreshCcw } from "lucide-react";

export default function ExchangePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
          <ArrowRightLeft className="w-4 h-4" />
          <span>Nova Mobile Trade-in Guarantee</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Upgrade without paying the full price.
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Trade in your current smartphone and use its verified market value toward your next new, demo or pre-owned device upgrade.
        </p>
      </div>

      {/* Interactive Exchange Form Calculator */}
      <ExchangeCalculator />

      {/* 3 Step Exchange Process */}
      <div className="space-y-6 pt-6">
        <h3 className="text-2xl font-extrabold text-slate-900 text-center">
          How Phone Exchange Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">Submit Device Info</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill out your device brand, model, storage, and cosmetic state in our calculator above.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">Instant Store Check</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bring your device to any Nova store outlet or share photos on WhatsApp for final diagnostic approval.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">Deduct & Upgrade</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Offset your trade-in amount directly from your new phone invoice and pay only the difference!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
