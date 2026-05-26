"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis,
  XAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Topbar } from "@/components/dashboard/Topbar";
import { DuoBar } from "@/components/ui/DuoBar";
import { TrendingUp } from "lucide-react";

const ANALYTICS_CHIPS = [
  { icon: "📊", label: "Show this week's summary" },
  { icon: "🏆", label: "Best performing sequences" },
  { icon: "📉", label: "Identify drop-off points" },
  { icon: "🎯", label: "Compare to last month" },
];

const VOLUME_DATA = [
  { day: "Mon", emails: 145 },
  { day: "Tue", emails: 178 },
  { day: "Wed", emails: 163 },
  { day: "Thu", emails: 201 },
  { day: "Fri", emails: 189 },
  { day: "Sat", emails: 87 },
  { day: "Sun", emails: 62 },
];

const RADIAL_DATA = [
  { name: "News", value: 31, fill: "#FDE68A" },
  { name: "Social", value: 45, fill: "#DDD6FE" },
  { name: "Funding", value: 62, fill: "#A7F3D0" },
  { name: "Job Change", value: 78, fill: "#BFDBFE" },
  { name: "Competitor", value: 83, fill: "#FECACA" },
];

const TOP_SIGNALS = [
  { type: "job", label: "Job Change", description: "Promotion/new role detected", leads: 14, replies: 6 },
  { type: "fund", label: "Funding", description: "Series A/B announcement", leads: 8, replies: 4 },
  { type: "social", label: "Social", description: "Engaged with relevant content", leads: 11, replies: 3 },
  { type: "comp", label: "Competitor", description: "Checked competitor pricing", leads: 9, replies: 4 },
  { type: "news", label: "News", description: "Company featured in press", leads: 6, replies: 2 },
];

const SIGNAL_COLORS: Record<string, string> = {
  job: "#4361EE", fund: "#27AE60", social: "#9B59B6", comp: "#E85D26", news: "#F39C12",
};

const LEADERBOARD = [
  { name: "VP Promotion Congrats", leads: 18, open: "41%", reply: "12.1%", meetings: 4, winner: true },
  { name: "SaaStr Event Follow-up", leads: 24, open: "32%", reply: "8.4%", meetings: 3, winner: false },
  { name: "Competitor Win-back", leads: 7, open: "28%", reply: "3.2%", meetings: 1, winner: false },
];

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"];

const STAT_CARDS = [
  { value: "1,247", label: "Emails sent", delta: "+18%", pos: true },
  { value: "34.2%", label: "Open rate", delta: "+2.1%", pos: true },
  { value: "14.9%", label: "Reply rate", delta: "+0.8%", pos: true },
  { value: "28", label: "Meetings booked", delta: "+5", pos: true },
  { value: "4.2h", label: "Avg. reply time", delta: "-0.8h", pos: true },
];

