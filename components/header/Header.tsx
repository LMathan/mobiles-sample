"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  Search,
  Heart,
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  Smartphone,
  ChevronRight,
  MapPin,
  Sparkles,
  RefreshCcw,
  CreditCard,
  Award,
  Headphones
} from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { wishlist, inquiryItems, setIsSearchOpen, setIsInquiryOpen } = useApp();
  const whatsappUrl = generateGeneralWhatsAppUrl();

  const categoryIcons = [
    { label: "Mobiles", href: "/shop", icon: Smartphone, highlight: true },
    { label: "Flash Deals", href: "/deals", icon: Sparkles },
    { label: "Exchange", href: "/exchange", icon: RefreshCcw },
    { label: "EMI Schemes", href: "/emi", icon: CreditCard },
    { label: "Demo & Used", href: "/shop?condition=DEMO", icon: Award },
    { label: "Apple Zone", href: "/shop?brand=Apple", icon: Smartphone },
    { label: "Samsung Zone", href: "/shop?brand=Samsung", icon: Smartphone },
    { label: "Stores", href: "/store", icon: MapPin },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-card sticky top-0 z-50">
      
      {/* Top Location Bar (Flipkart Style) */}
      <div className="bg-white text-slate-700 text-xs py-1.5 px-4 border-b border-slate-100 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-[#2874F0]" />
            <span>Location not set</span>
            <button
              onClick={() => alert("Tamil Nadu Store Locator (Demo)")}
              className="text-[#2874F0] font-bold hover:underline ml-1"
            >
              Select delivery location &gt;
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-500 font-semibold">
            <span>Verified Tamil Nadu Smartphone Outlets</span>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#388E3C] hover:underline font-bold">
              WhatsApp Assistance
            </a>
          </div>
        </div>
      </div>

      {/* Main Flipkart Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#2874F0] text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl text-slate-900 tracking-tight leading-none">
              NOVA<span className="text-[#2874F0]">MOBILE</span>
            </span>
            <span className="text-[9px] font-bold text-amber-500 tracking-widest uppercase">
              Retail Store
            </span>
          </div>
        </Link>

        {/* Search Input Bar (Visible on Desktop & Mobile) */}
        <div className="flex-1 max-w-2xl relative">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full pl-3.5 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-xl bg-[#F0F5FF] border border-[#D0E2FF] text-left text-slate-500 text-xs font-medium focus:outline-none hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-[#2874F0] flex-shrink-0" />
              <span className="truncate">Search Products, Brands...</span>
            </div>
            <span className="bg-[#2874F0] text-white text-[10px] font-bold px-2 py-0.5 rounded-md hidden sm:inline">
              Search
            </span>
          </button>
        </div>

        {/* Right Actions Header */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <Heart className="w-5 h-5 text-slate-700" />
            <span className="hidden md:inline">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart / Inquiry Drawer Button */}
          <button
            onClick={() => setIsInquiryOpen(true)}
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ShoppingBag className="w-5 h-5 text-[#2874F0]" />
            <span className="hidden md:inline">Cart ({inquiryItems.length})</span>
            {inquiryItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2874F0] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {inquiryItems.length}
              </span>
            )}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#388E3C] hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Flipkart Category Icon Navigation Row Below Header */}
      <div className="bg-white border-t border-slate-100 py-2 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-start gap-4 md:gap-8 min-w-max">
          {categoryIcons.map((cat) => {
            const IconComp = cat.icon;
            const isActive = pathname === cat.href;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className={`flex flex-col items-center gap-1 text-center group ${
                  isActive ? "text-[#2874F0] font-black" : "text-slate-700 hover:text-[#2874F0]"
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  cat.highlight
                    ? "bg-[#2874F0] text-white"
                    : "bg-slate-100 group-hover:bg-[#F0F5FF] text-slate-700 group-hover:text-[#2874F0]"
                }`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">
                  {cat.label}
                </span>
                {isActive && <span className="w-4 h-0.5 bg-[#2874F0] rounded-full" />}
              </Link>
            );
          })}
        </div>
      </div>

    </header>
  );
};
