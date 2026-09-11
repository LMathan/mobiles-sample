export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Products" | "Exchange & EMI" | "Store & Delivery" | "General";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you sell new smartphones?",
    answer: "Yes! We stock brand-new, factory-sealed smartphones from top brands including Apple, Samsung, OnePlus, Vivo, Oppo, Realme, Xiaomi, Motorola, Nothing, and Google Pixel. All new devices carry full official brand warranty.",
    category: "Products"
  },
  {
    id: "faq-2",
    question: "Do you sell pre-owned phones?",
    answer: "Yes, we offer certified pre-owned smartphones that undergo a thorough 45-point inspection test covering display quality, battery health, 5G signal reception, camera sensors, and physical integrity. Pre-owned phones come with Nova Store warranty.",
    category: "Products"
  },
  {
    id: "faq-3",
    question: "Do you sell demo phones?",
    answer: "Yes! Demo smartphones are pristine condition devices previously showcased in official counter displays or unboxed for customer demonstration. They offer like-new quality with maximum battery health at significantly reduced prices.",
    category: "Products"
  },
  {
    id: "faq-4",
    question: "Can I exchange my old phone?",
    answer: "Absolutely. We offer competitive instant trade-in evaluations. You can use our online Exchange Calculator or contact us on WhatsApp to submit your device specs and offset its value against your new or pre-owned upgrade.",
    category: "Exchange & EMI"
  },
  {
    id: "faq-5",
    question: "Are EMI options available?",
    answer: "Yes, flexible easy monthly installment (EMI) schemes are available for eligible customers across major financing options. Tenure lengths, eligibility criteria, and monthly calculations are verified during store visit or online enquiry.",
    category: "Exchange & EMI"
  },
  {
    id: "faq-6",
    question: "Can I reserve a phone online?",
    answer: "Yes. You can reserve any device listed on our website by clicking 'Reserve / Enquire' or messaging us directly on WhatsApp. Our store representative will hold the stock for your store visit or arrange direct delivery.",
    category: "Store & Delivery"
  },
  {
    id: "faq-7",
    question: "Can I contact the store on WhatsApp?",
    answer: "Yes! WhatsApp is our primary instant assistance channel. Every product card and page features a direct WhatsApp enquiry button that auto-formats the exact model, condition, and price you are viewing.",
    category: "Store & Delivery"
  },
  {
    id: "faq-8",
    question: "Do you provide delivery across Tamil Nadu?",
    answer: "We support both local store pickup and safe insured courier/parcel delivery within Tamil Nadu and surrounding regions. Speak with our store team via WhatsApp to arrange delivery to your location.",
    category: "Store & Delivery"
  },
  {
    id: "faq-9",
    question: "Can I visit the store before purchasing?",
    answer: "We highly encourage visiting our store! You can physically inspect, compare, and feel devices, check battery health in person, test cameras, and get expert guidance from our retail specialists.",
    category: "Store & Delivery"
  },
  {
    id: "faq-10",
    question: "How can I check stock availability?",
    answer: "Stock changes dynamically. You can click 'Check Availability' or 'WhatsApp Enquiry' on any product page, and our team will immediately verify current inventory in our store.",
    category: "General"
  }
];
