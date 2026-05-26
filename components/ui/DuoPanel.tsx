"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send } from "lucide-react";
import { useState } from "react";

const QUICK_PROMPTS = [
  "Who should I reach out to today?",
  "Summarise replies from this week",
  "Find companies like Notion",
  "Draft a follow-up for James",
  "Best-performing subject line?",
];

const INITIAL_MESSAGES = [
  { from: "duo", text: "Hi! I'm Duo. I've processed 47 signals while you were away and identified 12 leads ready for action. What would you like to focus on?" }
];

export function DuoPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }, { from: "duo", text: `Great question! Based on your current pipeline and the 47 signals I've processed, here's what I'd suggest for "${text}" — I'm analyzing your top prospects now and can generate a personalized action plan in seconds.` }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 180 }}
          className="fixed right-0 top-0 bottom-0 w-[420px] bg-[#FFFFFF] border-l border-[#E4E2DC] flex flex-col z-50 shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E2DC]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] text-[#111111]">Duo</span>
              <span className="flex items-center gap-1 text-[11px] text-[#27AE60]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse" />
                Active
              </span>
            </div>
            <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#111111] transition-colors cursor-pointer">
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-2 px-4 py-3 border-b border-[#E4E2DC] overflow-x-auto scrollbar-hide">
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => send(p)}
                className="shrink-0 text-[11px] px-2.5 py-1.5 rounded-full border border-[#E4E2DC] bg-[#F7F6F3] text-[#5C5C5C] hover:border-[#4361EE] hover:text-[#4361EE] transition-colors cursor-pointer whitespace-nowrap">
                {p}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.from === "duo" ? "bg-[#0F1923] text-white" : "bg-white border border-[#E4E2DC] text-[#111111]"
                }`}>
                  {m.from === "duo" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles size={10} className="text-[#4361EE]" />
                      <span className="text-[10px] text-[#9A9A9A]">Duo</span>
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#E4E2DC]">
            <div className="flex items-center gap-2 border border-[#E4E2DC] rounded-lg px-3 py-2 bg-white">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Ask Duo anything..."
                className="flex-1 outline-none text-[13px] text-[#111111] bg-transparent placeholder:text-[#9A9A9A]"
              />
              <button onClick={() => send(input)} className="text-[#4361EE] hover:text-[#2a4bd4] transition-colors cursor-pointer">
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
