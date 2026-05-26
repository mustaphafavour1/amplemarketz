"use client";
import { Bell, Moon, Sun, Search, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/hooks/useTheme";
import { useDashboard } from "@/components/providers/DashboardProvider";
import { Avatar } from "@/components/ui/Avatar";

interface TopbarProps {
  title: string;
  breadcrumb?: string;
}

export function Topbar({ title, breadcrumb }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { dark, toggle } = useTheme();
  const { setDuoOpen } = useDashboard();

  return (
    <header
      className="flex items-center px-6 gap-4 shrink-0 z-30"
      style={{
        height: 52,
        background: "var(--c-topbar)",
        borderBottom: "1px solid var(--c-border)",
      }}
    >
      {/* Left: breadcrumb + title */}
      <div className="flex items-center gap-2 min-w-[180px]">
        {breadcrumb && (
          <>
            <span
              className="text-[13px]"
              style={{ color: "var(--c-text-3)" }}
            >
              {breadcrumb}
            </span>
            <span style={{ color: "var(--c-text-3)" }} className="text-[13px]">
              /
            </span>
          </>
        )}
        <h1
          className="font-semibold text-[14px] whitespace-nowrap"
          style={{ color: "var(--c-text-1)" }}
        >
          {title}
        </h1>
      </div>

      {/* Center: search */}
      <div className="flex-1 flex justify-center">
        <div
          className="flex items-center gap-2 h-8 px-3 rounded-[8px] transition-all"
          style={{
            width: 320,
            background: searchFocused ? "var(--c-topbar)" : "#F9FAFB",
            border: searchFocused ? "1px solid #6366F1" : "1px solid #E5E7EB",
            boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
          }}
        >
          <Search size={13} className="shrink-0" style={{ color: "var(--c-text-3)" }} />
          <input
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search anything or ask Duo..."
            className="flex-1 outline-none text-[12px] bg-transparent"
            style={{ color: "var(--c-text-1)" }}
          />
          <kbd
            className="text-[10px] rounded px-1 py-0.5 font-mono shrink-0"
            style={{
              background: "#F3F4F6",
              color: "var(--c-text-3)",
              border: "1px solid #E5E7EB",
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: theme toggle, bell, duo pill, ask duo button, avatar */}
      <div className="flex items-center gap-3 justify-end">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          style={{ color: "var(--c-text-2)" }}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notification bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          style={{ color: "var(--c-text-2)" }}
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#EF4444" }}
          />
        </button>

        {/* Duo is active pill */}
        <button
          onClick={() => setDuoOpen(true)}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-full transition-colors cursor-pointer text-[12px] font-semibold"
          style={{
            border: "1px solid #D1FAE5",
            background: "#F0FDF4",
            color: "#15803D",
          }}
          aria-label="Open Duo"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#22C55E" }}
          />
          Duo is active
        </button>

        {/* Ask Duo button */}
        <button
          onClick={() => setDuoOpen(true)}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg transition-colors cursor-pointer text-[12px] font-semibold"
          style={{
            border: "1px solid #BFDBFE",
            background: "#EFF6FF",
            color: "#1E40AF",
          }}
          aria-label="Ask Duo"
        >
          <MessageSquarePlus size={13} />
          Ask Duo
        </button>

        {/* User avatar */}
        <Avatar initials="FM" size={32} />
      </div>
    </header>
  );
}
