"use client";

import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  emptyMessage = "No smartphones match your search or filter criteria.",
}) => {
  if (products.length === 0) {
    return (
      <div className="w-full text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm font-medium">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {(title || subtitle) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            {title && (
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
            Showing {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx < 4} />
        ))}
      </div>
    </div>
  );
};
