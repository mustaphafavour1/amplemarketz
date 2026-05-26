"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import sequences from "@/data/sequences.json";
import { Mail, Link2, Phone, Play, Pause, Plus, Sparkles } from "lucide-react";

const SEQ_CHIPS = [
  { icon: "✍️", label: "Generate sequence for selected leads" },
  { icon: "📈", label: "Show best performing sequences" },
  { icon: "🔁", label: "Re-engage cold prospects" },
  { icon: "🎯", label: "Optimise subject lines" },
];

const CHANNEL_ICONS: Record<string, React.ElementType> = { Email: Mail, LinkedIn: Link2, Call: Phone };

const DUO_INSIGHTS: Record<string, string> = {
  seq1: "SaaStr event sequences have 32% open rate — 2.1x above average. Consider expanding to similar conference attendees.",
  seq2: "VP Promotion sequences have 41% open rate — 3x above average. Consider expanding this signal.",
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  Active: { background: "#F0FDF4", color: "#15803D" },
  Draft:  { background: "rgba(172,200,215,0.2)", color: "#9CA3AF" },
  Paused: { background: "#FFFBEB", color: "#D97706" },
};

const SUGGESTED = [
  {
    name: "Competitor Win-back (expanded)",
    desc: "Based on 4 new competitor signals this week",
  },
  {
    name: "SaaStr Attendees Follow-up",
    desc: "12 prospects attended SaaStr — Duo can build this sequence now",
  },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(172,200,215,0.3)", borderRadius: 100 }}>
      <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color, borderRadius: 100 }} />
    </div>
  );
}

function parseRate(r: string) {
  return r === "—" ? 0 : parseFloat(r);
}

