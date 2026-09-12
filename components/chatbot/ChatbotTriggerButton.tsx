"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Bot, Sparkles, X } from "lucide-react";

export const ChatbotTriggerButton: React.FC = () => {
  const { isChatbotOpen, setIsChatbotOpen } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  // Automatically dismiss floating tooltip after 10s or when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isChatbotOpen) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end gap-2 group">
      
      {/* Floating Tooltip Callout */}
      {showTooltip && (
        <div className="relative bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[220px]">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-bounce" />
          <span className="leading-tight text-[11px]">
            Product Enquiry AI Chatbot is online!
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
          
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-slate-900 transform rotate-45 border-r border-b border-slate-700" />
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => {
          setIsChatbotOpen(true);
          setShowTooltip(false);
        }}
        className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#2874F0] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
        aria-label="Open AI Product Assistant Chatbot"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
        </div>
        <span className="font-extrabold text-xs tracking-tight hidden sm:inline">
          Ask Product AI
        </span>
      </button>

    </div>
  );
};
