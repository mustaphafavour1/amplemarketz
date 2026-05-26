"use client";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import stats from "@/data/stats.json";
import { TrendingUp, TrendingDown, Check, Mail, Link2 } from "lucide-react";

const HOME_CHIPS = [
  { icon: "📋", label: "Show today's urgent leads" },
  { icon: "✅", label: "Review pending approvals (12)" },
  { icon: "📊", label: "Summarise yesterday's performance" },
  { icon: "⚡", label: "Start with highest intent signal" },
];

const STAT_CARDS = [
  { value: 47, label: "Signals today", delta: 12, positive: true, deltaLabel: "vs yesterday" },
  { value: 37, label: "Pending actions", delta: -3, positive: false, deltaLabel: "vs yesterday" },
  { value: 23, label: "Active sequences", delta: 5, positive: true, deltaLabel: "vs yesterday" },
  { value: "14.9%", label: "Reply rate (7d)", delta: 2.1, positive: true, deltaLabel: "vs last week" },
  { value: 142, label: "Emails sent today", delta: 8, positive: true, deltaLabel: "vs yesterday" },
  { value: "34.2%", label: "Open rate (7d)", delta: 2.1, positive: true, deltaLabel: "vs last week" },
  { value: 23, label: "Leads researched", delta: 5, positive: true, deltaLabel: "vs yesterday" },
  { value: 12, label: "Autopilot actions", delta: 3, positive: true, deltaLabel: "today" },
];

const TYPE_COLOR: Record<string, string> = {
  job: "bg-[#4361EE]", social: "bg-[#9B59B6]", fund: "bg-[#27AE60]",
  comp: "bg-[#E85D26]", news: "bg-[#F39C12]", approved: "bg-[#27AE60]",
};

function StatCard({
  value, label, delta, positive, deltaLabel,
}: { value: number | string; label: string; delta: number; positive: boolean; deltaLabel: string }) {
  return (
    <motion.div
      whileHover={{ translateY: -2, boxShadow: "0 4px 16px rgba(67,97,238,0.08)" }}
      transition={{ duration: 0.15 }}
      className="grad-border rounded-xl p-4 shrink-0"
      style={{
        minWidth: 200,
        scrollSnapAlign: "start",
        borderRadius: 12,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div className="text-[26px] font-bold text-[#1F2937] leading-none mb-1">{value}</div>
      <div className="text-[11px] text-[#9CA3AF] mb-2">{label}</div>
      <div className={`flex items-center gap-1 text-[10.5px] font-medium ${positive ? "text-[#15803D]" : "text-[#E85D26]"}`}>
        {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {positive ? "+" : ""}{delta}{typeof delta === "number" && typeof value === "string" ? "%" : ""} {deltaLabel}
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
        <p className="text-[11px] text-[#9CA3AF] mb-5">Duo processed 47 signals while you were away</p>

        {/* Stat cards — horizontal scroll-snap */}
        <div
          className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {STAT_CARDS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Two-column main content */}
        <div className="grid grid-cols-[1fr_380px] gap-5">

          {/* Left: Duo's activity timeline */}
          <div className="grad-border rounded-xl border p-5" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
            <h2 className="font-semibold text-[13px] text-[#1F2937] mb-4">Duo&rsquo;s Activity</h2>
            <div className="flex flex-col">
              {(stats.timeline as Array<{ type: string; text: string; time: string; action: string | null }>).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #D4E4EE",
                    borderRadius: 8,
                    padding: "12px 16px",
                    marginBottom: 8,
                  }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${TYPE_COLOR[item.type] ?? "bg-[#9CA3AF]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#374151] leading-snug">{item.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10.5px] text-[#9CA3AF] whitespace-nowrap">{item.time}</span>
                    {item.action && (
                      <button
                        className="text-[11px] cursor-pointer whitespace-nowrap transition-all hover:bg-[#111827] hover:text-white"
                        style={{ border: "1px solid #111827", color: "#111827", borderRadius: 6, padding: "4px 10px", background: "transparent" }}
                      >
                        {item.action}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="text-[11px] text-[#1E40AF] font-medium hover:underline mt-1 cursor-pointer">
              View all 47 signals →
            </button>
          </div>

          {/* Right: Needs attention */}
          <div className="flex flex-col gap-4">
            <div className="grad-border rounded-xl p-4" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h2 className="font-semibold text-[13px] text-[#1F2937] mb-3">Needs your attention</h2>
              <div className="flex flex-col gap-3">
                {(stats.pendingApprovalCards as Array<{ name: string; company: string; channel: string; preview: string }>).map((card, i) => (
                  <div key={i} className="border rounded-lg p-3" style={{ borderColor: "rgba(172,200,215,0.4)" }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-[12px] font-semibold text-[#374151]">{card.name}</span>
                        <span className="text-[11px] text-[#9CA3AF]"> · {card.company}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "#EDF4FB", color: "#6B7280" }}>
                        {card.channel === "Email" ? <Mail size={9} /> : <Link2 size={9} />}
                        {card.channel}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] italic leading-relaxed line-clamp-2 mb-2.5">&ldquo;{card.preview}&rdquo;</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 h-6 px-2.5 rounded-md bg-[#27AE60] text-white text-[10px] font-medium cursor-pointer">
                        <Check size={10} /> Approve
                      </button>
                      <button className="h-6 px-2.5 rounded-md border text-[10px] text-[#6B7280] cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline snapshot */}
            <div className="grad-border rounded-xl p-4" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h2 className="font-semibold text-[13px] text-[#1F2937] mb-3">Pipeline snapshot</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: stats.meetingsToday, label: "Today's meetings" },
                  { n: 23, label: "Sequences active" },
                  { n: "14.9%", label: "Reply rate (7d)" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[20px] font-bold text-[#1F2937]">{s.n}</div>
                    <div className="text-[10.5px] text-[#9CA3AF]">{s.label}</div>
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
