"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Home, Grid, Search, Heart, MessageCircle, Bot } from "lucide-react";

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { wishlist, setIsSearchOpen, setIsChatbotOpen } = useApp();
  const whatsappUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto text-center">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/" ? "text-[#2874F0] font-extrabold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/shop" ? "text-[#2874F0] font-extrabold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Shop</span>
        </Link>

        {/* AI Assistant Chatbot Button */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-[#2874F0] font-extrabold transition-colors cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">AI Assist</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/wishlist" ? "text-[#2874F0] font-extrabold" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-3 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] tracking-tight mt-0.5">Wishlist</span>
        </Link>

        {/* WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 font-bold transition-colors"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-[10px] tracking-tight mt-0.5">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
