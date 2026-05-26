"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Zap,
  Mail,
  Users,
  BarChart2,
  Settings2,
  Mic,
  Inbox,
  Plug,
  Code2,
  UserCircle,
  Flame,
  UsersRound,
  CreditCard,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "@/components/providers/DashboardProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItemDef {
  href?: string;
  icon: React.ElementType;
  label: string;
  badge?: number | string;
  badgeColor?: string;
  locked?: boolean;
  newBadge?: boolean;
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const MAIN_NAV: NavItemDef[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/duo", icon: Sparkles, label: "Duo Copilot", badge: 37, badgeColor: "#3B5BDB" },
  { href: "/dashboard/signals", icon: Zap, label: "Signals", badge: 24, badgeColor: "#3B5BDB" },
  { href: "/dashboard/sequences", icon: Mail, label: "Sequences" },
  { href: "/dashboard/prospects", icon: Users, label: "Prospects" },
  { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
];

const DUO_CONTROL: NavItemDef[] = [
  { icon: Settings2, label: "Messaging Settings", locked: true },
  { icon: Mic, label: "Duo Voice", locked: true },
  { icon: Inbox, label: "Duo Inbox", locked: true },
];

const CONFIGURATION: NavItemDef[] = [
  { icon: Plug, label: "Integrations", locked: true, newBadge: true },
  { icon: Code2, label: "API", locked: true },
  { icon: UserCircle, label: "Personas", locked: true },
  { icon: Flame, label: "Email Warmup", locked: true },
];

const WORKSPACE: NavItemDef[] = [
  { icon: UsersRound, label: "Team", locked: true },
  { icon: CreditCard, label: "Billing", locked: true },
  { icon: LifeBuoy, label: "Get Help", locked: true },
];

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.13 }}
          className="absolute left-[54px] top-1/2 -translate-y-1/2 bg-white text-[var(--c-text-1)] text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md whitespace-nowrap z-[100] pointer-events-none border border-[var(--c-border)]"
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Single nav row (expanded) ────────────────────────────────────────────────

function NavRowExpanded({
  item,
  active,
}: {
  item: NavItemDef;
  active: boolean;
}) {
  const Icon = item.icon;
  const inner = (
    <div
      className={[
        "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg transition-colors relative",
        item.locked
          ? "opacity-60 cursor-default"
          : active
          ? "bg-[#EFF4FF] text-[#1E40AF]"
          : "hover:bg-[#F8F9FF] text-[var(--c-text-2)] cursor-pointer",
      ].join(" ")}
      title={item.locked ? "Available in full version" : undefined}
    >
      {active && !item.locked && (
        <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#1E40AF] rounded-r-full" />
      )}
      <Icon
        size={16}
        className={active && !item.locked ? "text-[#1E40AF]" : "text-[var(--c-text-3)]"}
      />
      <span
        className={[
          "text-[13px] font-medium flex-1 leading-none",
          active && !item.locked ? "text-[#1E40AF]" : "text-[var(--c-text-2)]",
        ].join(" ")}
      >
        {item.label}
      </span>
      {item.badge != null && (
        <span
          className="text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none"
          style={{ backgroundColor: item.badgeColor ?? "#3B5BDB" }}
        >
          {item.badge}
        </span>
      )}
      {item.newBadge && (
        <span className="bg-green-500 text-white text-[9px] font-bold rounded-full px-1.5 py-0.5 leading-none">
          New
        </span>
      )}
    </div>
  );

  if (item.locked || !item.href) {
    return <div className="w-full">{inner}</div>;
  }

  return (
    <Link href={item.href} className="w-full">
      {inner}
    </Link>
  );
}

// ─── Single nav row (collapsed / icon-only) ───────────────────────────────────

