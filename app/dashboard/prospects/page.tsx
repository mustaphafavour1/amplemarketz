"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalPill } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import leads from "@/data/leads.json";
import { ExternalLink, Mail, Link2, Sparkles } from "lucide-react";

const PROSPECT_CHIPS = [
  { icon: "🎯", label: "Find VPs of Sales at Series B companies" },
  { icon: "🔍", label: "Research selected contact" },
  { icon: "📋", label: "Add to sequence" },
  { icon: "💬", label: "Draft intro message" },
];

const SIGNAL_COLORS: Record<string, string> = {
  job: "#4361EE", social: "#9B59B6", fund: "#27AE60", comp: "#E85D26", news: "#F39C12",
};

const AI_PROSPECT_SUMMARIES: Record<string, { nextStep: string; notes: string }> = {
  job: { nextStep: "Personalise outreach with a congrats note on their new role.", notes: "Decision-making authority likely shifted — good window to introduce a new tool." },
  social: { nextStep: "Reference their latest post in your opening line.", notes: "Highly engaged on LinkedIn. Mirror their content themes for higher reply rate." },
  fund: { nextStep: "Lead with ROI — they have budget to spend post-raise.", notes: "Series funding means headcount growth. Pitch the scaling angle." },
  comp: { nextStep: "Differentiation email today — they are actively evaluating.", notes: "Checked competitor pricing multiple times. High intent to switch vendors." },
  news: { nextStep: "Mention the press coverage to build rapport.", notes: "Company in growth mode. Position your product as the next step in their journey." },
};

export default function ProspectsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Prospects" />
      <DuoBar chips={PROSPECT_CHIPS} />

      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[15px] font-semibold text-[#374151]">All Prospects</h2>
            <p className="text-[12px] text-[#9CA3AF]">{leads.length} contacts</p>
          </div>
          <div className="flex gap-2">
            <button className="h-8 px-3.5 rounded-lg border border-[#D4E4EE] text-[12px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer">Import</button>
            <button className="h-8 px-3.5 rounded-lg bg-[#0F1923] text-white text-[12px] font-medium cursor-pointer">+ Add prospect</button>
          </div>
        </div>

        {/* Table header */}
        <div className="bg-white rounded-t-xl border border-b-0 border-[#D4E4EE] overflow-hidden">
          <div className="grid bg-[#F8FAFF] border-b border-[#D4E4EE]" style={{ gridTemplateColumns: "2fr 1.2fr 1.4fr 0.8fr 1fr" }}>
            {["Name", "Company", "Signal", "Contact", "Actions"].map(h => (
              <div key={h} className="px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">{h}</div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="bg-white rounded-b-xl border border-[#D4E4EE] overflow-hidden divide-y divide-[#D4E4EE]">
          {leads.map((lead, i) => {
            const isHovered = hoveredId === lead.id;
            const summary = AI_PROSPECT_SUMMARIES[lead.signalType] ?? AI_PROSPECT_SUMMARIES.job;
            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onMouseEnter={() => setHoveredId(lead.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={isHovered ? { boxShadow: "inset 0 0 0 2px rgba(67,97,238,0.12)" } : {}}
              >
                {/* Main row */}
                <div className="grid items-center transition-all" style={{ gridTemplateColumns: "2fr 1.2fr 1.4fr 0.8fr 1fr" }}>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={lead.avatar} size={32} />
                      <div>
                        <Link href={`/dashboard/prospects/sarah-chen`}>
                          <span className="text-[13px] font-semibold text-[#374151] hover:text-[#4361EE] transition-colors cursor-pointer">{lead.name}</span>
                        </Link>
                        <div className="text-[11px] text-[#9CA3AF]">{lead.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-[13px] text-[#6B7280]">{lead.company}</div>
                  <div className="px-4 py-3">
                    <SignalPill type={lead.signalType} label={lead.signal.length > 22 ? lead.signal.slice(0, 22) + "…" : lead.signal} />
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${lead.email}`} className="text-[#9CA3AF] hover:text-[#4361EE] transition-colors"><Mail size={13} /></a>
                      <a href="#" className="text-[#9CA3AF] hover:text-[#4361EE] transition-colors"><Link2 size={13} /></a>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className={`flex items-center gap-2 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <Link href="/dashboard/prospects/sarah-chen">
                        <button className="h-6 px-2.5 text-[11px] font-medium text-[#4361EE] border border-[#4361EE] rounded-md hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1">
                          <ExternalLink size={10} /> View
                        </button>
                      </Link>
                      <button className="h-6 px-2.5 text-[11px] font-medium text-[#6B7280] border border-[#D4E4EE] rounded-md hover:border-[#374151] transition-colors cursor-pointer">+ Sequence</button>
                    </div>
                  </div>
                </div>

                {/* AI Summary panel */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="mx-4 mb-3 px-4 py-3 rounded-xl flex gap-6"
                        style={{ background: "rgba(239,244,255,0.7)", border: "0.5px solid rgba(147,197,253,0.4)" }}>
                        <div className="flex items-center gap-1.5 shrink-0 self-start pt-0.5">
                          <Sparkles size={11} className="text-[#1E40AF]" />
                          <span className="text-[9px] font-semibold text-[#1E40AF] uppercase tracking-wide">Duo suggests</span>
                        </div>
                        <div className="flex gap-6 flex-1">
                          <div className="min-w-0">
                            <div className="text-[9px] font-semibold text-[#374151] uppercase tracking-wide mb-1">Next step</div>
                            <p className="text-[11px] text-[#4B5563] leading-relaxed">{summary.nextStep}</p>
                          </div>
                          <div className="min-w-0">
                            <div className="text-[9px] font-semibold text-[#374151] uppercase tracking-wide mb-1">Intelligence note</div>
                            <p className="text-[11px] text-[#4B5563] leading-relaxed">{summary.notes}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
