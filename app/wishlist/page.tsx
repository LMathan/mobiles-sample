"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useApp();

  const savedProducts = PRODUCTS_DATA.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Saved Favorites
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist ({savedProducts.length})
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Smartphones you have saved for later review or store visit.
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Your Wishlist is empty
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click the heart icon on any smartphone card to save it here.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md inline-block transition-colors"
          >
            Explore Smartphones
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
