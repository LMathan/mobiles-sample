"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/faqs";
import { HelpCircle, ChevronRight, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Products", "Exchange & EMI", "Store & Delivery", "General"];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (activeCategory === "All") return true;
    return faq.category === activeCategory;
  });

  const whatsappUrl = generateGeneralWhatsAppUrl("Customer Support FAQ");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
          <HelpCircle className="w-4 h-4" />
          <span>Customer Support Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Find answers regarding our new, demo, and pre-owned smartphones, exchange policies, EMI schemes, and store pickup options.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <details
            key={faq.id}
            className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs transition-all"
          >
            <summary className="font-extrabold text-sm md:text-base text-slate-900 cursor-pointer flex items-center justify-between">
              <span>{faq.question}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="mt-3 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-extrabold">Still have questions?</h3>
        <p className="text-xs text-blue-100 max-w-md mx-auto">
          Our store team is available on WhatsApp to answer any product availability, warranty, or delivery queries immediately.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
