"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/skills";

const levelConfig = {
  Advanced: { color: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10" },
  Intermediate: { color: "text-blue-400 border-blue-400/40 bg-blue-400/10" },
  Beginner: { color: "text-slate-400 border-slate-400/30 bg-slate-400/5" },
};

export default function SkillBadge({ name, level }: Skill) {
  const { color } = levelConfig[level];
  return (
    <div
      className={`
        inline-flex flex-col items-start gap-1 px-4 py-3
        rounded-xl border font-mono text-sm
        transition-all duration-200 cursor-default
        hover:scale-105 hover:shadow-md
        ${color}
      `}
    >
      <span className="font-medium">{name}</span>
      {/* <span className="text-[10px] uppercase tracking-wider opacity-70">{level}</span> */}
    </div>
  );
}
