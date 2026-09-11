"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { Search, X, Smartphone, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { ConditionBadge } from "../products/ConditionBadge";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useApp();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const filtered = query.trim() === "" 
    ? [] 
    : PRODUCTS_DATA.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          p.processor.toLowerCase().includes(q) ||
          (q.includes("under") && p.price < parseInt(q.replace(/[^0-9]/g, "") || "0")) ||
          (q.includes("demo") && p.condition === "DEMO") ||
          (q.includes("used") && (p.condition === "PRE-OWNED" || p.condition === "LIGHTLY USED")) ||
          (q.includes("iphone") && p.brand === "Apple") ||
          (q.includes("samsung") && p.brand === "Samsung")
        );
      });

  const popularSearches = ["iPhone 15 Pro", "Samsung S24 Ultra", "Demo Devices", "Under 20000", "OnePlus 12", "Nothing Phone"];

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden animate-in slide-in-from-top-4 duration-300">
        
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#2874F0] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search iPhone, Samsung, demo phones, under 20000..."
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 font-semibold text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 rounded-xl bg-[#2874F0] text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === "" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#2874F0] text-slate-700 text-xs font-semibold transition-colors border border-slate-200/80"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm space-y-2">
              <Smartphone className="w-8 h-8 mx-auto text-slate-400" />
              <p>No matching smartphones found for &quot;{query}&quot;.</p>
              <p className="text-xs text-slate-400">Try searching &quot;Apple&quot;, &quot;Demo&quot;, or &quot;5G&quot;.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium pb-1 border-b border-slate-100">
                <span>Matching Devices ({filtered.length})</span>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[#2874F0] font-bold hover:underline"
                >
                  View All in Shop →
                </Link>
              </div>

              {filtered.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200"
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-contain bg-slate-50 p-1 rounded-xl border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900 group-hover:text-[#2874F0] transition-colors">
                          {product.brand} {product.name}
                        </span>
                        <ConditionBadge condition={product.condition} size="sm" showDot={false} />
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {product.storage} • {product.processor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-slate-900">
                      {formatINR(product.price)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
