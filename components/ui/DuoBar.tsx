"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export type DuoChip = { label: string; icon: string; expandable?: boolean };

interface DuoBarProps {
  chips: DuoChip[];
  onAskDuo?: () => void;
}

export function DuoBar({ chips, onAskDuo }: DuoBarProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="flex items-center gap-3 px-4 h-11 border-b border-[#E4E2DC] bg-[#FAFAF8] shrink-0">
      <div className="flex items-center gap-1.5 shrink-0">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <Sparkles size={13} className="text-[#4361EE]" />
        </motion.div>
        <span className="text-[11px] text-[#9A9A9A] font-medium whitespace-nowrap">Duo suggests:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
        {chips.map((chip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
          >
            {chip.expandable && expanded === i ? (
              <div className="flex items-center gap-1 h-7 px-2.5 rounded-full border border-[#4361EE] bg-white text-[11px]">
                <span>{chip.icon}</span>
                <input
                  autoFocus
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && setExpanded(null)}
                  placeholder="Type name or company..."
                  className="outline-none w-32 text-[11px] text-[#111111] bg-transparent"
                />
              </div>
            ) : (
              <button
                onClick={() => chip.expandable ? setExpanded(i) : undefined}
                className="flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-[#E4E2DC] bg-white text-[11px] text-[#5C5C5C] font-medium hover:border-[#4361EE] hover:text-[#4361EE] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={onAskDuo}
        className="flex items-center gap-1 shrink-0 text-[11px] text-[#4361EE] font-medium hover:underline whitespace-nowrap cursor-pointer"
      >
        Ask Duo anything <ArrowRight size={11} />
      </button>
    </div>
  );
}
