"use client";
import { useState } from "react";

const COLORS = [
  "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700", "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700", "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700", "bg-yellow-100 text-yellow-700",
];

const PHOTO_MAP: Record<string, string> = {
  TC: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
  DZ: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
  MC: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=64&h=64&fit=crop&crop=faces",
  CG: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
  JC: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=faces",
  PU: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=64&h=64&fit=crop&crop=faces",
  JN: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=faces",
  CB: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
  JS: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces",
  TS: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
  DM: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
  MR: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=64&h=64&fit=crop&crop=faces",
  BS: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces",
  CP: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
  AG: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
  SC: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=faces",
  MW: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=faces",
  PK: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=64&h=64&fit=crop&crop=faces",
  JM: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
  ET: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
  DK: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
  NR: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
  TH: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=faces",
  LP: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
  CV: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
  AO: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces",
  FW: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
  YT: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=64&h=64&fit=crop&crop=faces",
  RS: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=faces",
  BA: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=64&h=64&fit=crop&crop=faces",
  IS: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=faces",
  OH: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces",
  SL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
  GC: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=faces",
  ML: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
  FM: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
  JD: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
};

function colorFor(initials: string) {
  const code = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % COLORS.length;
  return COLORS[code];
}

export function Avatar({ initials, size = 32 }: { initials: string; size?: number }) {
  const photoUrl = PHOTO_MAP[initials];
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClass =
    size <= 32 ? "w-8 h-8 text-xs"
    : size <= 40 ? "w-10 h-10 text-sm"
    : size <= 48 ? "w-12 h-12 text-sm"
    : "w-14 h-14 text-base";

  if (photoUrl && !imgFailed) {
    return (
      <img
        src={photoUrl}
        alt={initials}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          width: size,
          height: size,
          border: "1.5px solid rgba(255,255,255,0.3)",
          flexShrink: 0,
          display: "block",
        }}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 ${sizeClass} ${colorFor(initials)}`}
    >
      {initials}
    </div>
  );
}