function NavRowCollapsed({
  item,
  active,
}: {
  item: NavItemDef;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const inner = (
    <div
      className="relative flex items-center justify-center w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={[
          "w-9 h-9 flex items-center justify-center rounded-lg transition-colors relative",
          item.locked
            ? "opacity-60 cursor-default"
            : active
            ? "bg-[#EFF4FF] text-[#1E40AF]"
            : "hover:bg-[#F8F9FF] text-[var(--c-text-3)] cursor-pointer",
        ].join(" ")}
        title={item.locked ? "Available in full version" : undefined}
      >
        {active && !item.locked && (
          <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#1E40AF] rounded-r-full -ml-[6px]" />
        )}
        <Icon
          size={16}
          className={active && !item.locked ? "text-[#1E40AF]" : undefined}
        />
        {item.badge != null && (
          <span
            className="absolute -top-1 -right-1 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none"
            style={{ backgroundColor: item.badgeColor ?? "#3B5BDB" }}
          >
            {Number(item.badge) > 99 ? "99+" : item.badge}
          </span>
        )}
      </div>
      <Tooltip label={item.label} visible={hovered} />
    </div>
  );

  if (item.locked || !item.href) {
    return <div className="w-full flex justify-center">{inner}</div>;
  }

  return (
    <Link href={item.href} className="w-full flex justify-center">
      {inner}
    </Link>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9CA3AF] select-none"
    >
      {label}
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarExpanded, setSidebarExpanded } = useDashboard();

  function isActive(item: NavItemDef) {
    if (!item.href) return false;
    if (item.href === "/dashboard") return pathname === "/dashboard";
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }

  // ── Expanded sidebar ──────────────────────────────────────────────────────

  if (sidebarExpanded) {
    return (
      <aside
        className="shrink-0 flex flex-col h-screen sticky top-0 z-40 overflow-y-auto overflow-x-hidden"
        style={{
          width: 220,
          background: "var(--c-sidebar)",
          borderRight: "1px solid var(--c-border)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img
              src="/images/amplemarket-logo.svg"
              alt="Amplemarket"
              height={22}
              style={{ height: 22, display: "block" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span
              className="text-[14px] font-semibold text-[var(--c-text-1)] truncate"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              amplemarket
            </span>
          </Link>
          <button
            onClick={() => setSidebarExpanded(false)}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F0F0F0] text-[var(--c-text-3)] transition-colors shrink-0"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Main nav */}
        <div className="flex flex-col gap-0.5 px-2">
          {MAIN_NAV.map((item) => (
            <NavRowExpanded key={item.label} item={item} active={isActive(item)} />
          ))}
        </div>

        {/* Duo Control */}
        <div className="px-2">
          <SectionLabel label="Duo Control" />
          <div className="flex flex-col gap-0.5">
            {DUO_CONTROL.map((item) => (
              <NavRowExpanded key={item.label} item={item} active={false} />
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="px-2">
          <SectionLabel label="Configuration" />
          <div className="flex flex-col gap-0.5">
            {CONFIGURATION.map((item) => (
              <NavRowExpanded key={item.label} item={item} active={false} />
            ))}
          </div>
        </div>

        {/* Workspace */}
        <div className="px-2">
          <SectionLabel label="Workspace" />
          <div className="flex flex-col gap-0.5">
            {WORKSPACE.map((item) => (
              <NavRowExpanded key={item.label} item={item} active={false} />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom user section */}
        <div
          className="px-3 py-3 flex items-center gap-2.5 shrink-0"
          style={{ borderTop: "1px solid var(--c-border)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces"
            alt="Favour Mustapha"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid rgba(255,255,255,0.3)",
              flexShrink: 0,
            }}
          />
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[13px] font-semibold text-[var(--c-text-1)] truncate leading-none">
              Favour Mustapha
            </span>
            <span
              className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded-full leading-none w-fit"
              style={{ backgroundColor: "#0F1923" }}
            >
              Pro plan
            </span>
          </div>
        </div>
      </aside>
    );
  }

  // ── Collapsed sidebar ─────────────────────────────────────────────────────

  return (
    <aside
      className="shrink-0 flex flex-col items-center h-screen sticky top-0 z-40 overflow-y-auto overflow-x-visible"
      style={{
        width: 52,
        background: "var(--c-sidebar)",
        borderRight: "1px solid var(--c-border)",
      }}
    >
      {/* Logo collapsed */}
      <div className="flex flex-col items-center py-3 gap-1 shrink-0 w-full">
        <Link href="/" className="flex items-center justify-center w-full mb-1">
          <div
            className="w-7 h-7 flex items-center justify-center rounded-lg"
            style={{ background: "#0F1923" }}
          >
            <span
              className="text-white font-bold text-sm leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              A
            </span>
          </div>
        </Link>

        {/* Expand toggle */}
        <button
          onClick={() => setSidebarExpanded(true)}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F0F0F0] text-[var(--c-text-3)] transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-0.5 w-full items-center px-1.5">
        {MAIN_NAV.map((item) => (
          <NavRowCollapsed key={item.label} item={item} active={isActive(item)} />
        ))}
      </div>

      {/* Duo Control */}
      <div className="flex flex-col gap-0.5 w-full items-center px-1.5 pt-3">
        {DUO_CONTROL.map((item) => (
          <NavRowCollapsed key={item.label} item={item} active={false} />
        ))}
      </div>

      {/* Configuration */}
      <div className="flex flex-col gap-0.5 w-full items-center px-1.5 pt-3">
        {CONFIGURATION.map((item) => (
          <NavRowCollapsed key={item.label} item={item} active={false} />
        ))}
      </div>

      {/* Workspace */}
      <div className="flex flex-col gap-0.5 w-full items-center px-1.5 pt-3">
        {WORKSPACE.map((item) => (
          <NavRowCollapsed key={item.label} item={item} active={false} />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom user avatar */}
      <div
        className="flex items-center justify-center py-3 shrink-0 w-full"
        style={{ borderTop: "1px solid var(--c-border)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces"
          alt="Favour Mustapha"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1.5px solid rgba(255,255,255,0.3)",
          }}
        />
      </div>
    </aside>
  );
}
