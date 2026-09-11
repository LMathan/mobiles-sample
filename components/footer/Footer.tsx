"use client";

import React from "react";
import Link from "next/link";
import { Smartphone, ShieldCheck, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-700 pt-16 pb-24 md:pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Disclaimer Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                Fictional Client Demo Notice
              </h4>
              <p className="text-slate-600 text-xs mt-0.5">
                NOVA MOBILE is a fictional demo brand built to demonstrate a modern smartphone retail e-commerce platform. No real transactions take place.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
            Tamil Nadu Demo Environment
          </span>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tight">
                NOVA<span className="text-blue-600">MOBILE</span>
              </span>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              &quot;Premium smartphones. Smart deals.&quot; Tamil Nadu&apos;s premier independent mobile retailer specializing in new, demo, and certified pre-owned smartphones across all major brands.
            </p>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Stores in Chennai, Coimbatore & Madurai (Demo)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>+91 XXXXX XXXXX (Demo Contact Line)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>enquiries@novamobile-demo.com</span>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              Smartphone Brands
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link href="/shop?brand=Apple" className="hover:text-blue-600 transition-colors">Apple iPhones</Link></li>
              <li><Link href="/shop?brand=Samsung" className="hover:text-blue-600 transition-colors">Samsung Galaxy</Link></li>
              <li><Link href="/shop?brand=OnePlus" className="hover:text-blue-600 transition-colors">OnePlus Flagships</Link></li>
              <li><Link href="/shop?brand=Vivo" className="hover:text-blue-600 transition-colors">Vivo ZEISS Series</Link></li>
              <li><Link href="/shop?brand=Nothing" className="hover:text-blue-600 transition-colors">Nothing Phone</Link></li>
              <li><Link href="/shop?brand=Xiaomi" className="hover:text-blue-600 transition-colors">Xiaomi & Leica</Link></li>
              <li><Link href="/shop?condition=DEMO" className="hover:text-amber-600 font-bold transition-colors">★ Demo Devices</Link></li>
            </ul>
          </div>

          {/* Customer Assistance */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link href="/exchange" className="hover:text-blue-600 transition-colors">Phone Exchange Offer</Link></li>
              <li><Link href="/emi" className="hover:text-blue-600 transition-colors">Easy EMI Calculator</Link></li>
              <li><Link href="/store" className="hover:text-blue-600 transition-colors">Find Store & Pickup</Link></li>
              <li><Link href="/compare" className="hover:text-blue-600 transition-colors">Compare Smartphones</Link></li>
              <li><Link href="/enquire" className="hover:text-blue-600 transition-colors">My Cart & Order</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQs & Warranty</Link></li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Nova Mobile</Link></li>
              <li><Link href="/deals" className="hover:text-blue-600 transition-colors">Promotional Deals</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Warranty Disclaimers</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NOVA MOBILE Demo. All rights reserved. Architected for client preview.</p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram (Demo)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>YouTube (Demo)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
