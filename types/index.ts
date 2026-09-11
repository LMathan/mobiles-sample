export type ProductCondition = 'NEW' | 'DEMO' | 'LIGHTLY USED' | 'PRE-OWNED';

export type ProductBrand = 
  | 'Apple'
  | 'Samsung'
  | 'OnePlus'
  | 'Vivo'
  | 'Oppo'
  | 'Realme'
  | 'Xiaomi'
  | 'Motorola'
  | 'Nothing'
  | 'Google Pixel';

export type ProductCategory = 
  | 'Best Camera'
  | 'Best for Gaming'
  | 'Best Gaming'
  | 'Best Battery'
  | 'Best Performance'
  | 'Best Value'
  | 'Premium'
  | 'Budget';

export type StockStatus = 'Available' | 'Limited Stock' | 'Enquire' | 'Sold Out';

export interface Product {
  id: string;
  brand: ProductBrand;
  name: string;
  model: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  condition: ProductCondition;
  storage: string; // e.g. "128GB", "256GB", "512GB", "1TB"
  ram?: string; // e.g. "8GB", "12GB", "16GB"
  colors: { name: string; hex: string }[];
  display: string; // e.g. "6.7-inch Super Retina XDR OLED 120Hz"
  processor: string; // e.g. "A17 Pro", "Snapdragon 8 Gen 3"
  camera: string; // e.g. "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
  battery: string; // e.g. "4422 mAh / 45W fast charge"
  batteryHealth?: number; // e.g. 95 for DEMO/PRE-OWNED
  physicalCondition?: string; // e.g. "Mint - Scratchless body & screen"
  fiveG: boolean;
  warranty: string; // e.g. "1 Year Brand Warranty" or "6 Months Retailer Warranty"
  exchangeAvailable: boolean;
  emiAvailable: boolean;
  emiStartsAt?: number; // Monthly ₹ EMI
  images: string[];
  category: ProductCategory;
  tags: string[];
  featured?: boolean;
  isNewArrival?: boolean;
  isDeal?: boolean;
  dealCategory?: 'Today\'s Deals' | 'Under ₹10K' | 'Under ₹20K' | 'Premium Deals' | 'Demo Deals' | 'Used Phone Deals';
  stockStatus: StockStatus;
  description: string;
  inBoxAccessories?: string[];
}

export interface FilterState {
  search: string;
  brands: ProductBrand[];
  conditions: ProductCondition[];
  categories: ProductCategory[];
  minPrice: number;
  maxPrice: number;
  fiveGOnly: boolean;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'popular';
}

export interface ExchangeFormState {
  brand: string;
  model: string;
  storage: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Damaged Screen/Body';
  batteryHealth: string;
  repairHistory: 'Never Repaired' | 'Screen Replaced' | 'Battery Replaced' | 'Other Repairs';
  name: string;
  phone: string;
  whatsapp: string;
  preferredStore?: string;
}

export interface InquiryItem {
  product: Product;
  selectedColor?: string;
  selectedStorage?: string;
  exchangeInterest: boolean;
  quantity: number;
}
