"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalPill } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import leads from "@/data/leads.json";
import {
  Mail, Link2, Phone, Building2, MapPin, Users, ChevronRight, ChevronLeft,
  RefreshCw, Sparkles, Check, X, MoreHorizontal, MessageSquare
} from "lucide-react";

const DUO_CHIPS = [
  { icon: "🔴", label: "Show most urgent leads" },
  { icon: "📅", label: "Prioritise follow-ups due today" },
  { icon: "🏢", label: "Filter by company size: Enterprise" },
  { icon: "⚡", label: "Auto-approve low-risk sequences" },
  { icon: "👤", label: "Focus on:", expandable: true },
];

const DUO_THINKING = [
  { text: "Researched 3 recent LinkedIn posts", done: true },
  { text: "Cross-referenced 2 competitor signals", done: true },
  { text: "Matched tone to 47 past approvals", done: true },
  { text: "Checking email deliverability...", done: false },
];

const STEP_CHANNELS = [
  { day: "Day 0", channel: "Email", icon: Mail },
  { day: "Day 2", channel: "LinkedIn", icon: Link2 },
  { day: "Day 5", channel: "Email", icon: Mail },
  { day: "Day 9", channel: "Call", icon: Phone },
];

const EMAIL_DRAFT = {
  subject: "Saw you liked the event post",
  body: `Hi {{firstName}},\n\nSaw your post about attending HumanX. I'd love to give you a quick demo of Amplemarket and show you how we can help your sales team.\n\nWould you be open to meeting up?\n\n{{senderName}}`,
};

type Lead = typeof leads[0];

