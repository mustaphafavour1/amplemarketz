"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import stats from "@/data/stats.json";
import {
  TrendingUp, TrendingDown, Mail, Link2,
  Sparkles, Send, MessageCircle, Pencil,
} from "lucide-react";

const HOME_CHIPS = [
  { icon: "📋", label: "Show today's urgent leads" },
  { icon: "✅", label: "Review pending approvals (12)" },
  { icon: "📊", label: "Summarise yesterday's performance" },
  { icon: "⚡", label: "Start with highest intent signal" },
];

/* 5 stat cards */
const STAT_CARDS = [
  { value: 47, label: "Signals today", delta: 12, positive: true, deltaLabel: "vs yesterday" },
  { value: 37, label: "Pending actions", delta: -3, positive: false, deltaLabel: "vs yesterday" },
  { value: 23, label: "Active sequences", delta: 5, positive: true, deltaLabel: "vs yesterday" },
  { value: "14.9%", label: "Reply rate (7d)", delta: 2.1, positive: true, deltaLabel: "vs last week" },
  { value: 142, label: "Emails sent today", delta: 8, positive: true, deltaLabel: "vs yesterday" },
];

/* Light/desaturated dot colours */
const DOT_COLOR: Record<string, string> = {
  job: "rgba(67,97,238,0.32)",
  social: "rgba(155,89,182,0.32)",
  fund: "rgba(39,174,96,0.32)",
  comp: "rgba(232,93,38,0.32)",
  news: "rgba(243,156,18,0.32)",
  approved: "rgba(39,174,96,0.32)",
};

/* Shared card container style */
const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.85)",
  borderRadius: 2,
  border: "0.3px solid rgba(172,200,215,0.55)",
  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
};

/* Initial Duo conversation */
const INIT_MESSAGES: Array<{ from: "duo" | "user"; text: string }> = [
  { from: "duo", text: "Good morning! I've processed 47 signals while you were away. Sarah Chen at Notion was just promoted to VP of Sales." },
  { from: "duo", text: "I've drafted personalised outreach for your top 12 leads. 3 sequences need your approval before I can send." },
  { from: "user", text: "Show me the highest intent lead." },
  { from: "duo", text: "That's Sarah Chen — job change + competitor visit in the last 7 days. I've already prepared a sequence. Want to review it?" },
];

const QUICK_ACTIONS = [
  "Show urgent leads",
  "Yesterday's performance",
  "Review approvals (12)",
  "Highest intent signal",
];

