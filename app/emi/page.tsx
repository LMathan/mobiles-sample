"use client";

import React from "react";
import { EmiCalculator } from "@/components/emi/EmiCalculator";
import { Calculator } from "lucide-react";

export default function EmiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
          <Calculator className="w-4 h-4" />
          <span>Flexible Smartphone Financing</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Make your upgrade easier.
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Select your favorite smartphone and choose a comfortable monthly installment plan. EMI options available for new, demo, and pre-owned devices.
        </p>
      </div>

      <EmiCalculator />

    </div>
  );
}
