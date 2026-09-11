export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  googleRating: string;
  mapEmbedUrl?: string;
  features: string[];
}

export const STORES_DATA: StoreLocation[] = [
  {
    id: "chennai-anna-nagar",
    name: "Nova Mobile Flagship Store",
    city: "Chennai",
    address: "Demo Retail Hub, 2nd Avenue, Anna Nagar East, Chennai, Tamil Nadu 600102 (Fictional Demo Address)",
    phone: "+91 XXXXX XXXXX (Demo)",
    whatsapp: "", // TODO: Replace with real WhatsApp number e.g. "919XXXXXXXXX"
    hours: "Mon - Sun: 9:30 AM - 9:30 PM",
    googleRating: "4.9 ⭐ (Demo Rating)",
    features: [
      "Physical Device Experience Desk",
      "Instant Trade-In Valuation",
      "On-Spot EMI Assistance",
      "Same-Day Store Pickup"
    ]
  },
  {
    id: "coimbatore-rs-puram",
    name: "Nova Mobile Experience Center",
    city: "Coimbatore",
    address: "Demo Commercial Plaza, DB Road, RS Puram, Coimbatore, Tamil Nadu 641002 (Fictional Demo Address)",
    phone: "+91 XXXXX XXXXX (Demo)",
    whatsapp: "", // TODO: Replace with real WhatsApp number e.g. "919XXXXXXXXX"
    hours: "Mon - Sun: 10:00 AM - 9:00 PM",
    googleRating: "4.8 ⭐ (Demo Rating)",
    features: [
      "iPhone & Galaxy Demo Counter",
      "Free Data Migration Support",
      "Exchange Counter",
      "Accessory Zone"
    ]
  },
  {
    id: "madurai-kk-nagar",
    name: "Nova Mobile Smart Retail",
    city: "Madurai",
    address: "Demo Smart Complex, 80 Feet Road, KK Nagar, Madurai, Tamil Nadu 625020 (Fictional Demo Address)",
    phone: "+91 XXXXX XXXXX (Demo)",
    whatsapp: "", // TODO: Replace with real WhatsApp number e.g. "919XXXXXXXXX"
    hours: "Mon - Sun: 9:30 AM - 9:00 PM",
    googleRating: "4.9 ⭐ (Demo Rating)",
    features: [
      "Certified Pre-Owned Inspection Desk",
      "Multi-Brand Comparison Zone",
      "Express Repair & Warranty Assist"
    ]
  }
];
