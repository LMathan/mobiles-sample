"use client";

import React, { useState } from "react";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Sparkles, Tag, Flame } from "lucide-react";

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Deals");

  const dealCategories = [
    "All Deals",
    "Today's Deals",
    "Under ₹10K",
    "Under ₹20K",
    "Premium Deals",
    "Demo Deals",
    "Used Phone Deals",
  ];

  const filteredDeals = PRODUCTS_DATA.filter((p) => {
    if (activeCategory === "All Deals") return p.isDeal || p.discount > 15;
    if (activeCategory === "Today's Deals") return p.isDeal;
    if (activeCategory === "Under ₹10K") return p.price <= 10000;
    if (activeCategory === "Under ₹20K") return p.price <= 20000;
    if (activeCategory === "Premium Deals") return p.price >= 50000 && p.isDeal;
    if (activeCategory === "Demo Deals") return p.condition === "DEMO";
    if (activeCategory === "Used Phone Deals") return p.condition === "PRE-OWNED" || p.condition === "LIGHTLY USED";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200">
          <Flame className="w-4 h-4 fill-current" />
          <span>Exclusive Retail Deals & Clearance</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Deals worth checking out.
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Save big on genuine demo units, certified pre-owned devices, and brand-new price drops.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {dealCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredDeals.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs">
          No deal items found in &quot;{activeCategory}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDeals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

    </div>
  );
}
