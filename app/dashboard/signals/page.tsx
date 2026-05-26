"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalPill, signalBorder } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import signals from "@/data/signals.json";
import { Sparkles, Plus } from "lucide-react";

const SIGNAL_CHIPS = [
  { icon: "💼", label: "Job changes only" },
  { icon: "🔥", label: "Highest intent" },
  { icon: "🏦", label: "Funding rounds" },
  { icon: "🏢", label: "Focus on:", expandable: true },
  { icon: "📊", label: "Summarise today's signals" },
];

const TABS = [
  { key: "all", label: "All", count: 24 },
  { key: "job", label: "Job Changes", count: 8 },
  { key: "social", label: "Social", count: 6 },
  { key: "fund", label: "Funding", count: 4 },
  { key: "comp", label: "Competitor", count: 3 },
  { key: "news", label: "News", count: 3 },
];

const SIGNAL_ICONS: Record<string, string> = {
  job: "💼", social: "💬", fund: "💰", comp: "⚡", news: "📰",
};

const BORDER_CLASSES: Record<string, string> = {
  job: "border-l-[#4361EE]",
  social: "border-l-[#9B59B6]",
  fund: "border-l-[#27AE60]",
  comp: "border-l-[#E85D26]",
  news: "border-l-[#F39C12]",
};

export default function SignalsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeTab === "all" ? signals : signals.filter(s => s.type === activeTab);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Signals" breadcrumb="Dashboard" />
      <DuoBar chips={SIGNAL_CHIPS} />

      <div className="flex-1 overflow-y-auto">
        {/* Page header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#D4E4EE] bg-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[15px] font-semibold text-[#374151]">24 new today</h2>
              <p className="text-[12px] text-[#9CA3AF]">from 20+ sources</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-7 px-3 rounded-lg border border-[#D4E4EE] text-[11px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer">Sort ↕</button>
              <button className="h-7 px-3 rounded-lg border border-[#D4E4EE] text-[11px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer">Date range</button>
              <button className="h-7 px-3 rounded-lg border border-[#D4E4EE] text-[11px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer">Team member</button>
            </div>
          </div>

          {/* Tab pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-[#0F1923] text-white"
                    : "border border-[#D4E4EE] text-[#6B7280] hover:border-[#9A9A9A]"
                }`}
              >
                {tab.label}
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-[#EDF4FB] text-[#9CA3AF]"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Signal list */}
        <div className="divide-y divide-[#D4E4EE]">
          {filtered.map((signal, i) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredId(signal.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex items-center gap-4 px-5 py-4 bg-white border-l-[3px] transition-colors hover:bg-[#F0F6FF] ${BORDER_CLASSES[signal.type] ?? "border-l-[#D4E4EE]"}`}
            >
              {/* Zone 1: Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F8FAFF] text-[18px] shrink-0">
                {SIGNAL_ICONS[signal.type] ?? "📌"}
              </div>

              {/* Zone 2: Who + what */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Avatar initials={signal.avatar} size={24} />
                  <span className="text-[14px] font-semibold text-[#374151]">{signal.person}</span>
                  <span className="text-[13px] text-[#9CA3AF]">· {signal.company}</span>
                </div>
                <p className="text-[13px] text-[#6B7280]">{signal.signal}</p>
              </div>

              {/* Zone 3: Pill + source */}
              <div className="w-[160px] shrink-0">
                <div className="mb-1"><SignalPill type={signal.type} /></div>
                <div className="text-[11px] text-[#9CA3AF]">via {signal.source} · {signal.time}</div>
              </div>

              {/* Zone 4: Actions (hover reveal) */}
              <div className={`flex items-center gap-2 w-[180px] shrink-0 transition-opacity ${hoveredId === signal.id ? "opacity-100" : "opacity-0"}`}>
                <button className="flex items-center gap-1 h-7 px-3 rounded-lg border border-[#D4E4EE] text-[11px] font-medium text-[#6B7280] hover:border-[#4361EE] hover:text-[#4361EE] transition-colors cursor-pointer">
                  <Sparkles size={10} /> Research
                </button>
                <button className="flex items-center gap-1 h-7 px-3 rounded-lg border border-[#D4E4EE] text-[11px] font-medium text-[#6B7280] hover:border-[#27AE60] hover:text-[#27AE60] transition-colors cursor-pointer">
                  <Plus size={10} /> Sequence
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
