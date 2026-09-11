"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { Calculator, CheckCircle2, ShieldAlert, ArrowRight, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const EmiCalculator: React.FC = () => {
  const [devicePrice, setDevicePrice] = useState<number>(50000);
  const [downPayment, setDownPayment] = useState<number>(10000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  const loanAmount = Math.max(0, devicePrice - downPayment);
  // Approx annual interest rate 14% p.a. demo calculation
  const monthlyRate = 0.14 / 12;
  const emiMonthly = loanAmount > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1))
    : 0;

  const totalPayable = downPayment + emiMonthly * tenureMonths;
  const whatsappUrl = generateGeneralWhatsAppUrl(`EMI Enquiry for ₹${devicePrice.toLocaleString('en-IN')} smartphone`);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      
      {/* Interactive Calculator Box */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-200">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Monthly Repayment Calculator</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Calculate Your Smartphone EMI
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Adjust the price, down payment, and tenure to see your estimated monthly installment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Sliders Form */}
          <div className="space-y-6">
            
            {/* Device Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Device Price</span>
                <span className="text-blue-600 text-sm font-black">{formatINR(devicePrice)}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={180000}
                step={2000}
                value={devicePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDevicePrice(val);
                  if (downPayment >= val) setDownPayment(Math.round(val * 0.2));
                }}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Down Payment</span>
                <span className="text-emerald-600 text-sm font-black">{formatINR(downPayment)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.round(devicePrice * 0.7)}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tenure Options */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-700">Select Tenure</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[3, 6, 9, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                      tenureMonths === m
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Output Card */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white p-6 rounded-2xl border border-blue-500 space-y-6 shadow-xl">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-blue-100 uppercase">
                Estimated Monthly Installment
              </span>
              <div className="text-4xl md:text-5xl font-black text-amber-300 tracking-tight">
                {formatINR(emiMonthly)}
                <span className="text-sm text-blue-100 font-normal"> / month</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-blue-400/40 py-4">
              <div className="flex justify-between text-blue-100">
                <span>Principal Loan Amount:</span>
                <strong className="text-white font-bold">{formatINR(loanAmount)}</strong>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Down Payment Paid upfront:</span>
                <strong className="text-amber-300 font-bold">{formatINR(downPayment)}</strong>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Total Repayment over {tenureMonths} months:</span>
                <strong className="text-white font-bold">{formatINR(totalPayable)}</strong>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Apply for EMI Assistance on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Disclaimer Text */}
        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            EMI availability, tenure options, interest rates, and final customer eligibility are subject to applicable financing terms verified during store visit.
          </p>
        </div>

      </div>

      {/* 5-Step EMI Journey */}
      <div className="space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <h3 className="text-2xl font-extrabold text-slate-900">
            Simple 5-Step EMI Journey
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Getting your dream smartphone is quick and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { step: "01", title: "Choose Your Phone", desc: "Browse new, demo or pre-owned smartphones." },
            { step: "02", title: "Check Eligibility", desc: "Verify basic ID & financing documentation." },
            { step: "03", title: "Select Tenure", desc: "Pick a comfortable 3 to 24 month repayment term." },
            { step: "04", title: "Complete Order", desc: "Pay initial down payment in store or online." },
            { step: "05", title: "Enjoy Your Device", desc: "Walk out with your new device immediately!" },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-blue-500 shadow-xs transition-colors"
            >
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit font-mono border border-blue-100">
                STEP {item.step}
              </span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
