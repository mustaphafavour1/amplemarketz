"use client";
import { DashboardProvider, useDashboard } from "@/components/providers/DashboardProvider";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DuoPanel } from "@/components/ui/DuoPanel";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { duoOpen, setDuoOpen, sidebarExpanded } = useDashboard();

  return (
    <div className="flex h-screen overflow-hidden dashboard-bg">
      <Sidebar />
      <div
        className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-250"
        style={duoOpen ? { filter: "blur(1px)", opacity: 0.8 } : {}}
      >
        {children}
      </div>
      <DuoPanel open={duoOpen} onClose={() => setDuoOpen(false)} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
