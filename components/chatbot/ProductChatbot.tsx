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
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Mic,
  MicOff,
  Calculator,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Battery,
  Award,
  DollarSign
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  products?: Product[];
  timestamp: string;
  quickPrompts?: string[];
  widgetType?: "exchange" | "emi";
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
  const [isListening, setIsListening] = useState(false);
  
  // Interactive Exchange Estimator State inside chat
  const [exchangeBrand, setExchangeBrand] = useState("Apple");
  const [exchangeCondition, setExchangeCondition] = useState("Good");
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultInitialMessages: ChatMessage[] = [
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 **Vanakkam & Welcome to Nova Mobile Assistant!**\n\nI am your instant AI guide for all smartphones in our store! Ask me anything about:\n- 📱 Prices, live stock, & 100% specs Q&A\n- ⚔️ Side-by-side phone comparisons\n- 🏷️ Demo vs New phone condition & warranty\n- 🔄 Old phone exchange value calculator\n- 💳 No-Cost EMI monthly breakdowns\n- 📍 Verified Tamil Nadu store locations",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: [
        "Calculate Exchange Value 🔄",
        "Best Camera Phones 📸",
        "Phones under ₹50,000 💰",
        "Compare iPhone 15 Pro vs S24 Ultra ⚔️",
        "Demo Condition Warranty? 🛡️",
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

  // Voice Input Speech-to-Text Handler
  const toggleVoiceInput = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        showToast("Listening... Speak your phone query");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        handleUserSubmit(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast("Voice recognition error. Please type your query.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      showToast("Voice microphone disabled or unsupported.");
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages(defaultInitialMessages);
    showToast("Chat conversation reset");
  };

  // Calculate Exchange Estimate
  const handleCalculateExchange = () => {
    let baseVal = 12000;
    if (exchangeBrand === "Apple") baseVal = 28000;
    else if (exchangeBrand === "Samsung") baseVal = 22000;
    else if (exchangeBrand === "OnePlus") baseVal = 16000;
    else if (exchangeBrand === "Google Pixel") baseVal = 18000;

    let multiplier = 1;
    if (exchangeCondition === "Flawless") multiplier = 1.25;
    if (exchangeCondition === "Good") multiplier = 1.0;
    if (exchangeCondition === "Fair") multiplier = 0.75;

    const val = Math.round(baseVal * multiplier);
    setEstimatedValue(val);

    const botMsg: ChatMessage = {
      id: `bot-exchange-${Date.now()}`,
      sender: "bot",
      text: `🎉 **Estimated Exchange Value for your ${exchangeBrand} (${exchangeCondition} condition):**\n\n` +
        `💰 **Up to ${formatINR(val)} Instant Exchange Discount!**\n\n` +
        `You can apply this exchange discount on any phone in our store. Show up at any Nova Mobile store in Chennai, Coimbatore, or Madurai for instant physical verification & trade-in!`,
      products: PRODUCTS_DATA.filter(p => p.exchangeAvailable).slice(0, 3),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: ["Book Free Store Trade-In Verification", "Show Phones under ₹50,000"]
    };

    setMessages((prev) => [...prev, botMsg]);
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
    }, 550);
  };

  // Smart Query Engine matching user queries with live products, FAQs, and stores
  const generateAIResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase().trim();

    // 1. Exchange Intent & Widget Trigger
    if (q.includes("calculate exchange") || q.includes("trade-in value") || q.includes("old phone value") || q.includes("exchange calculator")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `🔄 **Nova Instant Old Phone Exchange Estimator:**\n\nSelect your old smartphone brand and physical condition below to calculate your instant trade-in value:`,
        widgetType: "exchange",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    // 2. Comparison Intent
    if (q.includes("vs") || q.includes("compare")) {
      const matchedProducts = PRODUCTS_DATA.filter((p) =>
        q.includes(p.name.toLowerCase()) ||
        q.includes(p.brand.toLowerCase()) ||
        q.includes(p.model.toLowerCase()) ||
        (q.includes("iphone") && p.brand === "Apple") ||
        (q.includes("samsung") && p.brand === "Samsung") ||
        (q.includes("s24") && p.name.includes("S24")) ||
        (q.includes("15 pro") && p.name.includes("15 Pro")) ||
        (q.includes("oneplus") && p.brand === "OnePlus")
      );

      if (matchedProducts.length >= 2) {
        const [p1, p2] = matchedProducts;
        return {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `⚔️ **Side-by-Side Comparison: ${p1.name} vs ${p2.name}:**\n\n` +
            `• **Price**: ${p1.name} (${formatINR(p1.price)}) vs ${p2.name} (${formatINR(p2.price)})\n` +
            `• **Condition**: ${p1.condition} vs ${p2.condition}\n` +
            `• **RAM & Storage**: ${p1.ram} / ${p1.storage} vs ${p2.ram} / ${p2.storage}\n` +
            `• **Display**: ${p1.display} vs ${p2.display}\n` +
            `• **Processor**: ${p1.processor} vs ${p2.processor}\n` +
            `• **Camera**: ${p1.camera} vs ${p2.camera}\n` +
            `• **Battery**: ${p1.battery} vs ${p2.battery}\n\n` +
            `Both phones are in stock with Nova Store warranty! Tap below to view full details or save to your inquiry list.`,
          products: [p1, p2],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickPrompts: [`Check EMI for ${p1.name}`, `Check EMI for ${p2.name}`, "Ask Store Executive on WhatsApp"]
        };
      }
    }

    // 3. Demo Condition & Warranty Queries
    if (q.includes("demo") || q.includes("used") || q.includes("condition") || q.includes("refurbished") || q.includes("warranty") || q.includes("second hand")) {
      const demoProducts = PRODUCTS_DATA.filter(p => p.condition === "DEMO").slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `🏷️ **Nova Certified Demo Phones Explained:**\n\n` +
          `• **What are Demo Devices?** Showcase display models from authorized retail stores with zero scratches or heavy usage.\n` +
          `• **Quality Guarantee**: 100% genuine original components, 40+ point diagnostic test passed.\n` +
          `• **Warranty**: Includes 6 Months Nova Store Warranty + any remaining official manufacturer warranty.\n` +
          `• **In-Box**: Original box with woven charging cable and SIM ejector tool.\n\n` +
          `Here are our top trending Demo Deals right now:`,
        products: demoProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Show Demo iPhones 🍏", "Show Demo Samsung Deals 📱", "Calculate Exchange Value 🔄"]
      };
    }

    // 4. RAM / Storage Filter Intent
    if (q.includes("12gb ram") || q.includes("12gb") || q.includes("16gb") || q.includes("256gb") || q.includes("512gb")) {
      const matched = PRODUCTS_DATA.filter(p =>
        (q.includes("12gb") && (p.ram?.includes("12GB") || p.ram?.includes("16GB"))) ||
        (q.includes("256gb") && p.storage.includes("256GB")) ||
        (q.includes("512gb") && p.storage.includes("512GB"))
      ).slice(0, 4);

      if (matched.length > 0) {
        return {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `🚀 **High Storage & High Performance RAM Smartphones:**\n\nThese devices deliver ultra-smooth multitasking, high-FPS gaming, and massive storage for photos & 4K video:`,
          products: matched,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    }

    // 5. EMI & Finance Queries
    if (q.includes("emi") || q.includes("finance") || q.includes("monthly") || q.includes("installment") || q.includes("credit card")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `💳 **No-Cost EMI & Finance Options:**\n\n` +
          `• **Easy Cardless & Card EMI**: Instant approval on HDFC, ICICI, SBI, Axis, IDFC, and Bajaj Finserv.\n` +
          `• **Starting Installment**: EMI starts from as low as **₹1,499 / month**.\n` +
          `• **0% Interest Options**: 3, 6, 9, and 12-month tenure schemes available.\n\n` +
          `Here are popular phones available with low monthly EMI:`,
        products: PRODUCTS_DATA.filter(p => p.emiAvailable).slice(0, 3),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Calculate Exchange Value 🔄", "Store Locations 📍", "WhatsApp Store Executive"]
      };
    }

    // 6. Tamil Nadu Store Locations Query
    if (q.includes("store") || q.includes("location") || q.includes("chennai") || q.includes("coimbatore") || q.includes("madurai") || q.includes("address") || q.includes("contact") || q.includes("tamil nadu")) {
      const storeList = STORES_DATA.map(s => `• **${s.name} (${s.city})**:\n  📍 ${s.address}\n  ⏰ ${s.hours}`).join("\n\n");
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `📍 **Nova Mobile Outlets across Tamil Nadu:**\n\n${storeList}\n\nAll stores feature physical experience counters, instant trade-in desks, and on-spot EMI approvals!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["WhatsApp Executive", "Show All Products", "Demo Phone Warranty"]
      };
    }

    // 7. Price range queries
    let maxPriceFilter: number | null = null;
    if (q.includes("under 30k") || q.includes("under 30000") || q.includes("30k") || q.includes("30000")) maxPriceFilter = 30000;
    else if (q.includes("under 50k") || q.includes("under 50000") || q.includes("50k") || q.includes("50000")) maxPriceFilter = 50000;
    else if (q.includes("under 70k") || q.includes("under 70000") || q.includes("70k")) maxPriceFilter = 70000;
    else if (q.includes("under 1 lakh") || q.includes("under 100000") || q.includes("1 lakh")) maxPriceFilter = 100000;

    if (maxPriceFilter) {
      const budgetProducts = PRODUCTS_DATA.filter(p => p.price <= maxPriceFilter!).slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `💰 **Best Smartphones under ${formatINR(maxPriceFilter)}:**\n\nAll devices include original box, warranty, and available EMI/exchange options.`,
        products: budgetProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Calculate Exchange Value 🔄", "Compare these models ⚔️"]
      };
    }

    // 8. Camera / Video Intent
    if (q.includes("camera") || q.includes("photo") || q.includes("zoom") || q.includes("200mp") || q.includes("video") || q.includes("portrait")) {
      const cameraProducts = PRODUCTS_DATA.filter(p => p.tags.includes("Camera King") || p.category === "Best Camera" || p.camera.includes("200MP") || p.brand === "Apple").slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `📸 **Top Recommended Camera Smartphones:**\n\nFeatures pro-grade optical zoom, 4K/8K video recording, periscope lenses, and advanced night portrait modes:`,
        products: cameraProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    // 9. Tamil / Hinglish / Greetings Intent
    if (q.includes("vanakkam") || q.includes("hello") || q.includes("hi") || q.includes("namaste") || q.includes("bro") || q.includes("good morning")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `👋 **Vanakkam! Welcome to Nova Mobile.**\n\nHow can I help you today? You can search for smartphones, ask for live prices, compare models, or check trade-in exchange values!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Best Camera Phones 📸", "Phones under ₹50,000 💰", "Calculate Exchange Value 🔄", "Demo Warranty 🛡️"]
      };
    }

    // 10. Brand / Model Matcher
    const brandMatches = PRODUCTS_DATA.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
    );

    if (brandMatches.length > 0) {
      const matched = brandMatches.slice(0, 4);
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `✅ Found **${brandMatches.length} smartphone${brandMatches.length === 1 ? '' : 's'}** matching "${query}":`,
        products: matched,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: ["Compare prices", "Calculate Exchange Value 🔄", "Store Locations 📍"]
      };
    }

    // 11. FAQ Lookup Matcher
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
        quickPrompts: ["Show Demo Phones", "Calculate Exchange Value 🔄", "WhatsApp Executive"]
      };
    }

    // Default Fallback
    const featuredSample = PRODUCTS_DATA.filter(p => p.featured).slice(0, 3);
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: `I'm here to help you with **"${query}"**!\n\nYou can ask me specific questions like:\n- *"Show me iPhone 15 Pro Max specs"* \n- *"Calculate exchange value for my old phone"*\n- *"What is demo phone warranty?"*\n- *"Compare S24 Ultra and iPhone 15 Pro"*`,
      products: featuredSample,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: ["Calculate Exchange Value 🔄", "Best Camera Phones 📸", "Phones under ₹50,000 💰", "Demo Warranty 🛡️"]
    };
  };

  const whatsappGeneralUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={() => setIsChatbotOpen(false)} />

      {/* Chat Window Box */}
      <div className="relative w-full sm:w-[460px] h-[92vh] sm:h-[660px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col z-10 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Chatbot Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
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
                <span>Instant product Q&A, specs & exchange assistant</span>
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
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
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

                {/* Interactive Exchange Estimator Widget inside chat bubble */}
                {msg.widgetType === "exchange" && (
                  <div className="mt-3 p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2.5 text-slate-900">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                          Old Phone Brand:
                        </label>
                        <select
                          value={exchangeBrand}
                          onChange={(e) => setExchangeBrand(e.target.value)}
                          className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Apple">Apple iPhone</option>
                          <option value="Samsung">Samsung Galaxy</option>
                          <option value="OnePlus">OnePlus</option>
                          <option value="Google Pixel">Google Pixel</option>
                          <option value="Other">Vivo / Oppo / Xiaomi</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                          Physical Condition:
                        </label>
                        <select
                          value={exchangeCondition}
                          onChange={(e) => setExchangeCondition(e.target.value)}
                          className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Flawless">Flawless (No Scratches)</option>
                          <option value="Good">Good (Minor Wear)</option>
                          <option value="Fair">Fair (Scratch Marks)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleCalculateExchange}
                      className="w-full py-2 bg-[#2874F0] hover:bg-blue-700 text-white font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Calculate Instant Trade-In Credit</span>
                    </button>
                  </div>
                )}

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
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2874F0]" />
                    <span>Recommended Products ({msg.products.length}):</span>
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {msg.products.map((product) => {
                      const inInquiry = isInInquiry(product.id);

                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-300 shadow-xs flex flex-col gap-2 transition-all"
                        >
                          <div className="flex items-center justify-between gap-3">
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
                                <span>Specs</span>
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

                          {/* Quick Spec Pills */}
                          <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-100 text-[10px] text-slate-600 font-medium">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Cpu className="w-2.5 h-2.5 text-blue-600" />
                              <span>{product.ram ? `${product.ram} / ` : ''}{product.storage}</span>
                            </span>
                            {product.emiStartsAt && (
                              <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                                EMI: {formatINR(product.emiStartsAt)}/mo
                              </span>
                            )}
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
            <span className="truncate">Need store manager support or custom quote?</span>
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
          {/* Voice Microphone Button */}
          <button
            onClick={toggleVoiceInput}
            title={isListening ? "Listening..." : "Click to speak voice query"}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
              isListening
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserSubmit()}
            placeholder={isListening ? "Listening to your voice..." : "Ask about prices, RAM, EMI, exchange..."}
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
