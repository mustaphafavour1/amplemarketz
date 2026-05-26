"use client";

const COLORS = [
  "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700", "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700", "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700", "bg-yellow-100 text-yellow-700",
];

function colorFor(initials: string) {
  const code = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % COLORS.length;
  return COLORS[code];
}

export function Avatar({ initials, size = 32 }: { initials: string; size?: number }) {
  const sizeClass = size <= 32 ? "w-8 h-8 text-xs" : size <= 40 ? "w-10 h-10 text-sm" : size <= 48 ? "w-12 h-12 text-sm" : "w-14 h-14 text-base";
  return (
    <div className={`rounded-full flex items-center justify-center font-semibold shrink-0 ${sizeClass} ${colorFor(initials)}`}>
      {initials}
    </div>
  );
}
