"use client";

import React from "react";
import Link from "next/link";
import { Smartphone, ShieldCheck, MapPin, Phone, Mail, ArrowUpRight, ExternalLink, Code2, Globe } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const SkillForgeLogo = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 shrink-0">
    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
      <Code2 className="w-5 h-5 text-blue-400" />
    </div>
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-700 pt-16 pb-24 md:pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Disclaimer & SkillForge Tech Partner Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                  Fictional Client Demo Notice
                </h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  NOVA MOBILE is a fictional demo brand built to demonstrate a modern smartphone retail e-commerce platform.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap self-start md:self-auto font-semibold">
              Tamil Nadu Demo Environment
            </span>
          </div>

          <a 
            href="https://skillforgetechnology.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md hover:shadow-xl transition-all border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <SkillForgeLogo />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                    SkillForge Technologies
                  </span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-300 font-semibold px-1.5 py-0.5 rounded border border-blue-400/30 uppercase tracking-wider">
                    Developer
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  Global Software Engineering Partner
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
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

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Stores in Chennai, Coimbatore & Madurai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>+91 93455 18760 (Sales Enquiries)</span>
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

        {/* SkillForge Technologies Dedicated Showcase Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-widest">
                  Software Engineering Partner
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-300 font-medium">SkillForge Technologies</span>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Designed & Built by SkillForge Technologies
              </h3>
              
              <p className="text-slate-300 text-xs leading-relaxed">
                Global Software Engineering & Digital Transformation Partner delivering high-performance e-commerce platforms, web applications, and custom digital solutions.
              </p>
            </div>

            {/* Links and Contact Info Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://skillforgetechnology.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/company/skillforgetech/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center gap-2 border border-slate-700"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/skillforge_technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center gap-2 border border-slate-700"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span>Email: <a href="mailto:info@skillforgetechnology.app" className="text-blue-400 hover:underline">info@skillforgetechnology.app</a></span>
              <span>Phone: <a href="tel:+919345518760" className="text-blue-400 hover:underline">+91 93455 18760</a></span>
            </div>
            <span className="text-slate-300">https://skillforgetechnology.app</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NOVA MOBILE Demo. Architected & Developed by <a href="https://skillforgetechnology.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">SkillForge Technologies</a>.</p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/skillforge_technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href="https://www.linkedin.com/company/skillforgetech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href="https://skillforgetechnology.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors font-semibold"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>SkillForge Web</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

