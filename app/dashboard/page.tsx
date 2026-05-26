"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalDot } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import stats from "@/data/stats.json";
import { TrendingUp, TrendingDown, Check, Mail, Link2 } from "lucide-react";

const HOME_CHIPS = [
  { icon: "📋", label: "Show today's urgent leads" },
  { icon: "✅", label: "Review pending approvals (12)" },
  { icon: "📊", label: "Summarise yesterday's performance" },
  { icon: "⚡", label: "Start with highest intent signal" },
];

const STAT_CARDS = [
  { value: 47, label: "Signals today", delta: 12, positive: true },
  { value: 37, label: "Pending actions", delta: -3, positive: false },
  { value: 23, label: "Active sequences", delta: 5, positive: true },
  { value: "14.9%", label: "Reply rate (7d)", delta: 2.1, positive: true },
];

const TYPE_COLOR: Record<string, string> = {
  job: "bg-[#4361EE]", social: "bg-[#9B59B6]", fund: "bg-[#27AE60]",
  comp: "bg-[#E85D26]", news: "bg-[#F39C12]", approved: "bg-[#27AE60]",
};

function StatCard({ value, label, delta, positive }: { value: number | string; label: string; delta: number; positive: boolean }) {
  return (
    <motion.div
      whileHover={{ translateY: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.15 }}
      className="bg-white rounded-xl border border-[#E4E2DC] p-4"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <div className="text-[28px] font-bold text-[#0F1923] leading-none mb-1">{value}</div>
      <div className="text-[12px] text-[#9A9A9A] mb-2">{label}</div>
      <div className={`flex items-center gap-1 text-[11px] font-medium ${positive ? "text-[#27AE60]" : "text-[#E85D26]"}`}>
        {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {positive ? "+" : ""}{delta}{typeof delta === "number" && typeof value === "string" ? "%" : ""} vs yesterday
      </div>
    </motion.div>
  );
}

export default function DashboardHome() {

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Good morning, Favour ✦" />
      <DuoBar chips={HOME_CHIPS} />

      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-[13px] text-[#9A9A9A] mb-5">Duo processed 47 signals while you were away</p>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Two-column main content */}
        <div className="grid grid-cols-[1fr_380px] gap-5">

          {/* Left: Duo's activity timeline */}
          <div className="bg-white rounded-xl border border-[#E4E2DC] p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <h2 className="font-semibold text-[14px] text-[#111111] mb-4">Duo&rsquo;s Activity</h2>
            <div className="flex flex-col">
              {(stats.timeline as Array<{ type: string; text: string; time: string; action: string | null }>).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 relative"
                >
                  {/* Vertical line */}
                  {i < stats.timeline.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-[1px] bg-[#E4E2DC]" />
                  )}
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 z-10 ${TYPE_COLOR[item.type] ?? "bg-[#9A9A9A]"}`} />
                  <div className="flex-1 pb-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] text-[#111111] leading-snug">{item.text}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-[#9A9A9A] whitespace-nowrap">{item.time}</span>
                        {item.action && (
                          <button className="text-[11px] text-[#4361EE] font-medium hover:underline cursor-pointer whitespace-nowrap">
                            [{item.action}]
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="text-[12px] text-[#4361EE] font-medium hover:underline mt-1 cursor-pointer">
              View all 47 signals →
            </button>
          </div>

          {/* Right: Needs attention */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-[#E4E2DC] p-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <h2 className="font-semibold text-[14px] text-[#111111] mb-3">Needs your attention</h2>
              <div className="flex flex-col gap-3">
                {(stats.pendingApprovalCards as Array<{ name: string; company: string; channel: string; preview: string }>).map((card, i) => (
                  <div key={i} className="border border-[#E4E2DC] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-[13px] font-semibold text-[#111111]">{card.name}</span>
                        <span className="text-[12px] text-[#9A9A9A]"> · {card.company}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#F0EEE9] text-[#5C5C5C] font-medium">
                        {card.channel === "Email" ? <Mail size={9} /> : <Link2 size={9} />}
                        {card.channel}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5C5C5C] italic leading-relaxed line-clamp-2 mb-2.5">&ldquo;{card.preview}&rdquo;</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 h-6 px-2.5 rounded-md bg-[#27AE60] text-white text-[11px] font-medium cursor-pointer">
                        <Check size={10} /> Approve
                      </button>
                      <button className="h-6 px-2.5 rounded-md border border-[#E4E2DC] text-[11px] text-[#5C5C5C] cursor-pointer">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline snapshot */}
            <div className="bg-white rounded-xl border border-[#E4E2DC] p-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <h2 className="font-semibold text-[14px] text-[#111111] mb-3">Pipeline snapshot</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: stats.meetingsToday, label: "Today's meetings" },
                  { n: 23, label: "Sequences active" },
                  { n: "14.9%", label: "Reply rate (7d)" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[22px] font-bold text-[#0F1923]">{s.n}</div>
                    <div className="text-[11px] text-[#9A9A9A]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
