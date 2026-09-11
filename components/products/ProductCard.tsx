"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatINR, calculateDiscount } from "@/lib/utils";
import { ConditionBadge } from "./ConditionBadge";
import { useApp } from "@/context/AppContext";
import { generateProductWhatsAppUrl } from "@/lib/whatsapp";
import { Heart, Eye, ArrowRightLeft, MessageCircle, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    addToCompare,
    removeFromCompare,
    setQuickViewProduct,
    addToInquiry,
  } = useApp();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discountPct = product.discount || calculateDiscount(product.originalPrice, product.price);
  const whatsappUrl = generateProductWhatsAppUrl(product);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Product Image Area - Clean & Unobstructed */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.name}`}
            className="h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
            No Image
          </div>
        )}

        <button
          onClick={handleQuickViewClick}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#2874F0] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 z-10 hover:bg-blue-700"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </Link>

      {/* Info Body */}
      <div className="flex flex-col flex-1 p-4 space-y-2.5">
        
        {/* Top Header Row: Condition Badge + Actions (Wishlist / Compare) */}
        <div className="flex items-center justify-between gap-2">
          <ConditionBadge condition={product.condition} size="sm" />

          <div className="flex items-center gap-1">
            <button
              onClick={handleWishlistClick}
              aria-label="Add to wishlist"
              title={isLiked ? "Saved to Wishlist" : "Add to Wishlist"}
              className={`p-1.5 rounded-lg border transition-all ${
                isLiked
                  ? "bg-rose-50 border-rose-200 text-rose-600 font-bold"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleCompareClick}
              title={isCompared ? "Remove from Compare" : "Compare Specs"}
              className={`p-1.5 rounded-lg border transition-all ${
                isCompared
                  ? "bg-blue-50 border-blue-200 text-[#2874F0] font-bold"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Brand & Specs Subhead */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="uppercase tracking-wider font-extrabold text-[#2874F0]">
              {product.brand}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700">
              {product.storage} {product.ram ? `• ${product.ram}` : ""}
            </span>
          </div>

          <Link href={`/product/${product.id}`} className="group-hover:text-[#2874F0] transition-colors">
            <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Battery Health or Specs */}
        {product.batteryHealth ? (
          <div className="text-[11px] font-bold text-[#388E3C] flex items-center gap-1 bg-[#E8F5E9] px-2 py-0.5 rounded w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Battery Health: {product.batteryHealth}%</span>
          </div>
        ) : (
          <p className="text-xs text-slate-500 line-clamp-1 font-medium">
            {product.processor} • {product.display.split(" ")[0]}
          </p>
        )}

        <div className="mt-auto pt-3 flex flex-col gap-2.5 border-t border-slate-100">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            {discountPct > 0 && (
              <span className="text-xs font-bold text-[#388E3C]">
                {discountPct}% OFF
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToInquiry(product)}
              className="w-full text-xs font-bold py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              + Enquire
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-xs font-bold py-2 px-2.5 rounded-xl bg-[#388E3C] hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
