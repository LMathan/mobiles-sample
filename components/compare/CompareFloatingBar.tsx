"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { X, ArrowRightLeft, Trash2 } from "lucide-react";
import { formatINR } from "@/lib/utils";

export const CompareFloatingBar: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useApp();

  if (compareList.length === 0) return null;

  const comparedProducts = PRODUCTS_DATA.filter((p) => compareList.includes(p.id));

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[95%] max-w-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-2xl p-3 md:p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Icon & Count */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#2874F0] flex items-center justify-center text-white">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Compare Phones</h4>
            <span className="text-[10px] text-slate-500 font-medium">
              {comparedProducts.length} of 3 selected
            </span>
          </div>
        </div>

        {/* Selected Products Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {comparedProducts.map((product) => (
            <div
              key={product.id}
              className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 pr-3 text-xs flex-shrink-0"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-8 h-8 object-contain rounded bg-white"
              />
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 block text-[11px] truncate max-w-[90px]">
                  {product.name}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono font-bold">
                  {formatINR(product.price)}
                </span>
              </div>
              <button
                onClick={() => removeFromCompare(product.id)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-500 transition-colors"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCompare}
            title="Clear all"
            className="p-2 text-slate-400 hover:text-rose-500 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <Link
            href="/compare"
            className="px-4 py-2 bg-[#2874F0] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Compare Now</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
