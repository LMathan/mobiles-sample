"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { generateInquiryListWhatsAppUrl } from "@/lib/whatsapp";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { ConditionBadge } from "../products/ConditionBadge";
import Link from "next/link";

export const InquiryDrawer: React.FC = () => {
  const {
    isInquiryOpen,
    setIsInquiryOpen,
    inquiryItems,
    removeFromInquiry,
    updateInquiryQty,
    clearInquiry,
  } = useApp();

  if (!isInquiryOpen) return null;

  const totalEstimate = inquiryItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const whatsappUrl = generateInquiryListWhatsAppUrl(inquiryItems);

  return (
    <div className="fixed inset-0 z-[110] flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop overlay click */}
      <div
        className="fixed inset-0"
        onClick={() => setIsInquiryOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#2874F0] text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                My Enquiries
              </h3>
              <p className="text-xs text-slate-500">
                {inquiryItems.length} {inquiryItems.length === 1 ? "device" : "devices"} saved for store assist
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsInquiryOpen(false)}
            aria-label="Close tray"
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {inquiryItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Your Inquiry Tray is empty
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Add smartphones from our collection to check availability, exchange values, and EMI options in one click.
                </p>
              </div>
              <button
                onClick={() => setIsInquiryOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#2874F0] text-white font-bold text-xs shadow-md transition-colors"
              >
                Browse Smartphones
              </button>
            </div>
          ) : (
            inquiryItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <ConditionBadge condition={item.product.condition} size="sm" showDot={false} />
                    <button
                      onClick={() => removeFromInquiry(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs truncate">
                    {item.product.brand} {item.product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {item.selectedStorage || item.product.storage} • {formatINR(item.product.price)}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateInquiryQty(item.product.id, -1)}
                        className="p-1 hover:bg-slate-100 text-slate-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateInquiryQty(item.product.id, 1)}
                        className="p-1 hover:bg-slate-100 text-slate-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-xs text-slate-900">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {inquiryItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Estimated Total Value</span>
              <strong className="text-base font-black text-slate-900">
                {formatINR(totalEstimate)}
              </strong>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight">
              No immediate online payment required. Send this enquiry directly to our store team on WhatsApp for availability.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsInquiryOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#388E3C] hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send WhatsApp Enquiry</span>
              </a>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={clearInquiry}
                  className="text-slate-400 hover:text-rose-500 font-semibold"
                >
                  Clear All
                </button>
                <Link
                  href="/enquire"
                  onClick={() => setIsInquiryOpen(false)}
                  className="text-[#2874F0] font-bold hover:underline flex items-center gap-1"
                >
                  <span>View Details Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