export default function DuoCopilotPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "autopilot">("pending");
  const [activeStep, setActiveStep] = useState(0);
  const [emailBody, setEmailBody] = useState(EMAIL_DRAFT.body);
  const [subject, setSubject] = useState(EMAIL_DRAFT.subject);
  const [thinkingOpen, setThinkingOpen] = useState(true);
  const [leftOpen, setLeftOpen] = useState(true);

  const selected = selectedId ? (leads.find(l => l.id === selectedId) ?? null) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Duo Copilot" />
      <DuoBar chips={DUO_CHIPS} />

      {/* Three-zone layout */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* ZONE A: Lead list (collapsible) */}
        <motion.div
          animate={{ width: leftOpen ? 300 : 52 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 flex flex-col border-r"
          style={{ borderColor: "#D4E4EE", background: "rgba(255,255,255,0.88)", overflow: "hidden" }}
        >
          {leftOpen ? (
            /* Expanded left panel */
            <div style={{ width: 300, minWidth: 300 }}>
              {/* Tabs row + collapse button */}
              <div className="flex items-center border-b px-3 pt-3 justify-between" style={{ borderColor: "#D4E4EE" }}>
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-t cursor-pointer transition-colors ${activeTab === "pending" ? "text-[#374151] border-b-2 border-[#374151]" : "text-[#9CA3AF]"}`}
                  >
                    Pending <span className="bg-[#0F1923] text-white text-[9px] px-1.5 py-0.5 rounded-full">37</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("autopilot")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-t cursor-pointer transition-colors ${activeTab === "autopilot" ? "text-[#374151] border-b-2 border-[#374151]" : "text-[#9CA3AF]"}`}
                  >
                    On autopilot <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "#D4E4EE", color: "#9CA3AF" }}>0</span>
                  </button>
                </div>
                <button
                  onClick={() => setLeftOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F0F6FF] transition-colors cursor-pointer mb-1"
                  aria-label="Collapse lead list"
                >
                  <ChevronLeft size={13} className="text-[#9CA3AF]" />
                </button>
              </div>

              {/* Filter row */}
              <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#D4E4EE" }}>
                <button className="text-[9px] text-[#6B7280] border rounded px-2 py-1 hover:border-[#374151] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Sort: Date ↕</button>
                <button className="text-[9px] text-[#6B7280] border rounded px-2 py-1 hover:border-[#374151] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Filters</button>
              </div>

              {/* Lead items */}
              <div className="flex-1 overflow-y-auto">
                {leads.map((lead, i) => (
                  <motion.button
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedId(lead.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 border-b hover:bg-[#F0F6FF] transition-all cursor-pointer text-left group ${selectedId === lead.id ? "bg-blue-50 border-l-[3px] border-l-[#1E40AF]" : ""}`}
                    style={{ borderBottomColor: "#D4E4EE" }}
                  >
                    <Avatar initials={lead.avatar} size={28} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-[#374151] truncate">{lead.name}</div>
                      <div className="text-[7px] text-[#9CA3AF] truncate">{lead.company} · {lead.title.split(" ").slice(0, 3).join(" ")}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <SignalPill type={lead.signalType} label={lead.signal.length > 16 ? lead.signal.slice(0, 16) + "…" : lead.signal} />
                      {selectedId === lead.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1E40AF]" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* Collapsed left panel — avatar + initials chip */
            <div className="flex flex-col items-center py-3 gap-2" style={{ width: 52, minWidth: 52 }}>
              <button
                onClick={() => setLeftOpen(true)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F0F6FF] transition-colors cursor-pointer mb-1"
                aria-label="Expand lead list"
              >
                <ChevronRight size={13} className="text-[#9CA3AF]" />
              </button>
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => { setSelectedId(lead.id); setLeftOpen(true); }}
                  className="relative group cursor-pointer"
                  title={`${lead.name} · ${lead.company}`}
                >
                  <div
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all"
                    style={{
                      background: selectedId === lead.id ? "#EFF4FF" : "#F0F2F5",
                      border: selectedId === lead.id ? "1.5px solid #1E40AF" : "1.5px solid transparent",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0"
                      style={{
                        background: selectedId === lead.id ? "#1E40AF" : "#D4E4EE",
                        color: selectedId === lead.id ? "white" : "#6B7280",
                      }}
                    >
                      {lead.avatar}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ZONE B: Main detail */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0 p-5" style={{ background: "rgba(248,250,255,0.8)" }}>
          <AnimatePresence mode="wait">
            {!selected ? (
              /* Empty / default state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-16"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 2px 20px rgba(67,97,238,0.06)",
                  borderRadius: 16,
                  border: "4px solid rgba(147,197,253,0.18)",
                  padding: 40,
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#EFF4FF" }}>
                  <Sparkles size={24} className="text-[#1E40AF]" />
                </div>
                <h3 className="text-[16px] font-semibold text-[#374151] mb-2">Select any lead to get started</h3>
                <p className="text-[13px] text-[#9CA3AF] max-w-[320px] leading-relaxed mb-6">
                  Click a name from the list on the left, or just chat with Duo to get a summary for any of them — or all of them at once.
                </p>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "rgba(239,244,255,0.8)", border: "0.3px solid rgba(147,197,253,0.4)" }}>
                  <MessageSquare size={13} className="text-[#1E40AF]" />
                  <span className="text-[11px] text-[#1E40AF] font-medium">Ask Duo to summarise all pending leads →</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 2px 20px rgba(67,97,238,0.06)",
                  borderRadius: 16,
                  border: "4px solid rgba(147,197,253,0.18)",
                  padding: 28,
                }}
              >
                {/* Profile header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Avatar initials={selected.avatar} size={48} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[18px] font-semibold text-[#374151]">{selected.name}</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-[#27AE60] font-medium">New lead</span>
                      </div>
                      <p className="text-[13px] text-[#6B7280]">{selected.title} @ {selected.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-8 px-3.5 rounded-lg border text-[11px] font-medium text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer flex items-center gap-1.5" style={{ borderColor: "#D4E4EE" }}>
                      <Sparkles size={12} className="text-[#1E40AF]" /> Research
                    </button>
                    <button className="h-8 px-3.5 rounded-lg border text-[11px] font-medium text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Add to sequence</button>
                    <button className="h-8 px-3.5 rounded-lg border text-[11px] font-medium text-[#6B7280] hover:border-[#E85D26] hover:text-[#E85D26] transition-colors cursor-pointer flex items-center gap-1" style={{ borderColor: "#D4E4EE" }}>
                      <X size={12} /> Dismiss
                    </button>
                  </div>
                </div>

                {/* 3-col info grid */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { title: "Contact", rows: [
                      { icon: Mail, text: selected.email },
                      { icon: Link2, text: selected.linkedin },
                      { icon: Phone, text: "+1 (415) 000-0000" },
                    ]},
                    { title: "Company", rows: [
                      { icon: Building2, text: selected.company },
                      { icon: MapPin, text: "San Francisco, US" },
                      { icon: Users, text: "201–500 employees" },
                    ]},
                  ].map((col, ci) => (
                    <div key={ci} className="rounded-xl p-4" style={{ background: "rgba(248,250,255,0.8)" }}>
                      <div className="text-[9px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">{col.title}</div>
                      <div className="flex flex-col gap-2">
                        {col.rows.map((row, ri) => {
                          const Icon = row.icon;
                          return (
                            <div key={ri} className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                              <Icon size={11} className="shrink-0" /> {row.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-4" style={{ background: "rgba(248,250,255,0.8)" }}>
                    <div className="text-[9px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">Signal</div>
                    <div className="mb-2">
                      <SignalPill type={selected.signalType} label={selected.signal} />
                    </div>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      {selected.name.split(" ")[0]} has recently engaged with content relevant to your product category.
                    </p>
                  </div>
                </div>

                <div className="h-px mb-5" style={{ background: "rgba(172,200,215,0.4)" }} />

                {/* AI Recommended Sequence */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#1E40AF]" />
                      <span className="text-[12px] font-semibold text-[#374151]">Duo recommends</span>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF]">4 steps · Mailbox rotation</span>
                  </div>

                  {/* Minimal horizontal step rail — no containers */}
                  <div className="flex items-center justify-between px-2 mb-5">
                    {STEP_CHANNELS.map((step, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <button
                          onClick={() => setActiveStep(i)}
                          className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
                        >
                          <span className="text-[8px] text-[#9CA3AF]">{step.day}</span>
                          <div
                            className="flex items-center justify-center transition-all"
                            style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: activeStep === i ? "#EFF4FF" : "transparent",
                            }}
                          >
                            <step.icon
                              size={15}
                              style={{ color: activeStep === i ? "#1E40AF" : "#9CA3AF" }}
                            />
                          </div>
                          <span className="text-[8px] font-medium" style={{ color: activeStep === i ? "#1E40AF" : "#9CA3AF" }}>{step.channel}</span>
                        </button>
                        {i < STEP_CHANNELS.length - 1 && (
                          <div className="flex-1 flex flex-col items-center mx-2">
                            <span className="text-[7px] text-[#C5D6E4] mb-0.5">+{[2, 3, 4][i]}d</span>
                            <div className="w-full h-px" style={{ background: "#D4E4EE" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Email preview */}
                  {activeStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-xl overflow-hidden"
                      style={{ borderColor: "rgba(147,197,253,0.35)" }}
                    >
                      <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: "#D4E4EE", background: "rgba(248,250,255,0.8)" }}>
                        <span className="text-[10.5px] text-[#9CA3AF]">Subject:</span>
                        <input
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          className="flex-1 mx-3 text-[12px] text-[#374151] bg-transparent outline-none font-medium"
                        />
                        <MoreHorizontal size={14} className="text-[#9CA3AF]" />
                      </div>
                      <textarea
                        value={emailBody}
                        onChange={e => setEmailBody(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 text-[12px] text-[#374151] leading-relaxed bg-white outline-none resize-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Action bar */}
                <div className="flex items-center justify-between p-3 rounded-xl border"
                  style={{ background: "rgba(248,250,255,0.8)", borderColor: "rgba(172,200,215,0.4)" }}>
                  <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#1E40AF]" />
                    Duo drafted in your voice · 47 approvals trained
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-lg border bg-white text-[11px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer flex items-center gap-1.5" style={{ borderColor: "#D4E4EE" }}>
                      <RefreshCw size={11} /> Regenerate
                    </button>
                    <button className="h-8 px-3 rounded-lg border bg-white text-[11px] text-[#6B7280] cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Edit</button>
                    <button className="h-8 px-4 rounded-lg bg-[#1E40AF] text-white text-[11px] font-semibold cursor-pointer flex items-center gap-1.5">
                      <Check size={12} /> Approve &amp; Send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ZONE C: Duo's thinking */}
        <motion.div
          animate={{ width: thinkingOpen ? 272 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 border-l flex flex-col"
          style={{ borderColor: "rgba(172,200,215,0.4)", background: "rgba(255,255,255,0.88)", overflow: "hidden" }}
        >
          <div style={{ width: 272, minWidth: 272 }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "#D4E4EE" }}>
              <h3 className="text-[11px] font-semibold text-[#374151] flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#1E40AF]" /> Duo&rsquo;s thinking
              </h3>
              <button
                onClick={() => setThinkingOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F0F6FF] transition-colors cursor-pointer"
              >
                <ChevronRight size={14} className="text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3 border-b" style={{ borderColor: "#D4E4EE" }}>
              {DUO_THINKING.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="flex items-start gap-2.5"
                >
                  {item.done
                    ? <Check size={12} className="text-[#27AE60] mt-0.5 shrink-0" />
                    : <RefreshCw size={12} className="text-[#1E40AF] mt-0.5 shrink-0 animate-spin" />
                  }
                  <span className={`text-[10px] leading-snug ${item.done ? "text-[#6B7280]" : "text-[#374151]"}`}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4">
              <p className="text-[8px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Similar leads to action next</p>
              {leads.slice(1, 3).map(lead => (
                <div key={lead.id} className="flex items-center gap-2.5 mb-3 p-2.5 rounded-lg border hover:bg-[#F8FAFF] transition-colors" style={{ borderColor: "#D4E4EE" }}>
                  <Avatar initials={lead.avatar} size={28} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold text-[#374151] truncate">{lead.name}</div>
                    <div className="text-[8px] text-[#9CA3AF] truncate">{lead.company}</div>
                  </div>
                  <button className="text-[9px] text-[#1E40AF] font-medium border border-[#1E40AF] px-2 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">Queue</button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Re-open button when thinking panel is collapsed */}
        <AnimatePresence>
          {!thinkingOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setThinkingOpen(true)}
              className="absolute right-3 top-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-medium cursor-pointer hover:bg-[#EFF4FF] transition-colors"
              style={{ background: "rgba(255,255,255,0.92)", borderColor: "#D4E4EE", color: "#1E40AF" }}
            >
              <Sparkles size={10} />
              Duo&rsquo;s thinking
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
