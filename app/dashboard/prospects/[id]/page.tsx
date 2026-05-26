"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalDot } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import prospect from "@/data/prospect.json";
import { Mail, Link2, Phone, Tag, Sparkles, Plus, FileText } from "lucide-react";

const PROSPECT_CHIPS = [
  { icon: "🎯", label: "Find VPs of Sales at Series B companies" },
  { icon: "🔍", label: "Research selected contact" },
  { icon: "📋", label: "Add to sequence" },
  { icon: "💬", label: "Draft intro message" },
];

const TABS = ["Overview", "Signals", "Sequences", "Activity"];

export default function ProspectProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title={prospect.name} breadcrumb="Prospects" />
      <DuoBar chips={PROSPECT_CHIPS} />

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left sticky column */}
        <div className="w-[340px] shrink-0 border-r border-[#D4E4EE] overflow-y-auto bg-white">
          <div className="p-5">
            {/* Contact card */}
            <div className="flex items-start gap-3 mb-5">
              <Avatar initials={prospect.avatar} size={56} />
              <div>
                <h2 className="text-[18px] font-semibold text-[#374151]">{prospect.name}</h2>
                <p className="text-[13px] text-[#6B7280]">{prospect.title}</p>
                <p className="text-[13px] text-[#9CA3AF]">{prospect.company}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mb-5 pb-5 border-b border-[#D4E4EE]">
              <div className="flex items-center gap-2.5 text-[13px] text-[#6B7280]">
                <Mail size={14} className="text-[#9CA3AF] shrink-0" />
                <a href={`mailto:${prospect.email}`} className="hover:text-[#4361EE] transition-colors">{prospect.email}</a>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#6B7280]">
                <Link2 size={14} className="text-[#9CA3AF] shrink-0" />
                <a href="#" className="hover:text-[#4361EE] transition-colors">{prospect.linkedin}</a>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-[#6B7280]">
                <Phone size={14} className="text-[#9CA3AF] shrink-0" />
                <span>{prospect.phone}</span>
              </div>
            </div>

            {/* Signal history */}
            <div className="mb-5 pb-5 border-b border-[#D4E4EE]">
              <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Recent signals (3)</p>
              <div className="flex flex-col gap-2.5">
                {prospect.signals.map((sig, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <SignalDot type={sig.type} />
                    <div>
                      <p className="text-[12px] text-[#6B7280] leading-snug">{sig.description}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{sig.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-[11px] text-[#4361EE] hover:underline mt-2 cursor-pointer">View all →</button>
            </div>

            {/* Tags */}
            <div className="mb-5 pb-5 border-b border-[#D4E4EE]">
              <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {prospect.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#EDF4FB] text-[#6B7280]">
                    <Tag size={9} />{tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-[#6B7280]">
                Stack: {prospect.companyDetails.stack.join(" · ")}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button className="w-full h-9 rounded-lg bg-[#4361EE] text-white text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-[#2a4bd4] transition-colors">
                <Plus size={14} /> Add to sequence
              </button>
              <button className="w-full h-9 rounded-lg border border-[#D4E4EE] text-[#6B7280] text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer hover:border-[#374151] transition-colors">
                <FileText size={14} /> Log a note
              </button>
            </div>
          </div>
        </div>

        {/* Right column: tabs */}
        <div className="flex-1 overflow-y-auto">
          {/* Tab bar */}
          <div className="flex border-b border-[#D4E4EE] bg-white px-5 sticky top-0 z-10">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-[13px] font-medium transition-colors cursor-pointer border-b-2 ${activeTab === tab ? "text-[#374151] border-[#111111]" : "text-[#9CA3AF] border-transparent hover:text-[#6B7280]"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div className="p-6">
              {/* AI Research card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-[#D4E4EE] p-5 mb-5"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[#4361EE]" />
                    <span className="font-semibold text-[14px] text-[#374151]">Duo Research</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#4361EE] font-medium border border-blue-100">AI</span>
                  </div>
                  <span className="text-[11px] text-[#9CA3AF]">Updated 4 min ago</span>
                </div>
                <p className="text-[15px] text-[#374151] leading-[1.7]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {prospect.researchSummary}
                </p>
              </motion.div>

              {/* Talking points */}
              <div>
                <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Talking points Duo suggests</p>
                <div className="grid grid-cols-3 gap-3">
                  {prospect.talkingPoints.map((tp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="bg-white rounded-xl border border-[#D4E4EE] p-4 flex flex-col gap-2"
                      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                    >
                      <p className="text-[13px] font-semibold text-[#374151]">{tp.title}</p>
                      <p className="text-[12px] text-[#6B7280] leading-relaxed flex-1">{tp.body}</p>
                      <button className="h-7 w-full rounded-md bg-[#F8FAFF] text-[11px] font-medium text-[#6B7280] hover:bg-[#D4E4EE] transition-colors cursor-pointer mt-1">
                        Use this
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Overview" && (
            <div className="flex flex-col items-center justify-center h-64 text-[#9CA3AF]">
              <p className="text-[14px]">{activeTab} data coming soon</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
