"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS_DATA } from "@/data/products";
import { FAQS_DATA } from "@/data/faqs";
import { STORES_DATA } from "@/data/store";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { ConditionBadge } from "../products/ConditionBadge";
import { generateProductWhatsAppUrl, generateGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCcw,
  ShoppingBag,
  MessageCircle,
  Eye,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  products?: Product[];
  timestamp: string;
  quickPrompts?: string[];
}

export const ProductChatbot: React.FC = () => {
  const {
    isChatbotOpen,
    setIsChatbotOpen,
    initialChatQuery,
    setQuickViewProduct,
    addToInquiry,
    isInInquiry,
    showToast
  } = useApp();

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultInitialMessages: ChatMessage[] = [
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 **Hello! Welcome to Nova Mobile Assistant.**\n\nI am your instant AI guide for all smartphones in our store! You can ask me about:\n- 📱 Product prices, stock, & full specifications\n- ⚔️ Comparing two phones side-by-side\n- 🏷️ Demo vs New phone condition details\n- 💳 Monthly EMI calculators & trade-in exchange offers\n- 📍 Our Tamil Nadu store locations",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: [
        "Best Camera Phones 📸",
        "Phones under ₹50,000 💰",
        "Compare iPhone 15 Pro vs S24 Ultra ⚔️",
        "Demo Condition Warranty? 🛡️",
        "How Exchange & EMI Works? 💳",
        "Store Locations 📍"
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(defaultInitialMessages);

  // Handle initial trigger query if passed from other components
  useEffect(() => {
    if (isChatbotOpen && initialChatQuery) {
      handleUserSubmit(initialChatQuery);
    }
  }, [isChatbotOpen, initialChatQuery]);

  // Scroll to bottom of chat history when messages update
  useEffect(() => {
    if (isChatbotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isChatbotOpen]);

  if (!isChatbotOpen) return null;

  // Clear chat history
  const handleClearChat = () => {
    setMessages(defaultInitialMessages);
    showToast("Chat reset");
  };

  // User message submit handler
  const handleUserSubmit = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse = generateAIResponse(textToSend);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  // Smart Query Engine matching user queries with live products, FAQs, and stores
  const generateAIResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    // 1. Comparison Intent
    if (q.includes("vs") || q.includes("compare")) {
      const matchedProducts = PRODUCTS_DATA.filter((p) =>
        q.includes(p.name.toLowerCase()) ||
        q.includes(p.brand.toLowerCase()) ||
        q.includes(p.model.toLowerCase()) ||
        (q.includes("iphone") && p.brand === "Apple") ||
        (q.includes("samsung") && p.brand === "Samsung") ||
        (q.includes("s24") && p.name.includes("S24")) ||
        (q.includes("15 pro") && p.name.includes("15 Pro"))
      );

      if (matchedProducts.length >= 2) {
        const [p1, p2] = matchedProducts;
        return {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `🔍 **Comparison breakdown between ${p1.name} & ${p2.name}:**\n\n` +
            `• **Price**: ${p1.name} (${formatINR(p1.price)}) vs ${p2.name} (${formatINR(p2.price)})\n` +
            `• **Display**: ${p1.display} vs ${p2.display}\n` +
            `• **Processor**: ${p1.processor} vs ${p2.processor}\n` +
            `• **Camera**: ${p1.camera} vs ${p2.camera}\n` +
            `• **Battery**: ${p1.battery} vs ${p2.battery}\n\n` +
            `Both are available in stock with warranty! Tap below to view details or save for inquiry.`,
          products: [p1, p2],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    }

    // 2. Demo Condition & Warranty Queries
    if (q.includes("demo") || q.includes("used") || q.includes("condition") || q.includes("refurbished") || q.includes("warranty")) {
      const demoProducts = PRODUCTS_DATA.filter(p => p.condition === "DEMO").slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `🏷️ **Nova Certified Demo Phones Explained:**\n\n` +
          `• **What are Demo Devices?** Showcase models displayed in authorized retail stores with zero cosmetic defects or heavy usage.\n` +
          `• **Quality Guarantee**: 100% genuine parts, full multi-point diagnostic test passed.\n` +
          `• **Warranty**: Includes 6 Months Nova Store Warranty + any remaining brand warranty.\n` +
          `• **In-Box**: Comes with box and essential charging accessories.\n\n` +
          `Here are our top trending Demo Deals right now:`,
        products: demoProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Show iPhones", "Show Demo Deals", "How EMI works?"]
      };
    }

    // 3. EMI and Exchange Queries
    if (q.includes("emi") || q.includes("finance") || q.includes("monthly") || q.includes("exchange") || q.includes("trade")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `💳 **Exchange & EMI Schemes at Nova Mobile:**\n\n` +
          `• **Instant Old Phone Exchange**: Get up to ₹45,000 instant credit for your old smartphone (Apple, Samsung, OnePlus, Vivo, etc.).\n` +
          `• **Easy No-Cost EMI**: Available on HDFC, ICICI, SBI, Axis, and Bajaj Finserv cardless credit.\n` +
          `• **Monthly Installment**: EMI starts from as low as **₹1,499/month** on select smartphones.\n\n` +
          `Select any smartphone on our store to see its exact monthly EMI options!`,
        products: PRODUCTS_DATA.filter(p => p.emiAvailable).slice(0, 3),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Best camera phones under 50k", "Show Apple iPhones", "WhatsApp Store Executive"]
      };
    }

    // 4. Store Locations Query
    if (q.includes("store") || q.includes("location") || q.includes("chennai") || q.includes("coimbatore") || q.includes("madurai") || q.includes("address") || q.includes("contact")) {
      const storeList = STORES_DATA.map(s => `• **${s.name} (${s.city})**: ${s.address} | Hours: ${s.hours}`).join("\n\n");
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `📍 **Nova Mobile Verified Retail Outlets:**\n\n${storeList}\n\nAll stores feature live physical experience desks, instant trade-in counters, and on-spot EMI approvals!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["WhatsApp Store Executive", "Show All Products", "Demo Phone Warranty"]
      };
    }

    // 5. Price range queries (e.g., under 50k, 50000, 30000, 100000)
    let maxPriceFilter: number | null = null;
    if (q.includes("under 30k") || q.includes("under 30000") || q.includes("30k") || q.includes("30,000")) maxPriceFilter = 30000;
    else if (q.includes("under 50k") || q.includes("under 50000") || q.includes("50k") || q.includes("50,000")) maxPriceFilter = 50000;
    else if (q.includes("under 60k") || q.includes("under 60000") || q.includes("60k")) maxPriceFilter = 60000;
    else if (q.includes("under 1 lakh") || q.includes("under 100000") || q.includes("100000")) maxPriceFilter = 100000;

    if (maxPriceFilter) {
      const budgetProducts = PRODUCTS_DATA.filter(p => p.price <= maxPriceFilter!).slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `💰 **Here are the best smartphones priced under ${formatINR(maxPriceFilter)}:**\n\nAll models include 100% original box, warranty, and available EMI/exchange deals.`,
        products: budgetProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    // 6. Camera / Performance / Category Intent
    if (q.includes("camera") || q.includes("photo") || q.includes("zoom") || q.includes("200mp") || q.includes("video")) {
      const cameraProducts = PRODUCTS_DATA.filter(p => p.tags.includes("Camera King") || p.category === "Best Camera" || p.camera.includes("200MP") || p.brand === "Apple").slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `📸 **Top Recommended Camera Smartphones:**\n\nThese phones feature pro-grade optical zoom, 4K/8K video recording, high-resolution sensors, and advanced night mode portrait processing.`,
        products: cameraProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    // 7. Brand / Specific Model Search Matcher
    const brandMatches = PRODUCTS_DATA.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    );

    if (brandMatches.length > 0) {
      const matched = brandMatches.slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `✅ Found **${brandMatches.length} matching smartphone${brandMatches.length === 1 ? '' : 's'}** for "${query}":`,
        products: matched,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Compare prices", "Check EMI options", "Store Locations"]
      };
    }

    // 8. General FAQ Lookup Matcher
    const matchedFaq = FAQS_DATA.find((faq) =>
      faq.question.toLowerCase().includes(q) ||
      q.split(" ").some(word => word.length > 3 && faq.question.toLowerCase().includes(word))
    );

    if (matchedFaq) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `💡 **${matchedFaq.question}**\n\n${matchedFaq.answer}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Show Demo Phones", "Ask WhatsApp Support", "Phones under 50k"]
      };
    }

    // Default Helpful Fallback
    const featuredSample = PRODUCTS_DATA.filter(p => p.featured).slice(0, 3);
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: `I'm happy to help you with **"${query}"**!\n\nYou can ask me specific questions like:\n- *"Show me iPhone 15 Pro Max specs"* \n- *"What is the warranty on demo phones?"*\n- *"Which phone has the best battery life?"*\n- *"Compare S24 Ultra and iPhone 15"*`,
      products: featuredSample,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: ["Best Camera Phones", "Phones under ₹50,000", "Compare iPhone 15 vs S24 Ultra", "Demo Warranty Details"]
    };
  };

  const whatsappGeneralUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={() => setIsChatbotOpen(false)} />

      {/* Chat Window Box */}
      <div className="relative w-full sm:w-[440px] h-[90vh] sm:h-[640px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col z-10 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Chatbot Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm tracking-tight text-white">
                  Nova AI Assistant
                </h3>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1">
                <span>Instant product Q&A & store helper</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-1.5`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#2874F0] text-white rounded-br-none font-medium"
                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-none font-normal"
                }`}
              >
                {/* Formatted Markdown text lines */}
                <div className="whitespace-pre-line space-y-1">
                  {msg.text.split("\n").map((line, idx) => {
                    if (line.startsWith("• ")) {
                      return (
                        <div key={idx} className="flex items-start gap-1.5 my-0.5">
                          <span className="text-[#2874F0] font-bold mt-0.5">•</span>
                          <span>{line.replace("• ", "")}</span>
                        </div>
                      );
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                {/* Timestamp */}
                <div
                  className={`text-[9px] mt-2 text-right ${
                    msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Embedded Product Cards List inside Bot Message */}
              {msg.products && msg.products.length > 0 && (
                <div className="w-full pl-2 space-y-2 mt-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Recommended Products ({msg.products.length}):
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {msg.products.map((product) => {
                      const prodWhatsappUrl = generateProductWhatsAppUrl(product);
                      const inInquiry = isInInquiry(product.id);

                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-300 shadow-xs flex items-center justify-between gap-3 transition-all"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase truncate">
                                {product.brand}
                              </span>
                              <ConditionBadge condition={product.condition} />
                            </div>

                            <h4 className="font-extrabold text-xs text-slate-900 truncate">
                              {product.name}
                            </h4>

                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-xs font-black text-[#2874F0]">
                                {formatINR(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-[10px] line-through text-slate-400">
                                  {formatINR(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3 text-slate-600" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => {
                                addToInquiry(product);
                                showToast(`${product.name} added to Enquiry list`);
                              }}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                                inInquiry
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-[#2874F0] text-white hover:bg-blue-700"
                              }`}
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>{inInquiry ? "Saved" : "+Enquire"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quick Prompts Chips below bot response */}
              {msg.quickPrompts && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                  {msg.quickPrompts.map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserSubmit(promptText)}
                      className="text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-[#2874F0] border border-blue-200 px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>{promptText}</span>
                      <ChevronRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 bg-white border border-slate-200 px-3.5 py-2 rounded-2xl rounded-bl-none w-max shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2874F0] animate-spin" />
              <span className="text-xs font-semibold text-slate-600">Nova Bot is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Action Banner to Connect to Human WhatsApp */}
        <div className="bg-emerald-50 px-4 py-2 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="truncate">Need custom deals or store manager support?</span>
          </div>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-extrabold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>WhatsApp Executive</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Input Controls Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserSubmit()}
            placeholder="Ask about iPhone 15, EMI, warranty, compare..."
            className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2874F0] focus:bg-white transition-all"
          />

          <button
            onClick={() => handleUserSubmit()}
            disabled={!inputQuery.trim()}
            className="w-10 h-10 rounded-xl bg-[#2874F0] hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all cursor-pointer flex-shrink-0"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
