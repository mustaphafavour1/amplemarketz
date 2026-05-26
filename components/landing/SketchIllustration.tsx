"use client";
import { motion } from "framer-motion";

export function RocketFigure({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rocket body */}
      <path d="M90 20 C70 20, 52 45, 52 80 L52 130 C52 130, 68 140, 90 140 C112 140, 128 130, 128 130 L128 80 C128 45, 110 20, 90 20Z" stroke="#0F1923" strokeWidth="2" />
      {/* Rocket nose */}
      <path d="M90 20 C78 5, 65 0, 60 8 M90 20 C102 5, 115 0, 120 8" stroke="#0F1923" strokeWidth="1.5" />
      {/* Window */}
      <circle cx="90" cy="75" r="14" stroke="#0F1923" strokeWidth="1.8" />
      <circle cx="90" cy="75" r="7" stroke="#0F1923" strokeWidth="1.2" />
      {/* Wings */}
      <path d="M52 90 C38 88, 28 100, 30 115 L52 115" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M128 90 C142 88, 152 100, 150 115 L128 115" stroke="#0F1923" strokeWidth="1.8" />
      {/* Exhaust */}
      <path d="M70 140 C65 158, 60 165, 68 175 C76 182, 90 178, 90 178" stroke="#0F1923" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M110 140 C115 158, 120 165, 112 175 C104 182, 90 178, 90 178" stroke="#0F1923" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Figure riding */}
      <circle cx="90" cy="155" r="10" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M90 165 L90 185" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M78 175 L90 170 L102 175" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M84 185 L90 190" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M96 185 L90 190" stroke="#0F1923" strokeWidth="1.8" />
      {/* Stars */}
      <path d="M30 30 L32 26 L34 30 L38 30 L35 33 L36 37 L32 34 L28 37 L29 33 L26 30Z" stroke="#0F1923" strokeWidth="1" />
      <path d="M148 55 L149.5 52 L151 55 L154 55 L151.8 57 L152.5 60 L149.5 58 L146.5 60 L147.2 57 L145 55Z" stroke="#0F1923" strokeWidth="1" />
      <path d="M22 65 L23 62 L24 65 L27 65 L24.5 67 L25.5 70 L23 68 L20.5 70 L21.5 67 L19 65Z" stroke="#0F1923" strokeWidth="1" />
    </motion.svg>
  );
}

export function FloatingPerson({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <circle cx="60" cy="30" r="18" stroke="#0F1923" strokeWidth="1.8" />
      {/* Body */}
      <path d="M42 80 L42 120 M78 80 L78 120" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M38 80 C38 60, 60 55, 82 80" stroke="#0F1923" strokeWidth="1.8" />
      {/* Arms up (celebration) */}
      <path d="M42 90 C30 80, 22 68, 28 58" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M78 90 C90 80, 98 68, 92 58" stroke="#0F1923" strokeWidth="1.8" />
      {/* Legs */}
      <path d="M42 120 C38 135, 40 148, 44 152" stroke="#0F1923" strokeWidth="1.8" />
      <path d="M78 120 C82 135, 80 148, 76 152" stroke="#0F1923" strokeWidth="1.8" />
      {/* Stars around */}
      <path d="M15 40 L16.5 36 L18 40 L22 40 L19 43 L20 47 L16.5 44 L13 47 L14 43 L11 40Z" stroke="#E85D26" strokeWidth="1" />
      <path d="M95 25 L96 22 L97 25 L100 25 L98 27.5 L98.8 31 L96 29 L93.2 31 L94 27.5 L92 25Z" stroke="#4361EE" strokeWidth="1" />
    </motion.svg>
  );
}
