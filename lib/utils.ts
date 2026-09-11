import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductCondition } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function getConditionBadgeStyle(condition: ProductCondition) {
  switch (condition) {
    case "NEW":
      return {
        label: "BRAND NEW",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
      };
    case "DEMO":
      return {
        label: "DEMO DEVICE",
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-600",
      };
    case "LIGHTLY USED":
      return {
        label: "LIGHTLY USED",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    case "PRE-OWNED":
      return {
        label: "PRE-OWNED",
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        dot: "bg-purple-500",
      };
    default:
      return {
        label: condition,
        bg: "bg-slate-100 text-slate-700 border-slate-200",
        dot: "bg-slate-500",
      };
  }
}
