"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight, Zap } from "lucide-react";

export const FlashOfferTicker: React.FC = () => {
  const deals = [
    { label: "iPhone 13 Pre-Owned @ ₹38,999", href: "/product/iphone-13-preowned" },
    { label: "Samsung S24 Ultra Extra ₹5,000 Exchange Bonus", href: "/exchange" },
    { label: "OnePlus 12 Flowy Emerald Demo @ ₹54,999", href: "/product/oneplus-12-demo" },
    { label: "0 Down Payment EMI Schemes Available in Store", href: "/emi" },
    { label: "Certified Pre-Owned 45-Point Hardware Checked", href: "/shop?condition=PRE-OWNED" },
  ];

  return (
    <div className="w-full bg-[#2874F0] border-y border-blue-600 text-white py-2 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex items-center gap-3">

        {/* Left Label */}
        <div className="flex items-center gap-1.5 flex-shrink-0 bg-white/20 text-white px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase">
          <Flame className="w-3 h-3 fill-current animate-pulse" />
          <span className="hidden sm:inline">FLASH DEALS</span>
          <span className="sm:hidden">DEALS</span>
        </div>

        {/* Scrolling Ticker Items */}
        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-0.5 text-xs font-semibold text-blue-100 flex-1">
          {deals.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap group"
            >
              <Zap className="w-3 h-3 text-yellow-300 flex-shrink-0" />
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 text-blue-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <Link
          href="/deals"
          className="hidden md:flex items-center gap-1 text-xs font-black text-white/80 hover:text-white transition-colors flex-shrink-0"
        >
          <span>All Offers →</span>
        </Link>

      </div>
    </div>
  );
};
