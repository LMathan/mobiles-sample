"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS_DATA } from "@/data/products";
import { ConditionBadge } from "@/components/products/ConditionBadge";
import { formatINR, calculateDiscount } from "@/lib/utils";
import { generateProductWhatsAppUrl, generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  ArrowRightLeft,
  MessageCircle,
  PhoneCall,
  ShoppingBag,
  Truck,
  Store,
  ArrowLeft,
  ChevronRight,
  Package,
  BatteryCharging
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = PRODUCTS_DATA.find((p) => p.id === id);

  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    addToCompare,
    removeFromCompare,
    addToInquiry,
  } = useApp();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Smartphone Not Found</h1>
        <p className="text-xs text-slate-500">The requested device ID does not exist in our catalog dataset.</p>
        <Link href="/shop" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs inline-block">
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const discountPct = product.discount || calculateDiscount(product.originalPrice, product.price);
  const whatsappUrl = generateProductWhatsAppUrl(product, selectedColor, selectedStorage);

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.brand === product.brand && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 md:pb-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-slate-900">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop?brand=${product.brand}`} className="hover:text-slate-900">{product.brand}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold truncate max-w-[150px]">{product.name}</span>
      </nav>

      {/* Main Gallery & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="relative aspect-[4/3] w-full bg-white rounded-3xl border border-slate-200 p-6 flex items-center justify-center shadow-md overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <ConditionBadge condition={product.condition} size="lg" />
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isLiked ? "bg-rose-500 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={() => isCompared ? removeFromCompare(product.id) : addToCompare(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isCompared ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="max-h-80 object-contain transition-all duration-300"
            />
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-2xl bg-white border p-2 flex-shrink-0 transition-all ${
                    selectedImageIdx === idx
                      ? "border-blue-600 ring-2 ring-blue-500/20"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Battery Health Banner for Used/Demo */}
          {product.batteryHealth && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-900 font-semibold">
              <BatteryCharging className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span>Verified Battery Health: <strong>{product.batteryHealth}%</strong></span>
                <p className="text-[11px] text-emerald-700 font-normal mt-0.5">
                  Tested with diagnostic tools to ensure maximum charge retention.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Specification Details & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                {product.brand}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ● {product.stockStatus}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-0.5">Store Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {discountPct > 0 && (
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Save {discountPct}%
              </span>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-900">
                Selected Color: <strong className="text-blue-600">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedColor === c.name
                        ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage Specs */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-900">
              Storage Capacity
            </span>
            <div className="flex items-center gap-2">
              {["128GB", "256GB", "512GB", "1TB"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStorage(st)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedStorage === st
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Physical Condition Breakdown for USED/DEMO */}
          {product.physicalCondition && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="font-extrabold text-slate-900 block">Physical Cosmetic State:</span>
              <p className="text-slate-600">{product.physicalCondition}</p>
            </div>
          )}

          {/* Specification Summary Table */}
          <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-2xl bg-white border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px]">Display</span>
              <strong className="text-slate-900">{product.display}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Processor</span>
              <strong className="text-slate-900">{product.processor}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Camera</span>
              <strong className="text-slate-900">{product.camera}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Battery & Charging</span>
              <strong className="text-slate-900">{product.battery}</strong>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500">Warranty Coverage:</span>
              <strong className="text-blue-600">{product.warranty}</strong>
            </div>
          </div>

          {/* In-Box Accessories */}
          {product.inBoxAccessories && product.inBoxAccessories.length > 0 && (
            <div className="space-y-1.5 text-xs">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Included in Box:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.inBoxAccessories.map((acc, i) => (
                  <span key={i} className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                    ✓ {acc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => addToInquiry(product, selectedColor, selectedStorage)}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart / Order</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Buy / Order on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

      {/* Related Brand Smartphones */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900">
            More from {product.brand}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar on Mobile */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 shadow-2xl flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => addToInquiry(product, selectedColor, selectedStorage)}
          className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
}