const avgRate = Math.round(RADIAL_DATA.reduce((s, d) => s + d.value, 0) / RADIAL_DATA.length);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 7 days");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Analytics" />
      <DuoBar chips={ANALYTICS_CHIPS} />

      <div className="flex-1 overflow-y-auto p-8">
        {/* Date range + header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[13px] font-semibold" style={{ color: "var(--c-text-1)" }}>Performance Overview</h2>
            <p className="text-[11px]" style={{ color: "var(--c-text-3)" }}>Across all sequences and signals</p>
          </div>
          <div className="flex gap-1.5">
            {DATE_RANGES.map(r => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className="h-7 px-3 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                style={{
                  background: dateRange === r ? "var(--c-navy)" : "var(--c-surface)",
                  color: dateRange === r ? "#FFFFFF" : "var(--c-text-2)",
                  border: `1px solid ${dateRange === r ? "var(--c-navy)" : "var(--c-border)"}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {STAT_CARDS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="grad-border rounded-xl p-5"
              style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
            >
              <div className="text-[26px] font-bold leading-none mb-1" style={{ color: "var(--c-navy)" }}>{s.value}</div>
              <div className="text-[11px] mb-2" style={{ color: "var(--c-text-3)" }}>{s.label}</div>
              <div className="flex items-center gap-1 text-[10.5px] font-medium text-[#15803D]">
                <TrendingUp size={10} /> {s.delta} vs last period
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main 65/35 grid */}
        <div className="grid grid-cols-[1fr_300px] gap-5">

          {/* Left: Charts */}
          <div className="flex flex-col gap-5">

            {/* Outreach Volume — AreaChart */}
            <div className="grad-border rounded-xl p-5" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h3 className="text-[12px] font-semibold mb-4" style={{ color: "var(--c-text-1)" }}>Outreach Volume</h3>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={VOLUME_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#1E40AF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--c-text-3)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 8, fontSize: 11 }}
                    itemStyle={{ color: "var(--c-text-1)" }}
                    cursor={{ stroke: "var(--c-border-md)", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone" dataKey="emails" stroke="#1E40AF" strokeWidth={2}
                    fill="url(#areaGrad)" dot={false}
                    activeDot={{ r: 4, fill: "#1E40AF", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Signal conversion — RadialBarChart */}
            <div className="grad-border rounded-xl p-5" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h3 className="text-[12px] font-semibold mb-4" style={{ color: "var(--c-text-1)" }}>Signal Conversion by Type</h3>
              <div className="flex items-center gap-6">
                <div className="relative" style={{ width: 200, height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%" cy="50%"
                      innerRadius={25} outerRadius={95}
                      data={RADIAL_DATA}
                      startAngle={90} endAngle={-270}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar
                        dataKey="value"
                        cornerRadius={4}
                        background={{ fill: "rgba(0,0,0,0.04)" }}
                      >
                        {RADIAL_DATA.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </RadialBar>
                    </RadialBarChart>
                  </ResponsiveContainer>
                  {/* Center label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[22px] font-bold" style={{ color: "var(--c-navy)" }}>{avgRate}%</span>
                    <span className="text-[10px]" style={{ color: "var(--c-text-3)" }}>avg conv.</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {RADIAL_DATA.slice().reverse().map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-[11px]" style={{ color: "var(--c-text-2)" }}>{d.name}</span>
                      <span className="text-[11px] font-semibold ml-auto" style={{ color: "var(--c-text-1)" }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sequence Leaderboard */}
            <div className="grad-border rounded-xl overflow-hidden" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: "var(--c-border)" }}>
                <h3 className="text-[12px] font-semibold" style={{ color: "var(--c-text-1)" }}>Sequence Leaderboard</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--c-subtle)", borderBottom: "1px solid var(--c-border)" }}>
                    {["Name", "Leads", "Open rate", "Reply rate", "Meetings"].map(h => (
                      <th key={h} className="text-left px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-3)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map((row, i) => (
                    <tr key={i} className="border-b"
                      style={{ borderColor: "var(--c-border)", background: row.winner ? "var(--c-blue-light)" : "transparent" }}>
                      <td className="px-5 py-3 text-[12px] font-medium" style={{ color: "var(--c-text-1)" }}>
                        {row.winner && <span className="mr-1.5 text-[#F39C12]">★</span>}{row.name}
                      </td>
                      <td className="px-5 py-3 text-[12px]" style={{ color: "var(--c-text-2)" }}>{row.leads}</td>
                      <td className="px-5 py-3 text-[12px]" style={{ color: "var(--c-text-2)" }}>{row.open}</td>
                      <td className="px-5 py-3 text-[12px] font-semibold" style={{ color: row.winner ? "#15803D" : "var(--c-text-1)" }}>{row.reply}</td>
                      <td className="px-5 py-3 text-[12px]" style={{ color: "var(--c-text-2)" }}>{row.meetings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Top signals + stats */}
          <div className="flex flex-col gap-5">
            <div className="grad-border rounded-xl p-5" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h3 className="text-[12px] font-semibold mb-4" style={{ color: "var(--c-text-1)" }}>Signals that converted</h3>
              <div className="flex flex-col gap-3">
                {TOP_SIGNALS.map((sig, i) => {
                  const pct = Math.round((sig.replies / sig.leads) * 100);
                  return (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: `${SIGNAL_COLORS[sig.type]}18`, color: SIGNAL_COLORS[sig.type] }}>
                            {sig.label}
                          </span>
                        </div>
                        <p className="text-[11px] truncate" style={{ color: "var(--c-text-2)" }}>{sig.description}</p>
                        <p className="text-[10.5px]" style={{ color: "var(--c-text-3)" }}>{sig.leads} leads → {sig.replies} replies</p>
                      </div>
                      <span className="text-[12px] font-bold shrink-0" style={{ color: "#15803D" }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grad-border rounded-xl p-5" style={{ borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <h3 className="text-[12px] font-semibold mb-4" style={{ color: "var(--c-text-1)" }}>Quick stats</h3>
              {[
                { label: "Avg. time to reply", value: "4.2h" },
                { label: "Best day to send", value: "Tuesday" },
                { label: "Best time to send", value: "9–11am" },
                { label: "Sequences active", value: "2" },
                { label: "Avg email length", value: "94 words" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--c-border)" }}>
                  <span className="text-[11px]" style={{ color: "var(--c-text-2)" }}>{s.label}</span>
                  <span className="text-[11px] font-semibold" style={{ color: "var(--c-text-1)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
