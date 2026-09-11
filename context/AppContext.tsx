"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, InquiryItem } from "@/types";

interface AppContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  inquiryItems: InquiryItem[];
  addToInquiry: (product: Product, selectedColor?: string, selectedStorage?: string, exchangeInterest?: boolean) => void;
  removeFromInquiry: (productId: string) => void;
  updateInquiryQty: (productId: string, delta: number) => void;
  clearInquiry: () => void;
  isInInquiry: (productId: string) => boolean;

  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const WISHLIST_KEY = "nova_mobile_wishlist";
const COMPARE_KEY = "nova_mobile_compare";
const INQUIRY_KEY = "nova_mobile_inquiry";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem(COMPARE_KEY);
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedInquiry = localStorage.getItem(INQUIRY_KEY);
      if (savedInquiry) setInquiryItems(JSON.parse(savedInquiry));
    } catch (err) {
      console.error("Failed to load local storage state:", err);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
    } catch (e) {}
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRY_KEY, JSON.stringify(inquiryItems));
    } catch (e) {}
  }, [inquiryItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to Wishlist!");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      showToast("Already in comparison list");
      return;
    }
    if (compareList.length >= 3) {
      showToast("You can compare maximum 3 smartphones at a time");
      return;
    }
    setCompareList((prev) => [...prev, productId]);
    showToast("Added to Compare Tray");
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
    showToast("Removed from comparison");
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const clearCompare = () => setCompareList([]);

  const addToInquiry = (
    product: Product,
    selectedColor?: string,
    selectedStorage?: string,
    exchangeInterest: boolean = false
  ) => {
    setInquiryItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: selectedColor || product.colors[0]?.name,
            selectedStorage: selectedStorage || product.storage,
            exchangeInterest,
            quantity: 1,
          },
        ];
      }
    });
    showToast("Added to Inquiry Cart");
    setIsInquiryOpen(true);
  };

  const removeFromInquiry = (productId: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Removed from Inquiry Cart");
  };

  const updateInquiryQty = (productId: string, delta: number) => {
    setInquiryItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as InquiryItem[]
    );
  };

  const clearInquiry = () => setInquiryItems([]);

  const isInInquiry = (productId: string) =>
    inquiryItems.some((item) => item.product.id === productId);

  return (
    <AppContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        inquiryItems,
        addToInquiry,
        removeFromInquiry,
        updateInquiryQty,
        clearInquiry,
        isInInquiry,
        isInquiryOpen,
        setIsInquiryOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl border border-blue-500 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center space-x-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
