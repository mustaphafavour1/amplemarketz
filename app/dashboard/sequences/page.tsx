"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { DuoPanel } from "@/components/ui/DuoPanel";
import sequences from "@/data/sequences.json";
import { Mail, Link2, Phone, Play, Pause, Plus } from "lucide-react";

const SEQ_CHIPS = [
  { icon: "✍️", label: "Generate sequence for selected leads" },
  { icon: "📈", label: "Show best performing sequences" },
  { icon: "🔁", label: "Re-engage cold prospects" },
  { icon: "🎯", label: "Optimise subject lines" },
];

const CHANNEL_ICONS: Record<string, React.ElementType> = { Email: Mail, LinkedIn: Link2, Call: Phone };

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-50 text-[#27AE60]",
  Draft: "bg-[#F0EEE9] text-[#9A9A9A]",
  Paused: "bg-amber-50 text-[#F39C12]",
};

export default function SequencesPage() {
  const [duoOpen, setDuoOpen] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Sequences" onAskDuo={() => setDuoOpen(true)} />
      <DuoBar chips={SEQ_CHIPS} onAskDuo={() => setDuoOpen(true)} />

      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[15px] font-semibold text-[#111111]">All Sequences</h2>
            <p className="text-[12px] text-[#9A9A9A]">{sequences.length} sequences</p>
          </div>
          <Link href="/dashboard/sequences/new">
            <button className="h-8 px-3.5 rounded-lg bg-[#0F1923] text-white text-[12px] font-medium cursor-pointer flex items-center gap-1.5">
              <Plus size={13} /> New sequence
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {sequences.map((seq, i) => {
            const Icon = CHANNEL_ICONS;
            return (
              <motion.div
                key={seq.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-[#E4E2DC] p-4 hover:shadow-md transition-shadow"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Link href={`/dashboard/sequences/${seq.id}`}>
                        <span className="text-[15px] font-semibold text-[#111111] hover:text-[#4361EE] transition-colors cursor-pointer">{seq.name}</span>
                      </Link>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[seq.status] ?? "bg-[#F0EEE9] text-[#9A9A9A]"}`}>
                        {seq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-[#9A9A9A]">
                      <span>{seq.leads} leads</span>
                      <span>Open rate: {seq.openRate}</span>
                      <span>Reply rate: {seq.replyRate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-7 px-3 rounded-lg border border-[#E4E2DC] text-[11px] text-[#5C5C5C] cursor-pointer hover:border-[#111111] transition-colors flex items-center gap-1">
                      {seq.status === "Active" ? <Pause size={11} /> : <Play size={11} />}
                      {seq.status === "Active" ? "Pause" : "Activate"}
                    </button>
                    <Link href={`/dashboard/sequences/${seq.id}`}>
                      <button className="h-7 px-3 rounded-lg bg-[#0F1923] text-white text-[11px] font-medium cursor-pointer">Open</button>
                    </Link>
                  </div>
                </div>

                {/* Step chips */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {seq.steps.map((step, si) => {
                    const StepIcon = CHANNEL_ICONS[step.channel] ?? Mail;
                    return (
                      <div key={si} className="flex items-center gap-0">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium shrink-0 ${step.status === "approved" ? "border-[#27AE60] bg-green-50 text-[#27AE60]" : "border-[#E4E2DC] text-[#5C5C5C]"}`}>
                          <StepIcon size={11} />
                          {step.channel}
                          <span className="text-[10px] text-[#9A9A9A]">Day {step.day}</span>
                        </div>
                        {si < seq.steps.length - 1 && (
                          <div className="flex flex-col items-center px-1 shrink-0">
                            <div className="w-6 h-px bg-[#E4E2DC]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DuoPanel open={duoOpen} onClose={() => setDuoOpen(false)} />
    </div>
  );
}
