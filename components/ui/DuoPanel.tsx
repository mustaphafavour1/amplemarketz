"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const QUICK_PROMPTS = [
  "Who should I reach out to today?",
  "Summarise replies from this week",
  "Find companies like Notion",
  "Draft a follow-up for James",
  "Best-performing subject line?",
];

const INITIAL_MESSAGE: Message = {
  from: "duo",
  text: "Hi! I'm Duo. I've processed 47 signals while you were away and identified 12 leads ready for action. What would you like to focus on?",
};

const DUO_REPLIES: Record<string, string> = {
  default:
    "Great question! Based on your current pipeline and the 47 signals I've processed, here's what I'd suggest — I'm analyzing your top prospects now and can generate a personalized action plan in seconds.",
  "who should i reach out to today":
    "Based on engagement signals, I'd prioritize: 1) Sarah Chen at Figma — opened your last email 3 times, 2) Marcus Rodriguez at Linear — visited your pricing page, 3) Priya Kapoor at Loom — champion went silent after 2 weeks. Want me to draft outreach for any of these?",
  "summarise replies from this week":
    "This week you received 23 replies: 8 positive (3 ready to book a call), 7 neutral (need nurturing), 5 objections (pricing & timing), 3 unsubscribes. Your open rate is up 12% vs last week. Top-performing subject: \"Quick question about {Company}\".",
  "find companies like notion":
    "Found 14 companies matching Notion's profile: collaborative SaaS, 50–500 employees, PLG motion, raised Series A–B. Top matches: Craft Docs, Coda, Saga, Mem, Capacities. Want me to add them to a sequence?",
  "draft a follow-up for james":
    "Here's a draft for James at Acme Corp:\n\n\"Hi James, following up on our conversation last week. I know Q2 planning is hectic — wanted to share one stat: teams like yours cut outbound cycle time by 40% in the first month. Worth a 15-min call this week? I have Thu 2pm or Fri 10am free.\"\n\nShould I send this?",
  "best-performing subject line":
    "Your top subject lines this month:\n1. \"Quick question, {First Name}\" — 68% open rate\n2. \"{Company}'s growth caught my eye\" — 61%\n3. \"Idea for {Company}\" — 58%\n\nPersonalised one-liners outperform generic ones by 2.4× in your account.",
};

type Message = { from: "duo" | "user"; text: string };

function getReply(text: string): string {
  const key = text.trim().toLowerCase();
  for (const [k, v] of Object.entries(DUO_REPLIES)) {
    if (k !== "default" && key.includes(k)) return v;
  }
  return DUO_REPLIES.default;
}

interface DuoPanelProps {
  open: boolean;
  onClose: () => void;
}

export function DuoPanel({ open, onClose }: DuoPanelProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text };
    const duoMsg: Message = { from: "duo", text: getReply(text) };
    setMessages((m) => [...m, userMsg, duoMsg]);
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
          className="fixed right-0 top-0 bottom-0 flex flex-col"
          style={{
            width: 400,
            background: "var(--c-surface)",
            borderLeft: "1px solid var(--c-border)",
            boxShadow: "-8px 0 32px rgba(0,0,0,0.06)",
            zIndex: 50,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ borderBottom: "1px solid var(--c-border)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-[16px]"
                style={{ color: "var(--c-text-1)" }}
              >
                Duo
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#22C55E" }}
                />
                <span className="text-[12px]" style={{ color: "#15803D" }}>
                  Active
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer"
              style={{ color: "var(--c-text-3)" }}
              aria-label="Close Duo panel"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--c-border)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick prompts */}
          <div
            className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0"
            style={{
              borderBottom: "1px solid var(--c-border)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => send(p)}
                className="shrink-0 text-[12px] px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
                style={{
                  border: "1px solid #E5E7EB",
                  background: "white",
                  color: "var(--c-text-2)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.border = "1px solid #1E40AF";
                  el.style.color = "#1E40AF";
                  el.style.background = "#EFF4FF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.border = "1px solid #E5E7EB";
                  el.style.color = "var(--c-text-2)";
                  el.style.background = "white";
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[82%] text-[13px] leading-relaxed whitespace-pre-wrap"
                  style={
                    m.from === "duo"
                      ? {
                          background: "#F0F4FF",
                          borderRadius: "0 12px 12px 12px",
                          padding: "12px 16px",
                          color: "var(--c-text-1)",
                        }
                      : {
                          background: "#1E40AF",
                          borderRadius: "12px 0 12px 12px",
                          padding: "12px 16px",
                          color: "white",
                        }
                  }
                >
                  {m.from === "duo" && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <Sparkles size={10} style={{ color: "#1E40AF" }} />
                      <span className="text-[10px]" style={{ color: "#6B7280" }}>
                        Duo
                      </span>
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="shrink-0 px-4 py-3"
            style={{ borderTop: "1px solid var(--c-border)" }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                border: "1px solid var(--c-border)",
                background: "var(--c-topbar)",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask Duo anything..."
                className="flex-1 outline-none text-[13px] bg-transparent"
                style={{ color: "var(--c-text-1)" }}
              />
              <button
                onClick={() => send(input)}
                className="shrink-0 transition-opacity cursor-pointer"
                style={{ color: "#1E40AF", opacity: input.trim() ? 1 : 0.4 }}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
