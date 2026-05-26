"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { SignalPill } from "@/components/ui/SignalPill";
import { Avatar } from "@/components/ui/Avatar";
import leads from "@/data/leads.json";
import { ExternalLink, Mail, Link2 } from "lucide-react";

const PROSPECT_CHIPS = [
  { icon: "🎯", label: "Find VPs of Sales at Series B companies" },
  { icon: "🔍", label: "Research selected contact" },
  { icon: "📋", label: "Add to sequence" },
  { icon: "💬", label: "Draft intro message" },
];

export default function ProspectsPage() {

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Prospects" />
      <DuoBar chips={PROSPECT_CHIPS} />

      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[15px] font-semibold text-[#374151]">All Prospects</h2>
            <p className="text-[12px] text-[#9CA3AF]">{leads.length} contacts</p>
          </div>
          <div className="flex gap-2">
            <button className="h-8 px-3.5 rounded-lg border border-[#D4E4EE] text-[12px] text-[#6B7280] hover:border-[#374151] transition-colors cursor-pointer">Import</button>
            <button className="h-8 px-3.5 rounded-lg bg-[#0F1923] text-white text-[12px] font-medium cursor-pointer">+ Add prospect</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#D4E4EE] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4E4EE] bg-[#F8FAFF]">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Company</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Signal</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Contact</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-[#D4E4EE] hover:bg-[#F0F6FF] transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={lead.avatar} size={32} />
                      <div>
                        <Link href={`/dashboard/prospects/sarah-chen`}>
                          <span className="text-[13px] font-semibold text-[#374151] hover:text-[#4361EE] transition-colors cursor-pointer">{lead.name}</span>
                        </Link>
                        <div className="text-[11px] text-[#9CA3AF]">{lead.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#6B7280]">{lead.company}</td>
                  <td className="px-4 py-3"><SignalPill type={lead.signalType} label={lead.signal.length > 22 ? lead.signal.slice(0, 22) + "…" : lead.signal} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${lead.email}`} className="text-[#9CA3AF] hover:text-[#4361EE] transition-colors"><Mail size={13} /></a>
                      <a href="#" className="text-[#9CA3AF] hover:text-[#4361EE] transition-colors"><Link2 size={13} /></a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href="/dashboard/prospects/sarah-chen">
                        <button className="h-6 px-2.5 text-[11px] font-medium text-[#4361EE] border border-[#4361EE] rounded-md hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1">
                          <ExternalLink size={10} /> View
                        </button>
                      </Link>
                      <button className="h-6 px-2.5 text-[11px] font-medium text-[#6B7280] border border-[#D4E4EE] rounded-md hover:border-[#374151] transition-colors cursor-pointer">+ Sequence</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
