"use client";

import { useState, useRef, useEffect } from "react";
import LiveRateCalculator from "./LiveRateCalculator";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Namaste! I am Soni Diamonds' AI Specialist. How can I assist you with custom diamond jewellery, live gold rates, or certified solitaires today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const userLocation = typeof window !== "undefined" ? localStorage.getItem("soni_user_location") || "Surat" : "Surat";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userLocation,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "I am available to assist with your diamond selection. Feel free to contact Lokesh Soni at +91 93098 52270.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Flat making charges are ₹850/g. For direct assistance, call Lokesh Soni at +91 93098 52270.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Buttons in Right Corner */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Quick Floating Live Rate Calculator Trigger (placed just above chatbot) */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-gold/40 bg-ink-panel/95 text-gold text-xs font-serif shadow-2xl backdrop-blur-md hover:bg-gold/20 hover:scale-105 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span>📊 Live Rate Calculator</span>
          </button>
        )}

        {/* Floating Chatbot Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (showCalculator) setShowCalculator(false);
          }}
          className="relative group h-14 w-14 rounded-full border border-gold/50 bg-gradient-to-tr from-black via-ink to-gold/30 p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Open AI Diamond Chatbot"
        >
          <div className="h-full w-full rounded-full bg-ink-panel flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.55rem] font-bold text-black">
            AI
          </span>
        </button>
      </div>

      {/* Floating Calculator Modal (when triggered from quick button above chatbot) */}
      {showCalculator && !isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/50 bg-ink-panel p-2 shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-line-soft">
              <span className="font-serif text-lg text-bone">Live Rate &amp; Price Calculator</span>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-bone-dim hover:text-bone text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-2">
              <LiveRateCalculator />
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Interface Modal / Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-8rem)] rounded-2xl border border-gold/40 bg-ink-panel/95 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-black via-ink to-ink-panel p-4 border-b border-line-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold">
                💎
              </div>
              <div>
                <h4 className="font-serif text-sm text-bone">Soni Diamonds AI Assistant</h4>
                <p className="text-[0.65rem] text-gold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  Powered by Gemini AI · Surat Hub
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCalculator(true)}
                title="Open Calculator"
                className="text-[0.7rem] px-2 py-1 rounded border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20"
              >
                📊 Rates
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-bone-dim hover:text-bone text-lg px-1"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Special Banner */}
          <div className="bg-gold/10 border-b border-gold/20 px-3 py-1.5 text-center text-[0.65rem] text-gold tracking-wider uppercase">
            ✨ Making Charges: Fixed at ₹850 / Gram
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold text-black font-medium rounded-tr-none shadow-md"
                      : "bg-ink/80 border border-gold/20 text-bone rounded-tl-none shadow-md"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[0.6rem] text-bone-faint mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-gold text-xs py-2 px-3 bg-ink/60 rounded-xl border border-gold/20 w-max">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
                <span className="animate-bounce [animation-delay:0.4s]">●</span>
                <span className="text-bone-faint text-[0.65rem] ml-1">Consulting Gemini AI &amp; Soni Knowledge Base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-line-soft/40 bg-black/40 flex items-center gap-1.5 overflow-x-auto text-[0.68rem] scrollbar-none">
            <button
              onClick={() => handleSend("What are today's live gold rates and making charges?")}
              className="shrink-0 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-bone-dim hover:text-gold hover:border-gold"
            >
              📊 Today's Rates
            </button>
            <button
              onClick={() => handleSend("How are jewellery prices calculated at Soni Diamonds?")}
              className="shrink-0 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-bone-dim hover:text-gold hover:border-gold"
            >
              📐 Price Formula
            </button>
            <button
              onClick={() => handleSend("Tell me about certified solitaires and GIA/IGI reports")}
              className="shrink-0 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-bone-dim hover:text-gold hover:border-gold"
            >
              💎 Certified Diamonds
            </button>
            <button
              onClick={() => handleSend("Where is your Surat diamond atelier located?")}
              className="shrink-0 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-bone-dim hover:text-gold hover:border-gold"
            >
              📍 Office Address
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-line-soft bg-ink flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about diamonds, prices, making charges..."
              className="flex-1 bg-black/50 border border-line-soft rounded-xl px-3 py-2 text-xs text-bone focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
