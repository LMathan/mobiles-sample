"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS_DATA } from "@/data/products";
import { BRANDS_LIST } from "@/data/brands";
import { FAQS_DATA } from "@/data/faqs";
import { STORES_DATA } from "@/data/store";
import { HeroBannerSlider } from "@/components/hero/HeroBannerSlider";
import { FlashOfferTicker } from "@/components/hero/FlashOfferTicker";
import { ProductCard } from "@/components/products/ProductCard";
import { ConditionBadge } from "@/components/products/ConditionBadge";
import { PhoneFinder } from "@/components/finder/PhoneFinder";
import { generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Calculator,
  Store,
  Truck,
  CheckCircle2,
  Play,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Camera,
  Gamepad2,
  BatteryCharging,
  Zap,
  Tag,
  Star,
  Layers,
  MapPin,
  Flame,
  Award
} from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function HomePage() {
  const [activeDealCategory, setActiveDealCategory] = useState<string>("Today's Deals");

  const popularNearbyProducts = PRODUCTS_DATA.filter((p) => p.featured || p.isDeal).slice(0, 4);
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.featured).slice(0, 8);
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNewArrival).slice(0, 6);
  const preOwnedDemoProducts = PRODUCTS_DATA.filter(
    (p) => p.condition === "DEMO" || p.condition === "LIGHTLY USED" || p.condition === "PRE-OWNED"
  ).slice(0, 6);

  const dealsProducts = PRODUCTS_DATA.filter((p) => {
    if (activeDealCategory === "Today's Deals") return p.isDeal;
    if (activeDealCategory === "Under ₹10K") return p.price <= 10000;
    if (activeDealCategory === "Under ₹20K") return p.price <= 20000;
    if (activeDealCategory === "Premium Deals") return p.price >= 50000 && p.isDeal;
    if (activeDealCategory === "Demo Deals") return p.condition === "DEMO";
    if (activeDealCategory === "Used Phone Deals") return p.condition === "PRE-OWNED" || p.condition === "LIGHTLY USED";
    return p.isDeal;
  }).slice(0, 8);

  const discoveryCategories = [
    { title: "Best Camera", desc: "Studio portrait & 4K video", icon: Camera, href: "/shop?category=Best+Camera" },
    { title: "Best for Gaming", desc: "High FPS & fast cooling", icon: Gamepad2, href: "/shop?category=Best+for+Gaming" },
    { title: "Best Battery", desc: "5000mAh+ & flash charge", icon: BatteryCharging, href: "/shop?category=Best+Battery" },
    { title: "Best Performance", desc: "Snapdragon 8 & A17 Pro", icon: Zap, href: "/shop?category=Best+Performance" },
    { title: "Best Value", desc: "Maximum specs under budget", icon: Tag, href: "/shop?category=Best+Value" },
    { title: "Premium Phones", desc: "Titanium frames & OLED tech", icon: Star, href: "/shop?category=Premium" },
    { title: "Budget Phones", desc: "Reliable 5G under ₹15,000", icon: Layers, href: "/shop?category=Budget" },
  ];

  const socialGridItems = [
    { title: "iPhone 15 Pro Natural Titanium Stock Arrived!", tag: "New Arrival", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80" },
    { title: "Customer collecting Samsung S24 Ultra demo deal", tag: "Store Visit", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80" },
    { title: "Unboxing Demo Nothing Phone (2) with Glyph LEDs", tag: "Demo Stock", img: "https://images.unsplash.com/photo-1692348508573-0545f492b450?auto=format&fit=crop&w=600&q=80" },
    { title: "OnePlus 12 Flowy Emerald in hand review", tag: "Staff Pick", img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80" },
    { title: "Weekend pre-owned iPhone sale frenzy!", tag: "Special Offer", img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=600&q=80" },
    { title: "Clean Vivo X100 Pro ZEISS camera testing", tag: "Customer Pick", img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80" },
  ];

  const videoCards = [
    { title: "iPhone 15 Pro Max vs Samsung S24 Ultra - Camera Shootout", duration: "12:45", views: "14.2K views", thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80" },
    { title: "Are Demo Phones Worth Buying? Full Inspection Guide", duration: "08:30", views: "28.9K views", thumbnail: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80" },
    { title: "Top 5 Smartphones Under ₹25,000 in 2026", duration: "10:15", views: "45.1K views", thumbnail: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80" },
  ];

  const whatsappGeneralUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="space-y-6 md:space-y-10 pb-16 bg-[#F1F2F4]">
      
      {/* ==================================================
          SECTION 1: 16:9 RESPONSIVE HERO BANNER SLIDER
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 pt-3">
        <HeroBannerSlider />
      </section>

      {/* ==================================================
          SECTION 2: FLIPKART STYLE MINT GREEN CONTAINER ("Popular nearby")
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-[#E8F5E9] rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          
          <div className="flex items-center justify-between border-b border-[#C8E6C9] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Popular nearby
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Top rated smartphones available for instant pickup in Tamil Nadu stores
              </p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#2874F0] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularNearbyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 3: RUNNING FLASH OFFER TICKER
          ================================================== */}
      <FlashOfferTicker />

      {/* ==================================================
          SECTION 4: TRUST STRIP
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-card">
          
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2874F0]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Multiple Brands</h4>
              <p className="text-[11px] text-slate-500">10+ Top Brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2874F0]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Exchange Offer</h4>
              <p className="text-[11px] text-slate-500">Instant Valuation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2874F0]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">EMI Schemes</h4>
              <p className="text-[11px] text-slate-500">Easy Installments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2874F0]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Store Pickup</h4>
              <p className="text-[11px] text-slate-500">Inspect & Purchase</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2874F0]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Regional Courier</h4>
              <p className="text-[11px] text-slate-500">Safe Fast Delivery</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 5: SHOP BY BRAND
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Shop by Brand
              </h2>
              <p className="text-xs text-slate-500">Select manufacturer catalog</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#2874F0] hover:underline">
              View All Brands →
            </Link>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-3 md:grid md:grid-cols-5 snap-x-mandatory">
            {BRANDS_LIST.map((b) => (
              <Link
                key={b.name}
                href={`/shop?brand=${encodeURIComponent(b.name)}`}
                className="group min-w-[180px] md:min-w-0 snap-start p-4 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-[#2874F0] transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 text-sm group-hover:text-[#2874F0]">
                    {b.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] text-[#2874F0] font-bold bg-white px-2 py-0.5 rounded border border-blue-100 w-fit">
                  {b.countLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: FEATURED SMARTPHONES
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Featured Smartphones
              </h2>
              <p className="text-xs text-slate-500">Handpicked top performers</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-[#2874F0] hover:underline">
              Explore Full Inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: PHONE FINDER WIZARD
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <PhoneFinder />
      </section>

      {/* ==================================================
          SECTION 8: DEALS HUB
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Deals worth checking out
              </h2>
              <p className="text-xs text-slate-500">Limited period discounts</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                "Today's Deals",
                "Under ₹10K",
                "Under ₹20K",
                "Premium Deals",
                "Demo Deals",
                "Used Phone Deals",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveDealCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    activeDealCategory === cat
                      ? "bg-[#2874F0] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {dealsProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: PRE-OWNED & DEMO COLLECTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Quality Guaranteed
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Pre-owned. Carefully selected.
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                45-point hardware tested with verified battery health transparency.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <ConditionBadge condition="NEW" size="sm" />
              <ConditionBadge condition="DEMO" size="sm" />
              <ConditionBadge condition="LIGHTLY USED" size="sm" />
              <ConditionBadge condition="PRE-OWNED" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {preOwnedDemoProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: EXCHANGE & EMI BANNERS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 border border-blue-500 space-y-4 shadow-card">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Phone Exchange Offer</span>
          </div>
          <h3 className="text-2xl font-black">Upgrade without paying full price</h3>
          <p className="text-xs text-blue-100 leading-relaxed">
            Trade in your old smartphone and use its valuation toward your next upgrade.
          </p>
          <Link
            href="/exchange"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-extrabold text-xs shadow-md hover:bg-slate-50 transition-colors"
          >
            <span>Calculate Exchange</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 shadow-card">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-[#2874F0] text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Easy Financing</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Make your upgrade easier</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Spread payments with flexible monthly installments across 3 to 24 months.
          </p>
          <Link
            href="/emi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2874F0] text-white font-extrabold text-xs shadow-md"
          >
            <span>Calculate Monthly EMI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* ==================================================
          SECTION 11: STORE LOCATIONS & OUTLETS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                See it. Hold it. Choose it.
              </h2>
              <p className="text-xs text-slate-500">Visit our outlets in Tamil Nadu</p>
            </div>
            <Link href="/store" className="text-xs font-bold text-[#2874F0] hover:underline">
              All Outlets →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORES_DATA.map((s) => (
              <div key={s.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                  <span className="text-[10px] font-bold bg-blue-100 text-[#2874F0] px-2 py-0.5 rounded">
                    {s.city}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{s.address}</p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#388E3C] font-bold">{s.googleRating}</span>
                  <Link href="/store" className="text-[#2874F0] font-bold hover:underline">
                    Directions →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 12: FAQ ACCORDION
          ================================================== */}
      <section className="max-w-4xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Answers to common queries</p>
        </div>

        <div className="space-y-2">
          {FAQS_DATA.slice(0, 5).map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-xl border border-slate-200 p-4 transition-all shadow-xs"
            >
              <summary className="font-extrabold text-xs sm:text-sm text-slate-900 cursor-pointer flex items-center justify-between">
                <span>{faq.question}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 13: FINAL CTA BANNER
          ================================================== */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-[#2874F0] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-card">
          <h2 className="text-2xl sm:text-4xl font-black">
            Ready to find your next smartphone?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto">
            Browse our full catalog of new, demo, and pre-owned smartphones or connect directly with our store team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-900 font-black text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              Browse Full Catalog
            </Link>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#388E3C] hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
