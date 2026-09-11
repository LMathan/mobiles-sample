"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { generateInquiryListWhatsAppUrl } from "@/lib/whatsapp";
import { ConditionBadge } from "@/components/products/ConditionBadge";
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function EnquirePage() {
  const {
    inquiryItems,
    removeFromInquiry,
    updateInquiryQty,
    clearInquiry,
  } = useApp();

  const totalEstimate = inquiryItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const whatsappUrl = generateInquiryListWhatsAppUrl(inquiryItems);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Enquiry-Assisted Commerce
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Cart & Order List ({inquiryItems.length})
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Review your selected smartphones before connecting with our store team on WhatsApp.
          </p>
        </div>

        {inquiryItems.length > 0 && (
          <button
            onClick={clearInquiry}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Items</span>
          </button>
        )}
      </div>

      {inquiryItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Your Cart / Order List is Empty
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add smartphones from the shop catalog to consolidate your questions into a single order inquiry.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md inline-block transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Item List Left Column */}
          <div className="lg:col-span-8 space-y-4">
            {inquiryItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain bg-slate-50 p-2 rounded-2xl border border-slate-100"
                  />
                  
                  <div className="space-y-1">
                    <ConditionBadge condition={item.product.condition} size="sm" />
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {item.product.brand} {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {item.selectedStorage || item.product.storage} • {item.selectedColor || item.product.colors[0]?.name}
                    </p>
                    <span className="text-sm font-black text-blue-600 block">
                      {formatINR(item.product.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => updateInquiryQty(item.product.id, -1)}
                      className="p-1 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateInquiryQty(item.product.id, 1)}
                      className="p-1 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromInquiry(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            ))}
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 bg-white text-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-slate-900">Order Summary</h3>
              <p className="text-xs text-slate-600">
                Direct store assistance & order placement via WhatsApp.
              </p>
            </div>

            <div className="space-y-3 text-xs border-t border-b border-slate-100 py-4">
              <div className="flex justify-between text-slate-600">
                <span>Total Devices:</span>
                <strong className="text-slate-900 font-bold">{inquiryItems.reduce((a, b) => a + b.quantity, 0)}</strong>
              </div>
              <div className="flex justify-between text-slate-600 items-center">
                <span>Estimated Price:</span>
                <strong className="text-xl font-black text-blue-600">{formatINR(totalEstimate)}</strong>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Place Order / Enquiry on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant store availability confirmation</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
