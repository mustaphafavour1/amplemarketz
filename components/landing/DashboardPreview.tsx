"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { SignalPill } from "@/components/ui/SignalPill";

const LEADS_PREVIEW = [
  { name: "Sarah Chen", company: "Notion", signal: "Was promoted to VP Sales", type: "job" },
  { name: "Marcus Webb", company: "Linear", signal: "Posted about AI tools", type: "social" },
  { name: "Priya Kapoor", company: "Stripe", signal: "Raised Series H", type: "fund" },
];

export function DashboardPreview() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 80, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 80, damping: 15 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-8 bg-gradient-radial from-[#E85D26]/20 to-transparent rounded-full blur-2xl" />

      {/* Card */}
      <div className="relative bg-white rounded-xl border border-[#E4E2DC] overflow-hidden"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E2DC]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#0F1923] rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">A</span>
            </div>
            <span className="text-[13px] font-semibold text-[#111111]">Duo Copilot</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
            <span className="text-[11px] text-[#5C5C5C]">37 pending</span>
          </div>
        </div>

        {/* Lead cards */}
        <div className="p-3 flex flex-col gap-2 bg-[#F7F6F3]">
          {LEADS_PREVIEW.map((lead, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-[#E4E2DC]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-[10px] font-bold text-[#4361EE]">
                  {lead.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#111111]">{lead.name}</div>
                  <div className="text-[10px] text-[#9A9A9A]">{lead.company}</div>
                </div>
              </div>
              <SignalPill type={lead.type} label={lead.signal.length > 20 ? lead.signal.slice(0, 20) + "…" : lead.signal} />
            </motion.div>
          ))}
        </div>

        {/* Detail panel peek */}
        <div className="px-4 py-3 border-t border-[#E4E2DC]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[13px] font-semibold text-[#111111]">Sarah Chen</div>
              <div className="text-[11px] text-[#9A9A9A]">VP of Sales · Notion</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-[#27AE60] font-medium">New lead</span>
          </div>
          <div className="text-[11px] text-[#5C5C5C] italic leading-relaxed bg-[#F7F6F3] rounded-lg p-2.5">
            "Hi Sarah, saw your post about attending SaaStr Annual. I'd love to show you how Duo can help your team scale outbound..."
          </div>
          <div className="flex gap-2 mt-2.5">
            <button className="flex-1 h-7 rounded-md bg-[#4361EE] text-white text-[11px] font-medium cursor-pointer">Approve & Send</button>
            <button className="h-7 px-3 rounded-md border border-[#E4E2DC] text-[11px] text-[#5C5C5C] cursor-pointer">Edit</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
