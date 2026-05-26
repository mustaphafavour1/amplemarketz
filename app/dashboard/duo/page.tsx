"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalPill } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import leads from "@/data/leads.json";
import {
  Mail, Link2, Phone, Building2, MapPin, Users, ChevronRight,
  RefreshCw, Sparkles, Check, X, MoreHorizontal
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
  const [selectedId, setSelectedId] = useState(leads[0].id);
  const [activeTab, setActiveTab] = useState<"pending" | "autopilot">("pending");
  const [activeStep, setActiveStep] = useState(0);
  const [emailBody, setEmailBody] = useState(EMAIL_DRAFT.body);
  const [subject, setSubject] = useState(EMAIL_DRAFT.subject);
  const [thinkingOpen, setThinkingOpen] = useState(true);

  const selected = leads.find(l => l.id === selectedId) ?? leads[0];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Duo Copilot" />
      <DuoBar chips={DUO_CHIPS} />

      {/* Three-zone layout */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* ZONE A: Lead list */}
        <div className="w-[310px] shrink-0 flex flex-col border-r bg-white" style={{ borderColor: "#D4E4EE" }}>
          {/* Tabs */}
          <div className="flex border-b px-3 pt-3" style={{ borderColor: "#D4E4EE" }}>
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-t cursor-pointer transition-colors ${activeTab === "pending" ? "text-[#111111] border-b-2 border-[#111111]" : "text-[#9A9A9A]"}`}
            >
              Pending <span className="bg-[#0F1923] text-white text-[10px] px-1.5 py-0.5 rounded-full">37</span>
            </button>
            <button
              onClick={() => setActiveTab("autopilot")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-t cursor-pointer transition-colors ${activeTab === "autopilot" ? "text-[#111111] border-b-2 border-[#111111]" : "text-[#9A9A9A]"}`}
            >
              On autopilot <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "#D4E4EE", color: "#9A9A9A" }}>0</span>
            </button>
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#D4E4EE" }}>
            <button className="text-[11px] text-[#5C5C5C] border rounded px-2 py-1 hover:border-[#111111] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Sort: Date ↕</button>
            <button className="text-[11px] text-[#5C5C5C] border rounded px-2 py-1 hover:border-[#111111] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Filters</button>
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
                className={`w-full flex items-center gap-3 px-3 py-3 border-b hover:bg-[#F0F6FF] transition-colors cursor-pointer text-left group ${selectedId === lead.id ? "bg-blue-50 border-l-[3px] border-l-[#1E40AF]" : ""}`}
                style={{ borderBottomColor: "#D4E4EE" }}
              >
                <Avatar initials={lead.avatar} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[#111111] truncate">{lead.name}</div>
                  <div className="text-[11px] text-[#9A9A9A] truncate">{lead.company} · {lead.title.split(" ").slice(0, 3).join(" ")}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <SignalPill type={lead.signalType} label={lead.signal.length > 18 ? lead.signal.slice(0, 18) + "…" : lead.signal} />
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#D4E4EE" }} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ZONE B: Main detail */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0 p-5" style={{ background: "#F8FAFF" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                background: "#FFFFFF",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              {/* Profile header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={selected.avatar} size={48} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[20px] font-semibold text-[#111111]">{selected.name}</h2>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-[#27AE60] font-medium">New lead</span>
                    </div>
                    <p className="text-[14px] text-[#5C5C5C]">{selected.title} @ {selected.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-3.5 rounded-lg border text-[12px] font-medium text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer flex items-center gap-1.5" style={{ borderColor: "#D4E4EE" }}>
                    <Sparkles size={12} className="text-[#1E40AF]" /> Research
                  </button>
                  <button className="h-8 px-3.5 rounded-lg border text-[12px] font-medium text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Add to sequence</button>
                  <button className="h-8 px-3.5 rounded-lg border text-[12px] font-medium text-[#5C5C5C] hover:border-[#E85D26] hover:text-[#E85D26] transition-colors cursor-pointer flex items-center gap-1" style={{ borderColor: "#D4E4EE" }}>
                    <X size={12} /> Dismiss
                  </button>
                </div>
              </div>

              {/* 3-col info grid */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="rounded-xl p-4" style={{ background: "#F8FAFF" }}>
                  <div className="text-[11px] font-semibold text-[#9A9A9A] uppercase tracking-wider mb-2.5">Contact</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <Mail size={12} className="shrink-0" /> {selected.email}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <Link2 size={12} className="shrink-0" /> {selected.linkedin}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <Phone size={12} className="shrink-0" /> +1 (415) 000-0000
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "#F8FAFF" }}>
                  <div className="text-[11px] font-semibold text-[#9A9A9A] uppercase tracking-wider mb-2.5">Company</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <Building2 size={12} className="shrink-0" /> {selected.company}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <MapPin size={12} className="shrink-0" /> San Francisco, US
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#5C5C5C]">
                      <Users size={12} className="shrink-0" /> 201–500 employees
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "#F8FAFF" }}>
                  <div className="text-[11px] font-semibold text-[#9A9A9A] uppercase tracking-wider mb-2.5">Signal</div>
                  <div className="mb-2">
                    <SignalPill type={selected.signalType} label={selected.signal} />
                  </div>
                  <p className="text-[12px] text-[#5C5C5C] leading-relaxed">
                    {selected.name.split(" ")[0]} has recently engaged with content relevant to your product category.
                  </p>
                </div>
              </div>

              <div className="h-px mb-5" style={{ background: "#D4E4EE" }} />

              {/* AI Recommended Sequence */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#1E40AF]" />
                    <span className="text-[13px] font-semibold text-[#111111]">Duo recommends</span>
                  </div>
                  <span className="text-[11px] text-[#9A9A9A]">4 steps · Mailbox rotation</span>
                </div>

                {/* Horizontal step rail */}
                <div className="flex items-center gap-0 mb-4 overflow-x-auto pb-2">
                  {STEP_CHANNELS.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <motion.button
                        onClick={() => setActiveStep(i)}
                        whileHover={{ y: -1 }}
                        className="flex flex-col items-center px-4 py-3 rounded-xl border-2 min-w-[100px] cursor-pointer transition-all"
                        style={{
                          borderColor: activeStep === i ? "#1E40AF" : "#D4E4EE",
                          background: activeStep === i ? "#EFF4FF" : "#FFFFFF",
                        }}
                      >
                        <span className="text-[10px] text-[#9A9A9A] mb-1">{step.day}</span>
                        <step.icon size={16} className={activeStep === i ? "text-[#1E40AF]" : "text-[#5C5C5C]"} />
                        <span className={`text-[12px] font-medium mt-1 ${activeStep === i ? "text-[#1E40AF]" : "text-[#5C5C5C]"}`}>{step.channel}</span>
                      </motion.button>
                      {i < STEP_CHANNELS.length - 1 && (
                        <div className="flex flex-col items-center w-8">
                          <span className="text-[9px] text-[#9A9A9A] mb-0.5">+{[2, 3, 4][i]}d</span>
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
                    style={{ borderColor: "#D4E4EE" }}
                  >
                    <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: "#D4E4EE", background: "#F8FAFF" }}>
                      <span className="text-[11px] text-[#9A9A9A]">Subject:</span>
                      <input
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="flex-1 mx-3 text-[13px] text-[#111111] bg-transparent outline-none font-medium"
                      />
                      <MoreHorizontal size={14} className="text-[#9A9A9A]" />
                    </div>
                    <textarea
                      value={emailBody}
                      onChange={e => setEmailBody(e.target.value)}
                      rows={7}
                      className="w-full px-4 py-3 text-[13px] text-[#111111] leading-relaxed bg-white outline-none resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: "#F8FAFF", borderColor: "#D4E4EE" }}>
                <span className="text-[11px] text-[#9A9A9A] flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#1E40AF]" />
                  Duo drafted in your voice · 47 approvals trained
                </span>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-3 rounded-lg border bg-white text-[12px] text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer flex items-center gap-1.5" style={{ borderColor: "#D4E4EE" }}>
                    <RefreshCw size={11} /> Regenerate
                  </button>
                  <button className="h-8 px-3 rounded-lg border bg-white text-[12px] text-[#5C5C5C] cursor-pointer" style={{ borderColor: "#D4E4EE" }}>Edit</button>
                  <button className="h-8 px-4 rounded-lg bg-[#1E40AF] text-white text-[12px] font-semibold cursor-pointer flex items-center gap-1.5">
                    <Check size={12} /> Approve &amp; Send
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ZONE C: Duo's thinking */}
        <motion.div
          animate={{ width: thinkingOpen ? 280 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 border-l bg-white flex flex-col"
          style={{ borderColor: "#D4E4EE", overflow: "hidden" }}
        >
          <div style={{ width: 280, minWidth: 280 }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "#D4E4EE" }}>
              <h3 className="text-[13px] font-semibold text-[#111111] flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#1E40AF]" /> Duo&rsquo;s thinking
              </h3>
              <button
                onClick={() => setThinkingOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F0F6FF] transition-colors cursor-pointer"
                aria-label="Collapse Duo thinking panel"
              >
                <ChevronRight size={14} className="text-[#9A9A9A]" />
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
                    ? <Check size={13} className="text-[#27AE60] mt-0.5 shrink-0" />
                    : <RefreshCw size={13} className="text-[#1E40AF] mt-0.5 shrink-0 animate-spin" />
                  }
                  <span className={`text-[12px] leading-snug ${item.done ? "text-[#5C5C5C]" : "text-[#111111]"}`}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4">
              <p className="text-[11px] font-semibold text-[#9A9A9A] uppercase tracking-wider mb-3">Similar leads to action next</p>
              {leads.slice(1, 3).map(lead => (
                <div key={lead.id} className="flex items-center gap-2.5 mb-3 p-2.5 rounded-lg border hover:bg-[#F8FAFF] transition-colors" style={{ borderColor: "#D4E4EE" }}>
                  <Avatar initials={lead.avatar} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-[#111111] truncate">{lead.name}</div>
                    <div className="text-[10px] text-[#9A9A9A] truncate">{lead.company}</div>
                  </div>
                  <button className="text-[10px] text-[#1E40AF] font-medium border border-[#1E40AF] px-2 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">Queue</button>
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
              className="absolute right-3 top-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium cursor-pointer hover:bg-[#EFF4FF] transition-colors"
              style={{ background: "#FFFFFF", borderColor: "#D4E4EE", color: "#1E40AF" }}
            >
              <Sparkles size={11} />
              Duo&rsquo;s thinking
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
