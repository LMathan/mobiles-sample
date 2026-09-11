"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductBrand, ProductCondition } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from "lucide-react";
import { formatINR } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand") || "";
  const initialCondition = searchParams.get("condition") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(initialCondition ? [initialCondition] : []);
  const [maxPrice, setMaxPrice] = useState<number>(160000);
  const [fiveGOnly, setFiveGOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allBrands: ProductBrand[] = ["Apple", "Samsung", "OnePlus", "Vivo", "Oppo", "Realme", "Xiaomi", "Motorola", "Nothing", "Google Pixel"];
  const allConditions: ProductCondition[] = ["NEW", "DEMO", "LIGHTLY USED", "PRE-OWNED"];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleConditionToggle = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedConditions([]);
    setMaxPrice(160000);
    setFiveGOnly(false);
    setSortBy("featured");
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCondition = product.condition.toLowerCase().includes(q);
        const matchProcessor = product.processor.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCondition && !matchProcessor) return false;
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) return false;
      if (product.price > maxPrice) return false;
      if (fiveGOnly && !product.fiveG) return false;

      if (initialCategory && !product.category.includes(initialCategory) && !product.tags.includes(initialCategory)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [search, selectedBrands, selectedConditions, maxPrice, fiveGOnly, sortBy, initialCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Catalog & Inventory
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smartphone Store Catalog
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Browse new, demo, and certified pre-owned devices in stock
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-bold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Just Arrived</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid & Filters Split */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Keyword Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search model, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          {/* Brand Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Brand
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {allBrands.map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandToggle(b)}
                    className="rounded accent-blue-600"
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition Checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Condition
            </h4>
            <div className="space-y-1.5">
              {allConditions.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(c)}
                    onChange={() => handleConditionToggle(c)}
                    className="rounded accent-blue-600"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Max Price</span>
              <span className="text-blue-600 font-mono">{formatINR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={160000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* 5G Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center justify-between text-xs font-bold text-slate-900 cursor-pointer">
              <span>5G Capable Only</span>
              <input
                type="checkbox"
                checked={fiveGOnly}
                onChange={(e) => setFiveGOnly(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>
          </div>

        </aside>

        {/* Product Grid Listing */}
        <main className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredProducts.length} smartphones</span>
            {(selectedBrands.length > 0 || selectedConditions.length > 0 || search) && (
              <span className="text-blue-600 font-bold">Active filters applied</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <p className="text-slate-600 font-bold text-sm">
                No smartphones match your selected filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Bottom Sheet Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-xs h-full bg-white p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Filter Catalog</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Mobile Brand Checkbox list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</h4>
              {allBrands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-xs font-medium block text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandToggle(b)}
                    className="accent-blue-600"
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>

            {/* Mobile Condition list */}
            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Condition</h4>
              {allConditions.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs font-medium block text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(c)}
                    onChange={() => handleConditionToggle(c)}
                    className="accent-blue-600"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
