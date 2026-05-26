"use client";
import { Bell, Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title: string;
  breadcrumb?: string;
  onAskDuo?: () => void;
}

export function Topbar({ title, breadcrumb, onAskDuo }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <header className="h-[52px] bg-white border-b border-[#E4E2DC] flex items-center px-4 gap-4 shrink-0 z-30">
      <div className="flex items-center gap-2 min-w-[200px]">
        {breadcrumb && <span className="text-[#9A9A9A] text-[13px]">{breadcrumb}</span>}
        {breadcrumb && <span className="text-[#E4E2DC]">/</span>}
        <h1 className="font-semibold text-[15px] text-[#111111]">{title}</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <div className={`flex items-center gap-2 h-8 px-3 rounded-lg border transition-all w-[280px] ${searchFocused ? "border-[#4361EE] bg-white shadow-sm" : "border-[#E4E2DC] bg-[#F7F6F3]"}`}>
          <Search size={13} className="text-[#9A9A9A] shrink-0" />
          <input
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search anything or ask Duo..."
            className="flex-1 outline-none text-[12px] bg-transparent text-[#111111] placeholder:text-[#9A9A9A]"
          />
          <kbd className="text-[10px] text-[#9A9A9A] bg-[#F0EEE9] rounded px-1 py-0.5 font-mono">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 min-w-[200px] justify-end">
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0EEE9] transition-colors cursor-pointer">
          <Bell size={16} className="text-[#5C5C5C]" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-[#E85D26] rounded-full" />
        </button>
        <button onClick={onAskDuo} className="flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-[#4361EE] text-[#4361EE] text-[11px] font-medium hover:bg-blue-50 transition-colors cursor-pointer">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse" />
          Duo is active
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4361EE] to-[#9B59B6] flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
}
