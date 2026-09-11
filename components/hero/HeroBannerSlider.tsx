"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: "banner-1",
    tabLabel: "🔥 New Flagship Launch",
    redirectUrl: "/shop",
    src: "/ChatGPT Image Sep 11, 2026, 11_01_14 PM.png",
    alt: "New Launches Are Here – Shop Flagship Smartphones",
  },
  {
    id: "banner-2",
    tabLabel: "📱 Next Gen Smartphones",
    redirectUrl: "/shop",
    src: "/ChatGPT Image Sep 11, 2026, 11_02_04 PM.png",
    alt: "Next Gen Smartphones – iPhone 16 Pro & Galaxy S25 Ultra",
  },
  {
    id: "banner-3",
    tabLabel: "🏷️ Up to ₹10,000 Off",
    redirectUrl: "/deals",
    src: "/ChatGPT Image Sep 11, 2026, 11_04_19 PM.png",
    alt: "Smart Upgrade Season – Up to ₹10,000 Off on Selected Smartphones",
  },
  {
    id: "banner-4",
    tabLabel: "🍎 iPhone 18 Launch",
    redirectUrl: "/shop",
    src: "/ChatGPT Image Sep 11, 2026, 11_05_49 PM.png",
    alt: "iPhone 18 – The Next Generation. Built for What's Next.",
  },
];

const SWIPE_THRESHOLD = 40;

export const HeroBannerSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % banners.length);
    startAutoPlay();
  }, [startAutoPlay]);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    startAutoPlay();
  }, [startAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > 30 && absX > absY) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    } else if (absX < 10 && absY < 10) {
      // Tap on banner
      router.push(banners[activeSlide].redirectUrl);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = banners[activeSlide];

  return (
    <div className="w-full space-y-3">

      {/* 16:9 Banner Canvas */}
      <div
        className="relative w-full aspect-[16/9] md:aspect-[21/8] rounded-2xl md:rounded-3xl overflow-hidden shadow-card group border border-slate-200 select-none cursor-pointer touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => router.push(current.redirectUrl)}
      >
        {/* Full-bleed Banner Image */}
        <img
          key={current.id}
          src={current.src}
          alt={current.alt}
          className="w-full h-full object-cover object-center pointer-events-none"
          draggable={false}
        />

        {/* Left Arrow — desktop hover only */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white hidden sm:flex items-center justify-center"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow — desktop hover only */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white hidden sm:flex items-center justify-center"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {banners.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setActiveSlide(idx); startAutoPlay(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === idx ? "w-6 bg-[#2874F0]" : "w-1.5 bg-slate-300"
            }`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};
