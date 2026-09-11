"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { formatINR } from "@/lib/utils";
import { ConditionBadge } from "@/components/products/ConditionBadge";
import { ArrowRightLeft, X, Plus, MessageCircle, Check, Smartphone } from "lucide-react";
import { generateProductWhatsAppUrl } from "@/lib/whatsapp";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToInquiry } = useApp();

  const selectedProducts = PRODUCTS_DATA.filter((p) => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Side-by-Side Comparison
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Smartphones
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Compare up to 3 smartphones across technical specifications, pricing, and warranty.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {selectedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              No smartphones selected for comparison
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click the compare icon on product cards across the shop to add up to 3 devices side-by-side.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md inline-block transition-colors"
          >
            Browse Smartphones Catalog
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            
            {/* Header Row: Products */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 w-48 font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                  Feature / Spec
                </th>
                {selectedProducts.map((product) => (
                  <th key={product.id} className="p-4 min-w-[240px] align-top relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      aria-label="Remove product"
                      className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-3">
                      <div className="aspect-[4/3] w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100">
                        <img src={product.images[0]} alt={product.name} className="h-36 object-contain" />
                      </div>

                      <div className="space-y-1">
                        <ConditionBadge condition={product.condition} size="sm" />
                        <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                          {product.brand} {product.name}
                        </h3>
                        <span className="text-base font-black text-blue-600 block">
                          {formatINR(product.price)}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <button
                          onClick={() => addToInquiry(product)}
                          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                        >
                          + Add to Cart / Order
                        </button>
                        <a
                          href={generateProductWhatsAppUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </th>
                ))}
                {selectedProducts.length < 3 && (
                  <th className="p-4 min-w-[200px] align-middle text-center bg-slate-50/50">
                    <Link href="/shop" className="p-6 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                      <Plus className="w-8 h-8 mb-2" />
                      <span className="font-bold text-xs">Add Another Device</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            {/* Spec Matrix Body */}
            <tbody className="divide-y divide-slate-100">
              
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Condition</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-900">{p.condition}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Storage / RAM</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-mono text-slate-900">{p.storage} {p.ram ? `• ${p.ram}` : ""}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Display Screen</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-900">{p.display}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Processor Chipset</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-900">{p.processor}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Camera Setup</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-900">{p.camera}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Battery & Charging</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-900">{p.battery}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Battery Health</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-mono font-bold text-emerald-600">
                    {p.batteryHealth ? `${p.batteryHealth}% Verified` : "100% Brand New"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">5G Network</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-blue-600">{p.fiveG ? "✓ 5G Supported" : "4G LTE"}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Warranty</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-900">{p.warranty}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Exchange Available</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-slate-900">{p.exchangeAvailable ? "✓ Yes" : "No"}</td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
