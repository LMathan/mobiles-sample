"use client";

import React, { useState } from "react";
import { ExchangeFormState } from "@/types";
import { generateExchangeWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowRightLeft, CheckCircle2, MessageCircle, RefreshCw, Smartphone } from "lucide-react";
import { STORES_DATA } from "@/data/store";

export const ExchangeCalculator: React.FC = () => {
  const [form, setForm] = useState<ExchangeFormState>({
    brand: "Apple",
    model: "iPhone 12",
    storage: "128GB",
    condition: "Good",
    batteryHealth: "85% - 90%",
    repairHistory: "Never Repaired",
    name: "",
    phone: "",
    whatsapp: "",
    preferredStore: STORES_DATA[0].name,
  });

  const [submitted, setSubmitted] = useState(false);

  const calculateEstimatedValue = () => {
    let base = 15000;
    if (form.brand === "Apple") base += 8000;
    if (form.brand === "Samsung") base += 5000;
    if (form.storage.includes("256GB")) base += 3000;
    if (form.storage.includes("512GB")) base += 6000;
    if (form.condition === "Like New") base += 4000;
    if (form.condition === "Fair") base -= 3000;
    if (form.condition === "Damaged Screen/Body") base -= 7000;
    
    const minVal = Math.max(3000, base - 2000);
    const maxVal = base + 2500;
    return `₹${minVal.toLocaleString("en-IN")} – ₹${maxVal.toLocaleString("en-IN")}`;
  };

  const estimatedValueRange = calculateEstimatedValue();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = generateExchangeWhatsAppUrl(form, estimatedValueRange);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-8">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Instant Device Trade-in Estimate</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Calculate Your Phone&apos;s Exchange Value
        </h2>
        <p className="text-xs md:text-sm text-slate-600">
          Enter your current smartphone details to get an estimated trade-in bonus towards your upgrade.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grid Step 1: Device Spec Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Brand
              </label>
              <select
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Apple">Apple iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Vivo">Vivo</option>
                <option value="Oppo">Oppo</option>
                <option value="Realme">Realme</option>
                <option value="Xiaomi">Xiaomi / Redmi / POCO</option>
                <option value="Motorola">Motorola</option>
                <option value="Nothing">Nothing</option>
                <option value="Other">Other Brand</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Model Name
              </label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="e.g. iPhone 12, Galaxy S21"
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Storage Capacity
              </label>
              <select
                value={form.storage}
                onChange={(e) => setForm({ ...form, storage: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB or 1TB</option>
              </select>
            </div>

          </div>

          {/* Grid Step 2: Physical & Hardware Health */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Physical Condition
              </label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Like New">Like New (Flawless, no scratches)</option>
                <option value="Good">Good (Minor normal signs of use)</option>
                <option value="Fair">Fair (Noticeable scratches/scuffs)</option>
                <option value="Damaged Screen/Body">Damaged Glass or Dents</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Battery Health %
              </label>
              <select
                value={form.batteryHealth}
                onChange={(e) => setForm({ ...form, batteryHealth: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Above 90%">Above 90%</option>
                <option value="85% - 90%">85% – 90%</option>
                <option value="80% - 85%">80% – 85%</option>
                <option value="Below 80%">Below 80% (Service Recommended)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Repair History
              </label>
              <select
                value={form.repairHistory}
                onChange={(e) => setForm({ ...form, repairHistory: e.target.value as any })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Never Repaired">Never Repaired (All Original)</option>
                <option value="Screen Replaced">Screen Replaced</option>
                <option value="Battery Replaced">Battery Replaced</option>
                <option value="Other Repairs">Other Component Repair</option>
              </select>
            </div>

          </div>

          {/* Grid Step 3: Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Anand Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Preferred Store Location
              </label>
              <select
                value={form.preferredStore}
                onChange={(e) => setForm({ ...form, preferredStore: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STORES_DATA.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl transition-colors flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            <span>Get Instant Exchange Estimate</span>
          </button>
        </form>
      ) : (
        <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Estimated Trade-in Valuation
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-blue-600">
              {estimatedValueRange}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Estimated value for your <strong>{form.brand} {form.model} ({form.storage})</strong>. Final evaluation takes 5 minutes in store.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-1">
            <p><strong>Customer:</strong> {form.name} ({form.phone})</p>
            <p><strong>Condition:</strong> {form.condition} • {form.batteryHealth} Battery</p>
            <p><strong>Selected Outlet:</strong> {form.preferredStore}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirm via WhatsApp</span>
            </a>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Re-calculate</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
