"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import sequences from "@/data/sequences.json";
import { Mail, Link2, Phone, RefreshCw, Check, Sparkles, ArrowLeft, Plus, ChevronRight } from "lucide-react";

const SEQ_CHIPS = [
  { icon: "✍️", label: "Generate full sequence" },
  { icon: "📈", label: "Use top performer" },
  { icon: "🎯", label: "Match to signal type" },
  { icon: "🔁", label: "Add follow-up step" },
];

const CHANNEL_ICONS: Record<string, React.ElementType> = { Email: Mail, LinkedIn: Link2, Call: Phone };

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-50 text-[#27AE60] border-green-100",
  Draft: "bg-[#F0EEE9] text-[#9A9A9A] border-[#E4E2DC]",
  Paused: "bg-amber-50 text-[#F39C12] border-amber-100",
};

export default function SequenceBuilderPage() {
  const params = useParams();
  const seq = sequences.find(s => s.id === params.id) ?? sequences[0];
  const [activeStep, setActiveStep] = useState(0);
  const [body, setBody] = useState(seq.steps[0]?.body ?? "");
  const [subject, setSubject] = useState(seq.steps[0]?.subject ?? "");
  const [seqName, setSeqName] = useState(seq.name);
  const [aiOn, setAiOn] = useState(true);

  const currentStep = seq.steps[activeStep];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Sequence Builder" breadcrumb="Sequences" />
      <DuoBar chips={SEQ_CHIPS} />

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Sequence header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#E4E2DC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/sequences">
              <button className="text-[#9A9A9A] hover:text-[#111111] transition-colors cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            </Link>
            <input
              value={seqName}
              onChange={e => setSeqName(e.target.value)}
              className="text-[16px] font-semibold text-[#111111] bg-transparent outline-none border-b-2 border-transparent hover:border-[#E4E2DC] focus:border-[#4361EE] transition-colors"
            />
            <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[seq.status] ?? ""}`}>
              {seq.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3.5 rounded-lg border border-[#E4E2DC] text-[12px] font-medium text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer">Save Changes</button>
            <button className="h-8 px-3.5 rounded-lg bg-[#4361EE] text-white text-[12px] font-medium cursor-pointer flex items-center gap-1.5">
              Continue to Leads <ChevronRight size={12} />
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Horizontal step rail */}
          <div className="mb-5 overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-center gap-0 min-w-max">
              {seq.steps.map((step, i) => {
                const StepIcon = CHANNEL_ICONS[step.channel] ?? Mail;
                return (
                  <div key={i} className="flex items-center">
                    <motion.button
                      onClick={() => setActiveStep(i)}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.12 }}
                      className={`flex flex-col items-center px-5 py-3 rounded-xl border-2 min-w-[120px] cursor-pointer transition-all ${activeStep === i ? "border-[#4361EE] bg-blue-50 shadow-sm" : "border-[#E4E2DC] bg-white hover:border-[#9A9A9A]"}`}
                    >
                      <span className="text-[10px] text-[#9A9A9A] mb-1.5">Day {step.day}</span>
                      <StepIcon size={18} className={activeStep === i ? "text-[#4361EE]" : "text-[#5C5C5C]"} />
                      <span className={`text-[12px] font-semibold mt-1 ${activeStep === i ? "text-[#4361EE]" : "text-[#5C5C5C]"}`}>{step.channel}</span>
                      {step.status === "approved" && (
                        <span className="flex items-center gap-0.5 text-[9px] text-[#27AE60] mt-1">
                          <Check size={9} /> Approved
                        </span>
                      )}
                    </motion.button>
                    {i < seq.steps.length - 1 && (
                      <div className="flex flex-col items-center w-10">
                        <span className="text-[9px] text-[#9A9A9A] mb-0.5">+{seq.steps[i + 1].day - step.day}d</span>
                        <div className="flex items-center w-full">
                          <div className="flex-1 h-px bg-[#E4E2DC]" />
                          <ChevronRight size={10} className="text-[#E4E2DC] shrink-0" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <button className="flex items-center gap-1.5 ml-3 h-10 px-4 rounded-xl border-2 border-dashed border-[#E4E2DC] text-[12px] text-[#9A9A9A] hover:border-[#4361EE] hover:text-[#4361EE] transition-colors cursor-pointer whitespace-nowrap">
                <Plus size={13} /> Add step
              </button>
            </div>
          </div>

          {/* Step editor */}
          {currentStep && (
            <div className="grid grid-cols-2 gap-5">
              {/* Edit side */}
              <div className="bg-white rounded-xl border border-[#E4E2DC] overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E2DC] bg-[#F7F6F3]">
                  <div className="flex items-center gap-2">
                    {(() => { const Icon = CHANNEL_ICONS[currentStep.channel] ?? Mail; return <Icon size={15} className="text-[#5C5C5C]" />; })()}
                    <span className="text-[13px] font-semibold text-[#111111]">{currentStep.channel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#5C5C5C]">Generate with AI</span>
                    <button
                      onClick={() => setAiOn(!aiOn)}
                      className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${aiOn ? "bg-[#4361EE]" : "bg-[#E4E2DC]"}`}
                    >
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${aiOn ? "left-4" : "left-0.5"}`} />
                    </button>
                  </div>
                </div>

                {currentStep.channel === "Email" && (
                  <div className="px-4 pt-3 pb-1 border-b border-[#E4E2DC]">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#9A9A9A] shrink-0">Subject:</span>
                      <input
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="flex-1 text-[13px] text-[#111111] outline-none bg-transparent"
                        placeholder="Enter subject line..."
                      />
                    </div>
                  </div>
                )}

                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className="w-full p-4 text-[13px] text-[#111111] leading-relaxed outline-none resize-none bg-white"
                  rows={10}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  placeholder="Write your message..."
                />

                <div className="px-4 py-2 border-t border-[#E4E2DC] flex items-center justify-between text-[11px] text-[#9A9A9A]">
                  <span>{body.split(" ").filter(Boolean).length} words · {body.length} characters</span>
                  <button className="text-[#4361EE] hover:underline cursor-pointer">Insert dynamic field +</button>
                </div>
              </div>

              {/* Preview side */}
              <div className="bg-white rounded-xl border border-[#E4E2DC] overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                <div className="px-4 py-3 border-b border-[#E4E2DC] bg-[#F7F6F3]">
                  <span className="text-[13px] font-semibold text-[#111111]">Preview</span>
                </div>
                <div className="p-4">
                  {currentStep.channel === "Email" && (
                    <div className="border border-[#E4E2DC] rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-[#F7F6F3] border-b border-[#E4E2DC]">
                        <span className="text-[11px] text-[#9A9A9A]">Subject: </span>
                        <span className="text-[12px] font-medium text-[#111111]">{subject || "(no subject)"}</span>
                      </div>
                      <div className="p-4 text-[13px] text-[#111111] leading-relaxed whitespace-pre-wrap min-h-[200px]">
                        {body || <span className="text-[#9A9A9A] italic">Start typing to see preview...</span>}
                      </div>
                      <div className="px-4 py-2 border-t border-[#E4E2DC]">
                        <button className="text-[11px] text-[#4361EE] hover:underline cursor-pointer">Send test email</button>
                      </div>
                    </div>
                  )}
                  {currentStep.channel !== "Email" && (
                    <div className="flex flex-col items-center justify-center h-48 text-[#9A9A9A]">
                      <p className="text-[13px]">Preview for {currentStep.channel} step</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed footer bar */}
      <div className="fixed bottom-0 left-[52px] right-0 bg-white border-t border-[#E4E2DC] px-5 py-3 flex items-center justify-between z-20">
        <span className="text-[12px] text-[#9A9A9A] flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#4361EE]" />
          Duo drafted this in your voice based on 47 approvals
        </span>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3.5 rounded-lg border border-[#E4E2DC] text-[12px] font-medium text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer flex items-center gap-1.5">
            <RefreshCw size={11} /> Regenerate
          </button>
          <button className="h-8 px-3.5 rounded-lg border border-[#E4E2DC] text-[12px] font-medium text-[#5C5C5C] cursor-pointer">Edit</button>
          <button className="h-8 px-4 rounded-lg bg-[#4361EE] text-white text-[12px] font-semibold cursor-pointer flex items-center gap-1.5">
            <Check size={12} /> Approve step
          </button>
        </div>
      </div>

    </div>
  );
}
