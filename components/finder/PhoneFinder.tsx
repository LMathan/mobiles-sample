"use client";

import React, { useState } from "react";
import { PRODUCTS_DATA } from "@/data/products";
import { Product } from "@/types";
import { ProductCard } from "../products/ProductCard";
import { Sparkles, ArrowRight, RotateCcw, Compass } from "lucide-react";

export const PhoneFinder: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [budget, setBudget] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  const budgetOptions = [
    { label: "Under ₹10,000", max: 10000, min: 0 },
    { label: "₹10,000 – ₹20,000", max: 20000, min: 10000 },
    { label: "₹20,000 – ₹30,000", max: 30000, min: 20000 },
    { label: "₹30,000 – ₹50,000", max: 50000, min: 30000 },
    { label: "₹50,000+", max: 999999, min: 50000 },
  ];

  const priorityOptions = [
    { label: "Best Camera", desc: "For stunning portraits & 4K video" },
    { label: "Gaming", desc: "High frame rate & vapor cooling" },
    { label: "Long Battery", desc: "5000mAh+ & superfast charging" },
    { label: "Flagship Performance", desc: "Top processors & zero lag" },
    { label: "Best Value", desc: "Maximum specs for minimum price" },
    { label: "iPhone Experience", desc: "iOS ecosystem & long life" },
  ];

  const brandOptions = ["Any", "Apple", "Samsung", "OnePlus", "Vivo", "Oppo", "Nothing", "Xiaomi"];

  const handleReset = () => {
    setBudget("");
    setPriority("");
    setBrand("");
    setStep(1);
  };

  const getFilteredRecommendations = (): Product[] => {
    return PRODUCTS_DATA.filter((product) => {
      if (budget) {
        const foundB = budgetOptions.find((b) => b.label === budget);
        if (foundB) {
          if (product.price < foundB.min || product.price > foundB.max) return false;
        }
      }

      if (priority === "Best Camera" && !product.category.includes("Camera") && !product.tags.includes("Camera")) return false;
      if (priority === "Gaming" && product.category !== "Best Gaming" && !product.tags.includes("Gaming")) return false;
      if (priority === "Long Battery" && product.category !== "Best Battery" && !product.tags.includes("100W Charging")) return false;
      if (priority === "iPhone Experience" && product.brand !== "Apple") return false;

      if (brand && brand !== "Any") {
        if (product.brand !== brand) return false;
      }

      return true;
    });
  };

  const recommendations = getFilteredRecommendations();

  return (
    <section className="w-full bg-white text-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 shadow-card space-y-6">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2874F0] text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Smart Phone Finder Wizard</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Not sure which phone to choose?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Tell us what matters to you and we&apos;ll narrow down the ideal options in 3 clicks.
          </p>
        </div>

        {step > 1 && (
          <button
            onClick={handleReset}
            className="text-xs font-bold text-slate-500 hover:text-[#2874F0] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 transition-colors w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        )}
      </div>

      {/* Step Wizard Bar */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-xl mx-auto text-center">
        <div className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${step === 1 ? "bg-[#2874F0] border-[#2874F0] text-white shadow-xs" : step > 1 ? "bg-[#E8F5E9] border-[#C8E6C9] text-[#388E3C]" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
          <span>Step 1: Budget</span>
        </div>
        <div className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${step === 2 ? "bg-[#2874F0] border-[#2874F0] text-white shadow-xs" : step > 2 ? "bg-[#E8F5E9] border-[#C8E6C9] text-[#388E3C]" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
          <span>Step 2: Priority</span>
        </div>
        <div className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${step === 3 || step === 4 ? "bg-[#2874F0] border-[#2874F0] text-white shadow-xs" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
          <span>Step 3: Brand</span>
        </div>
      </div>

      {/* Step 1: Budget Selection */}
      {step === 1 && (
        <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
          <h3 className="text-center text-xs font-bold text-slate-600">
            Select your budget range:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setBudget(opt.label);
                  setStep(2);
                }}
                className={`p-4 rounded-2xl border text-left transition-all font-extrabold text-xs flex items-center justify-between group ${
                  budget === opt.label
                    ? "bg-[#2874F0] border-[#2874F0] text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50 hover:border-[#2874F0]"
                }`}
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Priority Selection */}
      {step === 2 && (
        <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
          <h3 className="text-center text-xs font-bold text-slate-600">
            What is your primary priority? (Budget: <span className="text-[#2874F0]">{budget}</span>)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {priorityOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setPriority(opt.label);
                  setStep(3);
                }}
                className={`p-4 rounded-2xl border text-left transition-all font-bold text-xs space-y-1 group ${
                  priority === opt.label
                    ? "bg-[#2874F0] border-[#2874F0] text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50 hover:border-[#2874F0]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span>{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform opacity-70" />
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Brand Preference */}
      {step === 3 && (
        <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
          <h3 className="text-center text-xs font-bold text-slate-600">
            Do you have a preferred brand?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {brandOptions.map((b) => (
              <button
                key={b}
                onClick={() => {
                  setBrand(b);
                  setStep(4);
                }}
                className={`px-5 py-3 rounded-2xl border text-xs font-extrabold transition-all ${
                  brand === b
                    ? "bg-[#2874F0] border-[#2874F0] text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50 hover:border-[#2874F0]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Recommendations Display */}
      {step === 4 && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F0F5FF] p-4 rounded-2xl border border-[#D0E2FF]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Matches for: <strong>{budget}</strong> • <strong>{priority}</strong> • <strong>{brand}</strong></span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-extrabold text-[#2874F0] hover:underline"
            >
              Change Preferences
            </button>
          </div>

          {recommendations.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <p className="text-xs font-bold">No exact match found for these precise filters.</p>
              <button
                onClick={() => {
                  setBrand("Any");
                  setStep(4);
                }}
                className="px-4 py-2 bg-[#2874F0] text-white rounded-xl text-xs font-bold"
              >
                Show matches across all brands
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

    </section>
  );
};
