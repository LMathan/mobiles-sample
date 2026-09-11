"use client";

import React from "react";
import { STORES_DATA } from "@/data/store";
import { Store, MapPin, Phone, Clock, MessageCircle, Navigation, CheckCircle2 } from "lucide-react";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function StorePage() {
  const whatsappUrl = generateGeneralWhatsAppUrl("Store Visit & Inventory Enquiry");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
          <Store className="w-4 h-4" />
          <span>Tamil Nadu Store Network (Demo)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          See it. Hold it. Choose it.
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Visit our stores to physically inspect phones, test camera setups in real light, and receive expert assistance from our retail team.
        </p>
      </div>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {STORES_DATA.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                  {store.city} Outlet
                </span>
                <span className="text-xs font-bold text-emerald-600">{store.googleRating}</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                {store.name}
              </h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Store Facilities:</span>
                {store.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Contact Store</span>
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Map</span>
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
