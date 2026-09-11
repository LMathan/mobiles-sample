"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Home, Smartphone, ArrowRightLeft, MessageCircle, ShoppingBag } from "lucide-react";

export const MobileQuickDock: React.FC = () => {
  const pathname = usePathname();
  const { compareList, inquiryItems } = useApp();
  const whatsappUrl = generateGeneralWhatsAppUrl();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Smartphone },
    { label: "Compare", href: "/compare", icon: ArrowRightLeft, count: compareList.length },
    { label: "Enquire", href: "/enquire", icon: ShoppingBag, count: inquiryItems.length },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2 flex items-center justify-around text-white">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">{item.label}</span>

              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="text-[10px]">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
