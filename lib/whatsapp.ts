import { Product, InquiryItem, ExchangeFormState } from "@/types";
import { formatINR } from "./utils";

// TODO: Replace with real WhatsApp business number before going live (format: countrycode + number, e.g. "919876543210")
// Intentionally left blank for demo — wa.me with no number opens WhatsApp without dialling a contact
const WHATSAPP_BASE = "https://wa.me/";

export function generateProductWhatsAppUrl(
  product: Product,
  selectedColor?: string,
  selectedStorage?: string
): string {
  const colorStr = selectedColor ? `\nColor: ${selectedColor}` : "";
  const storageStr = selectedStorage ? `\nStorage: ${selectedStorage}` : `\nStorage: ${product.storage}`;

  const message = `Hi Nova Mobile, I'm interested in buying/enquiring about:
*${product.brand} ${product.name}*
Condition: *${product.condition}*
Price: *${formatINR(product.price)}*${storageStr}${colorStr}
Warranty: ${product.warranty}

Please confirm availability and store pickup / delivery options. Thank you!`;

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function generateInquiryListWhatsAppUrl(items: InquiryItem[]): string {
  if (items.length === 0) return WHATSAPP_BASE;

  let itemDetails = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.brand} ${item.product.name}* (${item.product.condition}) - ${formatINR(
          item.product.price
        )} [Qty: ${item.quantity}]${item.exchangeInterest ? " *(Has Exchange Device)*" : ""}`
    )
    .join("\n");

  const message = `Hi Nova Mobile, I would like to check availability for the following devices in my inquiry list:

${itemDetails}

Please assist me with best prices, exchange evaluation, and store pickup options.`;

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function generateExchangeWhatsAppUrl(form: ExchangeFormState, estimatedValueRange: string): string {
  const message = `Hi Nova Mobile, I submitted an exchange evaluation request on your website:

*Device Details:*
- Brand/Model: *${form.brand} ${form.model}* (${form.storage})
- Overall Condition: *${form.condition}*
- Battery Health: *${form.batteryHealth}*
- Repairs: *${form.repairHistory}*

*Estimated Valuation Range:* ${estimatedValueRange}

*Contact Info:*
- Name: ${form.name}
- Phone: ${form.phone}
- Preferred Store: ${form.preferredStore || "Any / Online"}

Please verify my device details and guide me on the next step for instant trade-in!`;

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralWhatsAppUrl(topic?: string): string {
  const msg = topic
    ? `Hi Nova Mobile, I have an enquiry regarding ${topic}. Please connect with me.`
    : `Hi Nova Mobile, I'm visiting your website and would like to speak with a customer assistant.`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}
