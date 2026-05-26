"use client";

const typeConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  job:    { bg: "bg-blue-50",   text: "text-[#4361EE]", dot: "bg-[#4361EE]",  label: "Job Change" },
  social: { bg: "bg-purple-50", text: "text-[#9B59B6]", dot: "bg-[#9B59B6]",  label: "Social" },
  fund:   { bg: "bg-green-50",  text: "text-[#27AE60]", dot: "bg-[#27AE60]",  label: "Funding" },
  comp:   { bg: "bg-orange-50", text: "text-[#E85D26]", dot: "bg-[#E85D26]",  label: "Competitor" },
  news:   { bg: "bg-amber-50",  text: "text-[#F39C12]", dot: "bg-[#F39C12]",  label: "News" },
};

export function SignalPill({ type, label, small }: { type: string; label?: string; small?: boolean }) {
  const cfg = typeConfig[type] ?? typeConfig.news;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${cfg.bg} ${cfg.text} ${small ? "px-1.5 py-0.5 text-[8px]" : "px-2.5 py-0.5 text-[11px] gap-1.5"}`}>
      <span className={`rounded-full shrink-0 ${cfg.dot} ${small ? "w-1 h-1" : "w-1.5 h-1.5"}`} />
      {label ?? cfg.label}
    </span>
  );
}

export function SignalDot({ type }: { type: string }) {
  const cfg = typeConfig[type] ?? typeConfig.news;
  return <span className={`w-2 h-2 rounded-full inline-block ${cfg.dot}`} />;
}

export function signalBorder(type: string) {
  const borders: Record<string, string> = {
    job: "border-l-[#4361EE]", social: "border-l-[#9B59B6]",
    fund: "border-l-[#27AE60]", comp: "border-l-[#E85D26]", news: "border-l-[#F39C12]",
  };
  return borders[type] ?? borders.news;
}
