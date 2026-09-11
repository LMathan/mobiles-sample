"use client";

import React from "react";
import Link from "next/link";
import { Smartphone, ShieldCheck, RefreshCw, Calculator, Store, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Independent Mobile Retailer
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Your local smartphone destination.
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
          We bring high-end retail expertise, certified hardware testing, and transparent trade-in value to every customer looking for a smartphone upgrade.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Product Variety</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From brand-new flagships to certified pre-owned options, we stock the widest range of Apple, Samsung, OnePlus, Vivo, Oppo, Xiaomi, Nothing, and Motorola devices.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Certified Hardware Inspection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every pre-owned and demo smartphone undergoes a comprehensive 45-point inspection covering screen responsiveness, camera sensors, battery health, and 5G band connectivity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Exchange & EMI Flexibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Upgrade seamlessly with instant old-phone trade-in values and flexible monthly installment options tailored to your monthly budget.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">In-Store Assistance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Experience devices in person at our store outlets, receive free data transfer assistance, and walk out with your configured device in minutes.
          </p>
        </div>

      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-extrabold">Visit our store or browse online</h2>
        <p className="text-blue-100 text-xs max-w-md mx-auto">
          Explore our complete inventory of new, demo, and pre-owned smartphones today.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 font-extrabold text-xs shadow-lg inline-flex items-center gap-2 transition-colors"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
