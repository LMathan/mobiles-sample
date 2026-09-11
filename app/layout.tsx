import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/header/Header";
import { MobileBottomBar } from "@/components/navigation/MobileBottomBar";
import { Footer } from "@/components/footer/Footer";
import { InquiryDrawer } from "@/components/cart/InquiryDrawer";
import { SearchModal } from "@/components/header/SearchModal";
import { ProductQuickView } from "@/components/products/ProductQuickView";
import { CompareFloatingBar } from "@/components/compare/CompareFloatingBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2874F0",
};

export const metadata: Metadata = {
  title: "NOVA MOBILE | Premium Smartphones & Smart Deals (Tamil Nadu Demo)",
  description: "Explore new, demo, and certified pre-owned smartphones from Apple, Samsung, OnePlus, Vivo, Oppo, Xiaomi, Nothing and more. Express exchange & EMI available.",
  keywords: ["Nova Mobile", "Smartphones Tamil Nadu", "Demo iPhones", "Preowned phones Chennai", "Phone Exchange", "Mobile EMI"],
  openGraph: {
    title: "NOVA MOBILE - Premium Smartphones",
    description: "New, demo and pre-owned smartphones with exchange & EMI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F1F2F4] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <MobileBottomBar />
          <InquiryDrawer />
          <SearchModal />
          <ProductQuickView />
          <CompareFloatingBar />
        </AppProvider>
      </body>
    </html>
  );
}
