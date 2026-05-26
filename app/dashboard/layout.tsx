"use client";
import { DashboardProvider, useDashboard } from "@/components/providers/DashboardProvider";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DuoPanel } from "@/components/ui/DuoPanel";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { duoOpen, setDuoOpen, sidebarExpanded } = useDashboard();

  return (
    <div className="flex h-screen overflow-hidden dashboard-bg relative">
      {/* Lighter animated blobs for dashboard background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="blob blob-1" style={{ opacity: 0.13, width: 700, height: 700 }} />
        <div className="blob blob-2" style={{ opacity: 0.10, width: 550, height: 550 }} />
        <div className="blob blob-3" style={{ opacity: 0.09, width: 450, height: 450 }} />
      </div>
      <div className="relative flex flex-1 overflow-hidden" style={{ zIndex: 1 }}>
        <Sidebar />
        <div
          className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-250"
          style={duoOpen ? { filter: "blur(1px)", opacity: 0.8 } : {}}
        >
          {children}
        </div>
        <DuoPanel open={duoOpen} onClose={() => setDuoOpen(false)} />
      </div>
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
