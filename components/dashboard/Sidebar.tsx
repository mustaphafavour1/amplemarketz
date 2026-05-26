"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Zap, Radio, Users, Mail, BarChart2,
  Plug, Settings, ChevronRight
} from "lucide-react";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/duo", icon: Zap, label: "Duo Copilot", badge: 37 },
  { href: "/dashboard/signals", icon: Radio, label: "Signals", badge: 24 },
  { href: "/dashboard/prospects", icon: Users, label: "Prospects" },
  { href: "/dashboard/sequences", icon: Mail, label: "Sequences" },
  { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
];

const BOTTOM_NAV = [
  { href: "/dashboard/integrations", icon: Plug, label: "Integrations" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function NavItem({ href, icon: Icon, label, badge, active }: { href: string; icon: React.ElementType; label: string; badge?: number; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} className="relative flex items-center justify-center h-10 w-full group"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#4361EE] rounded-r-full" />}
      <div className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors relative ${active ? "text-[#4361EE] bg-blue-50" : "text-[#9A9A9A] hover:text-[#5C5C5C] hover:bg-[#F0EEE9]"}`}>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.1 }}>
          <Icon size={18} />
        </motion.div>
        {badge != null && (
          <span className="absolute -top-1 -right-1 bg-[#4361EE] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-[52px] bg-[#0F1923] text-white text-xs font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap z-50 pointer-events-none"
          >
            {label}
            <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0F1923]" />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[52px] shrink-0 bg-white border-r border-[#E4E2DC] flex flex-col items-center py-3 gap-1 h-screen sticky top-0 z-40">
      <Link href="/" className="w-9 h-9 flex items-center justify-center mb-2">
        <div className="w-7 h-7 bg-[#0F1923] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Instrument Serif', serif" }}>A</span>
        </div>
      </Link>
      <div className="flex-1 flex flex-col gap-0.5 w-full items-center">
        {NAV.map(item => (
          <NavItem key={item.href} {...item} active={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 w-full items-center">
        {BOTTOM_NAV.map(item => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4361EE] to-[#9B59B6] flex items-center justify-center text-white text-xs font-bold mt-1">
          JD
        </div>
      </div>
    </aside>
  );
}
