import { ProductBrand } from "@/types";

export interface BrandMetadata {
  name: ProductBrand;
  tagline: string;
  countLabel: string;
  logoSvg?: string;
  color: string;
}

export const BRANDS_LIST: BrandMetadata[] = [
  { name: "Apple", tagline: "iPhone 15, 14, 13 Series", countLabel: "New & Pre-Owned", color: "#000000" },
  { name: "Samsung", tagline: "Galaxy S, Z & A Series", countLabel: "Flagship & Budget", color: "#1428A0" },
  { name: "OnePlus", tagline: "Never Settle Flagships", countLabel: "12 & Nord Series", color: "#EB0029" },
  { name: "Vivo", tagline: "ZEISS Camera Tech", countLabel: "X & V Series", color: "#415FFF" },
  { name: "Oppo", tagline: "Portrait Specialists", countLabel: "Reno & Find", color: "#046A38" },
  { name: "Realme", tagline: "Power & Speed", countLabel: "GT & Number Series", color: "#FFC900" },
  { name: "Xiaomi", tagline: "Leica Optics & Redmi", countLabel: "14 & Note Series", color: "#FF6900" },
  { name: "Motorola", tagline: "Pure Android & Edge", countLabel: "Edge & G Series", color: "#005697" },
  { name: "Nothing", tagline: "Transparent & Glyph", countLabel: "Phone (2) & (2a)", color: "#111111" },
  { name: "Google Pixel", tagline: "Pure AI Photography", countLabel: "Pixel 8 & 7 Series", color: "#4285F4" }
];
