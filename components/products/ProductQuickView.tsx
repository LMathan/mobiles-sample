"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ConditionBadge } from "./ConditionBadge";
import { formatINR, calculateDiscount } from "@/lib/utils";
import { generateProductWhatsAppUrl } from "@/lib/whatsapp";
import { X, MessageCircle, ShieldCheck, CheckCircle2, ArrowRightLeft, Heart, Smartphone } from "lucide-react";
import Link from "next/link";

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToInquiry,
    isInWishlist,
    toggleWishlist,
    isInCompare,
    addToCompare,
    removeFromCompare,
  } = useApp();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discountPct = product.discount || calculateDiscount(product.originalPrice, product.price);
  const whatsappUrl = generateProductWhatsAppUrl(product);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Image */}
          <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-2xl relative border border-slate-100">
            <div className="absolute top-3 left-3">
              <ConditionBadge condition={product.condition} size="md" />
            </div>

            <img
              src={product.images[0]}
              alt={product.name}
              className="max-h-72 object-contain py-4"
            />

            {product.batteryHealth && (
              <div className="mt-2 w-full bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl p-3 flex items-center gap-2 text-xs text-[#388E3C] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#388E3C] flex-shrink-0" />
                <span>Verified Battery Health: {product.batteryHealth}%</span>
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-[#2874F0] uppercase">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-full text-slate-700">
                  {product.storage} {product.ram ? `• ${product.ram}` : ""}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-slate-900">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="text-xs font-bold text-[#388E3C] bg-[#E8F5E9] px-2 py-0.5 rounded">
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Physical Condition detail */}
              {product.physicalCondition && (
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-0.5">Physical Condition:</strong>
                  {product.physicalCondition}
                </div>
              )}

              {/* Quick Specs List */}
              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2874F0] flex-shrink-0" />
                  <span><strong>Display:</strong> {product.display}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2874F0] flex-shrink-0" />
                  <span><strong>Processor:</strong> {product.processor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2874F0] flex-shrink-0" />
                  <span><strong>Camera:</strong> {product.camera}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2874F0] flex-shrink-0" />
                  <span><strong>Warranty:</strong> {product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Quick View Actions */}
            <div className="pt-6 space-y-3 border-t border-slate-100 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToInquiry(product);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Add to Cart / Order</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#388E3C] hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Store</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 font-semibold ${isLiked ? "text-rose-500" : "text-slate-500 hover:text-slate-900"}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  <span>{isLiked ? "Saved to Wishlist" : "Save to Wishlist"}</span>
                </button>

                <button
                  onClick={() => isCompared ? removeFromCompare(product.id) : addToCompare(product.id)}
                  className={`flex items-center gap-1.5 font-semibold ${isCompared ? "text-[#2874F0]" : "text-slate-500 hover:text-slate-900"}`}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>{isCompared ? "In Comparison" : "Compare Specs"}</span>
                </button>

                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-[#2874F0] font-bold hover:underline"
                >
                  Full Specs →
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
