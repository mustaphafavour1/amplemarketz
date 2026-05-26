"use client";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DuoPanel } from "@/components/ui/DuoPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [duoOpen, setDuoOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F6F3]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {children}
      </div>
      <DuoPanel open={duoOpen} onClose={() => setDuoOpen(false)} />
    </div>
  );
}
