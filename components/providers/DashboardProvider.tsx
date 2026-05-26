"use client";
import { createContext, useContext, useState } from "react";

interface DashboardCtx {
  duoOpen: boolean;
  setDuoOpen: (v: boolean) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (v: boolean) => void;
}

const DashboardContext = createContext<DashboardCtx>({
  duoOpen: false, setDuoOpen: () => {},
  sidebarExpanded: true, setSidebarExpanded: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [duoOpen, setDuoOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <DashboardContext.Provider value={{ duoOpen, setDuoOpen, sidebarExpanded, setSidebarExpanded }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() { return useContext(DashboardContext); }
