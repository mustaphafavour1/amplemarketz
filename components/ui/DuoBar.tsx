"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/components/providers/DashboardProvider";

export type DuoChip = { label: string; icon: string; expandable?: boolean };

interface DuoBarProps {
  chips: DuoChip[];
}

export function DuoBar({ chips }: DuoBarProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState("");
  const { setDuoOpen } = useDashboard();

  return (
    <div
      className="flex items-center gap-3 shrink-0"
      style={{
        height: 40,
        paddingLeft: 24,
        paddingRight: 24,
        background: "var(--c-topbar)",
        borderBottom: "1px solid var(--c-border)",
      }}
    >
      {/* Left: Sparkles + label */}
      <div className="flex items-center gap-1.5 shrink-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <Sparkles size={14} style={{ color: "#1E40AF" }} />
        </motion.div>
        <span
          className="text-[12px] italic whitespace-nowrap"
          style={{ color: "var(--c-text-3)" }}
        >
          Duo suggests:
        </span>
      </div>

      {/* Center: chip scroll */}
      <div
        className="flex items-center gap-2 flex-1 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {chips.map((chip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.22 }}
            className="shrink-0"
          >
            {chip.expandable && expanded === i ? (
              <div
                className="flex items-center gap-1 h-7 px-3 rounded-[100px] text-[12px]"
                style={{
                  background: "white",
                  border: "1px solid #1E40AF",
                }}
              >
                <span>{chip.icon}</span>
                <input
                  autoFocus
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setExpanded(null);
                      setInputVal("");
                    }
                    if (e.key === "Escape") {
                      setExpanded(null);
                      setInputVal("");
                    }
                  }}
                  placeholder="Type name or company..."
                  className="outline-none w-36 text-[12px] bg-transparent"
                  style={{ color: "var(--c-text-1)" }}
                />
              </div>
            ) : (
              <button
                onClick={() => (chip.expandable ? setExpanded(i) : undefined)}
                className="flex items-center gap-1.5 h-7 px-3 rounded-[100px] text-[12px] transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background: "white",
                  border: "1px solid #E5E7EB",
                  color: "var(--c-text-2)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.border = "1px solid #1E40AF";
                  el.style.color = "#1E40AF";
                  el.style.background = "#EFF4FF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.border = "1px solid #E5E7EB";
                  el.style.color = "var(--c-text-2)";
                  el.style.background = "white";
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Right: Ask Duo anything */}
      <button
        onClick={() => setDuoOpen(true)}
        className="shrink-0 text-[12px] font-semibold cursor-pointer hover:underline whitespace-nowrap transition-colors"
        style={{ color: "#1E40AF" }}
      >
        Ask Duo anything →
      </button>
    </div>
  );
}