export default function SequencesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Sequences" />
      <DuoBar chips={SEQ_CHIPS} />

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Main list */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[13px] font-semibold" style={{ color: "var(--c-text-1)" }}>All Sequences</h2>
              <p className="text-[11px]" style={{ color: "var(--c-text-3)" }}>{sequences.length} sequences</p>
            </div>
            <Link href="/dashboard/sequences/new">
              <button className="h-8 px-4 rounded-lg text-white text-[11px] font-medium cursor-pointer flex items-center gap-1.5" style={{ background: "var(--c-navy)" }}>
                <Plus size={13} /> New sequence
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {sequences.map((seq, i) => {
              const openNum = parseRate(seq.openRate);
              const replyNum = parseRate(seq.replyRate);
              const insight = DUO_INSIGHTS[seq.id];
              return (
                <motion.div
                  key={seq.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="grad-border hover:shadow-md transition-shadow"
                  style={{ borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/dashboard/sequences/${seq.id}`}>
                          <span className="text-[13px] font-semibold cursor-pointer hover:text-[#1E40AF] transition-colors" style={{ color: "var(--c-text-1)" }}>{seq.name}</span>
                        </Link>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={STATUS_STYLE[seq.status] ?? STATUS_STYLE.Draft}>
                          {seq.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--c-text-3)" }}>
                        <span>{seq.leads} leads</span>
                        <span>Open: <strong style={{ color: "var(--c-text-1)" }}>{seq.openRate}</strong></span>
                        <span>Reply: <strong style={{ color: "var(--c-text-1)" }}>{seq.replyRate}</strong></span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="h-7 px-3 rounded-lg border text-[10px] cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ borderColor: "var(--c-border)", color: "var(--c-text-2)" }}>
                        {seq.status === "Active" ? <Pause size={10} /> : <Play size={10} />}
                        {seq.status === "Active" ? "Pause" : "Activate"}
                      </button>
                      <Link href={`/dashboard/sequences/${seq.id}`}>
                        <button className="h-7 px-3 rounded-lg text-white text-[10px] font-medium cursor-pointer" style={{ background: "var(--c-navy)" }}>Open</button>
                      </Link>
                    </div>
                  </div>

                  {/* Step chips */}
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 mb-3">
                    {seq.steps.map((step, si) => {
                      const StepIcon = CHANNEL_ICONS[step.channel] ?? Mail;
                      return (
                        <div key={si} className="flex items-center gap-0">
                          <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-medium shrink-0"
                            style={{
                              borderColor: step.status === "approved" ? "#15803D" : "var(--c-border)",
                              background: step.status === "approved" ? "#F0FDF4" : "rgba(248,250,255,0.8)",
                              color: step.status === "approved" ? "#15803D" : "var(--c-text-2)",
                            }}
                          >
                            <StepIcon size={10} />
                            {step.channel}
                            <span className="text-[9px]" style={{ color: "var(--c-text-3)" }}>Day {step.day}</span>
                          </div>
                          {si < seq.steps.length - 1 && (
                            <div className="w-5 h-px mx-1 shrink-0" style={{ background: "rgba(172,200,215,0.4)" }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-[10.5px] mb-3" style={{ color: "var(--c-text-3)" }}>
                    <span>{seq.leads} leads</span>
                    <span>·</span>
                    <span>{seq.openRate} open rate</span>
                    <span>·</span>
                    <span>{seq.replyRate} reply rate</span>
                  </div>

                  {/* Performance bars (active only) */}
                  {seq.status === "Active" && openNum > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10.5px]" style={{ color: "var(--c-text-3)" }}>Open rate</span>
                          <span className="text-[10.5px] font-medium" style={{ color: "var(--c-text-1)" }}>{seq.openRate}</span>
                        </div>
                        <ProgressBar value={openNum} max={60} color="#1E40AF" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[10.5px]" style={{ color: "var(--c-text-3)" }}>Reply rate</span>
                          <span className="text-[10.5px] font-medium" style={{ color: "var(--c-text-1)" }}>{seq.replyRate}</span>
                        </div>
                        <ProgressBar value={replyNum} max={20} color="#15803D" />
                      </div>
                    </div>
                  )}

                  {/* Meta footer */}
                  <p className="text-[10.5px] mb-2" style={{ color: "var(--c-text-3)" }}>
                    Last sent: 2h ago · Next step due: Tomorrow · 3 replies pending review
                  </p>

                  {/* Duo insight (active only) */}
                  {insight && seq.status === "Active" && (
                    <div
                      className="flex items-start gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(30,64,175,0.04)",
                        border: "0.3px solid rgba(30,64,175,0.2)",
                        borderLeft: "3px solid var(--c-blue)",
                      }}
                    >
                      <Sparkles size={12} className="mt-0.5 shrink-0" style={{ color: "var(--c-blue)" }} />
                      <p className="text-[11px] italic" style={{ color: "var(--c-text-2)" }}>{insight}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Suggested by Duo */}
          <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: "var(--c-text-3)" }}>Suggested by Duo</p>
          <div className="flex flex-col gap-3">
            {SUGGESTED.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-dashed p-4 flex items-center justify-between"
                style={{ borderColor: "rgba(172,200,215,0.5)", background: "rgba(248,250,255,0.6)" }}
              >
                <div>
                  <p className="text-[12px] font-semibold mb-0.5" style={{ color: "var(--c-text-1)" }}>{s.name}</p>
                  <p className="text-[11px]" style={{ color: "var(--c-text-3)" }}>{s.desc}</p>
                </div>
                <button
                  className="h-7 px-3 rounded-lg border text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                  style={{ borderColor: "var(--c-blue)", color: "var(--c-blue)", background: "var(--c-blue-light)" }}
                >
                  Create →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right stats sidebar */}
        <div className="w-[240px] shrink-0 border-l overflow-y-auto p-5"
          style={{ borderColor: "rgba(172,200,215,0.4)", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--c-text-3)" }}>Sequence Stats</p>
          {[
            { label: "Total sequences", value: "3" },
            { label: "Total leads", value: "42" },
            { label: "Avg open rate", value: "36.5%" },
            { label: "Avg reply rate", value: "10.2%" },
            { label: "Best day to send", value: "Tuesday" },
          ].map((s, i) => (
            <div key={i} className="py-3 border-b" style={{ borderColor: "rgba(172,200,215,0.4)" }}>
              <p className="text-[10.5px] mb-0.5" style={{ color: "var(--c-text-3)" }}>{s.label}</p>
              <p className="text-[16px] font-bold" style={{ color: "var(--c-text-1)" }}>{s.value}</p>
            </div>
          ))}

          <div className="mt-4 px-3 py-3 rounded-xl"
            style={{ background: "rgba(30,64,175,0.04)", border: "0.3px solid rgba(30,64,175,0.2)" }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={12} style={{ color: "var(--c-blue)" }} />
              <span className="text-[10.5px] font-semibold" style={{ color: "var(--c-blue)" }}>Duo says</span>
            </div>
            <p className="text-[11px] italic leading-relaxed" style={{ color: "var(--c-text-2)" }}>
              "Tuesday 9–11am sends are outperforming all other slots by 34% this month."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