/* ── Stat card ── */
function StatCard({ value, label, delta, positive, deltaLabel }: {
  value: number | string; label: string; delta: number; positive: boolean; deltaLabel: string;
}) {
  return (
    <motion.div
      whileHover={{ translateY: -2, boxShadow: "0 4px 12px rgba(67,97,238,0.07)" }}
      transition={{ duration: 0.15 }}
      className="shrink-0 p-4"
      style={{ ...CARD, minWidth: 180, scrollSnapAlign: "start" }}
    >
      <div className="text-[24px] font-bold text-[#1F2937] leading-none mb-1">{value}</div>
      <div className="text-[10px] text-[#9CA3AF] mb-1.5">{label}</div>
      <div className={`flex items-center gap-1 text-[10px] font-medium ${positive ? "text-[#15803D]" : "text-[#E85D26]"}`}>
        {positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
        {positive ? "+" : ""}{delta}{typeof value === "string" ? "%" : ""} {deltaLabel}
      </div>
    </motion.div>
  );
}

/* ── Duo Chat ── */
function DuoChatSection() {
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user" as const, text: input.trim() }]);
    setInput("");
    /* Simulate a Duo reply */
    setTimeout(() => {
      setMessages(m => [...m, { from: "duo" as const, text: "Got it. Let me pull that up for you..." }]);
    }, 600);
  };

  return (
    <div className="flex flex-col overflow-hidden h-full" style={CARD}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "0.3px solid rgba(172,200,215,0.55)" }}>
        <Sparkles size={12} className="text-[#1E40AF]" />
        <span className="text-[11px] font-semibold text-[#374151]">Chat with Duo</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-[#9CA3AF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse" />
          Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.from === "user" ? "justify-end" : ""}`}>
            {msg.from === "duo" && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "#EFF4FF", flexShrink: 0 }}>
                <Sparkles size={9} className="text-[#1E40AF]" />
              </div>
            )}
            <div
              className="max-w-[82%] px-3 py-2 leading-relaxed"
              style={{
                borderRadius: 2,
                fontSize: 11,
                background: msg.from === "duo" ? "rgba(248,250,255,0.92)" : "#1E40AF",
                color: msg.from === "duo" ? "#374151" : "white",
                border: msg.from === "duo" ? "0.3px solid rgba(172,200,215,0.5)" : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5" style={{ borderTop: "0.3px solid rgba(172,200,215,0.55)" }}>
        {QUICK_ACTIONS.map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            className="px-2 py-1 cursor-pointer hover:bg-[#EFF4FF] transition-colors"
            style={{ borderRadius: 2, border: "0.3px solid rgba(147,197,253,0.5)", color: "#1E40AF", fontSize: 10 }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop: "0.3px solid rgba(172,200,215,0.55)" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask Duo anything..."
          className="flex-1 outline-none"
          style={{
            fontSize: 11,
            background: "rgba(248,250,255,0.9)",
            borderRadius: 2,
            padding: "6px 10px",
            border: "0.3px solid rgba(147,197,253,0.5)",
            color: "#374151",
          }}
        />
        <button
          onClick={send}
          className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ width: 28, height: 28, background: "#1E40AF", borderRadius: 2, flexShrink: 0 }}
        >
          <Send size={12} className="text-white" />
        </button>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function DashboardHome() {
  const timeline = stats.timeline as Array<{ type: string; text: string; time: string; action: string | null }>;
  const approvals = stats.pendingApprovalCards as Array<{ name: string; company: string; channel: string; preview: string }>;
  const [showAll, setShowAll] = useState(false);
  const visibleTimeline = showAll ? timeline : timeline.slice(0, 5);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Good morning, Favour ✦" />
      <DuoBar chips={HOME_CHIPS} />

      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-[10px] text-[#9CA3AF] mb-4">Duo processed 47 signals while you were away</p>

        {/* 5 stat cards */}
        <div className="flex gap-3 mb-5 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
          {STAT_CARDS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-[1fr_360px] gap-4 min-h-0" style={{ minHeight: 500 }}>

          {/* LEFT: Duo Chat (main, largest container) */}
          <DuoChatSection />

          {/* RIGHT column */}
          <div className="flex flex-col gap-3 overflow-y-auto">

            {/* Needs your attention */}
            <div className="p-4" style={CARD}>
              <h2 className="font-semibold text-[11px] text-[#374151] mb-3">Needs your attention</h2>
              <div className="flex flex-col gap-2">
                {approvals.map((card, i) => (
                  <div key={i} className="p-3" style={{ borderRadius: 2, border: "0.3px solid rgba(172,200,215,0.5)" }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="min-w-0 flex-1 mr-2">
                        <span className="text-[11px] font-semibold text-[#374151]">{card.name}</span>
                        <span className="text-[10px] text-[#9CA3AF]"> · {card.company}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 shrink-0"
                        style={{ background: "#EDF4FB", color: "#6B7280", borderRadius: 2 }}>
                        {card.channel === "Email" ? <Mail size={8} /> : <Link2 size={8} />}
                        {card.channel}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B7280] italic leading-relaxed line-clamp-2 mb-2">
                      &ldquo;{card.preview}&rdquo;
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ width: 22, height: 22, background: "#27AE60", borderRadius: 2 }}
                        title="Approve & send"
                      >
                        <MessageCircle size={10} className="text-white" />
                      </button>
                      <button
                        className="flex items-center justify-center cursor-pointer hover:bg-[#F8FAFF] transition-colors"
                        style={{ width: 22, height: 22, borderRadius: 2, border: "0.3px solid rgba(172,200,215,0.6)" }}
                        title="Edit"
                      >
                        <Pencil size={10} className="text-[#6B7280]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline snapshot */}
            <div className="p-4" style={CARD}>
              <h2 className="font-semibold text-[11px] text-[#374151] mb-3">Pipeline snapshot</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: stats.meetingsToday, label: "Today's meetings" },
                  { n: 23, label: "Sequences active" },
                  { n: "14.9%", label: "Reply rate (7d)" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[18px] font-bold text-[#1F2937]">{s.n}</div>
                    <div className="text-[9px] text-[#9CA3AF] leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duo's Activity (compact, 5 items) */}
            <div className="p-4" style={CARD}>
              <h2 className="font-semibold text-[11px] text-[#374151] mb-3">Duo&rsquo;s Activity</h2>
              <div className="flex flex-col">
                {visibleTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "0.3px solid rgba(172,200,215,0.5)",
                      borderRadius: 2,
                      padding: "6px 8px",
                      marginBottom: 4,
                    }}
                  >
                    {/* 4px dot with desaturated colour */}
                    <div
                      className="shrink-0 rounded-full"
                      style={{ width: 4, height: 4, background: DOT_COLOR[item.type] ?? "rgba(156,163,175,0.35)" }}
                    />
                    <p className="flex-1 min-w-0 leading-snug" style={{ fontSize: 8, color: "#374151" }}>
                      {item.text}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span style={{ fontSize: 8, color: "#9CA3AF", whiteSpace: "nowrap" }}>{item.time}</span>
                      {item.action && (
                        <button
                          className="cursor-pointer transition-all hover:bg-[#1F2937] hover:text-white"
                          style={{
                            fontSize: 8,
                            border: "0.3px solid #374151",
                            color: "#374151",
                            borderRadius: 2,
                            padding: "2px 5px",
                            background: "transparent",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.action}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {!showAll && timeline.length > 5 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="hover:underline cursor-pointer mt-1"
                  style={{ fontSize: 8, color: "#1E40AF" }}
                >
                  See more ({timeline.length - 5} more) →
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
