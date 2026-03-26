"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight,
  ExternalLink, Github, ArrowUpRight, Pause, Play,
} from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";
import Image from "next/image";

const AUTO_INTERVAL = 6500; // 6s per slide
const DRAG_THRESHOLD = 50;

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const statusStyle: Record<string, { dot: string; text: string; border: string; bg: string; pill: string }> = {
  Live: {
    dot:    "#4ADE80",
    text:   "text-[#22D3EE]",
    border: "border-[#22D3EE]/30",
    bg:     "bg-[#07090F]/80",      // ✅ dark bg ثابت
    pill:   "backdrop-blur-md",
  },
  "In Progress": {
    dot:    "#FACC15",
    text:   "text-[#FACC15]",
    border: "border-[#FACC15]/30",
    bg:     "bg-[#07090F]/80",      // ✅ dark bg ثابت
    pill:   "backdrop-blur-md",
  },
  Archived: {
    dot:    "#94A3B8",
    text:   "text-[#94A3B8]",
    border: "border-[#1E293B]",
    bg:     "bg-[#07090F]/80",      // ✅ dark bg ثابت
    pill:   "backdrop-blur-md",
  },
};


export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const total = projectsData.length;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef(0);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + total) % total);
    setProgress(0);
  }, [total]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    setProgress(0);
  };

  /* ── Auto-swipe ── */
  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (100 / (AUTO_INTERVAL / 50)), 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    if (!paused) startAuto();
    else stopAuto();
    return stopAuto;
  }, [paused, current, startAuto, stopAuto]);

  /* ── Drag ── */
  const handleDragStart = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const handleDragEnd = (e: React.PointerEvent) => {
    const diff = e.clientX - dragStartX.current;
    if (diff < -DRAG_THRESHOLD) go(1);
    else if (diff > DRAG_THRESHOLD) go(-1);
  };

  const project = projectsData[current];
  const status = statusStyle[project.status];

  return (
    <section
      id="projects"
      className="py-24 bg-[#0F1117]"

    >
      <Container>

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <SectionHeader
            label="03 — Work"
            title="Selected Projects"
            subtitle="Hover to pause · Drag or use arrows to navigate."
          />

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0 pb-1">
            {/* Auto-play toggle */}
            <motion.button
              onClick={() => setPaused((p) => !p)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
              title={paused ? "Resume auto-play" : "Pause auto-play"}
            >
              {paused
                ? <Play size={12} className="translate-x-[1px]" />
                : <Pause size={12} />
              }
            </motion.button>

            {/* Counter */}
            <span className="font-['JetBrains_Mono'] text-xs text-[#94A3B8]/50 w-10 text-center">
              <span className="text-[#F1F5F9] font-bold">
                {String(current + 1).padStart(2, "0")}
              </span>
              /{String(total).padStart(2, "0")}
            </span>

            {/* Prev / Next */}
            <div className="flex items-center gap-1.5">
              <motion.button
                onClick={() => go(-1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
              >
                <ArrowLeft size={14} />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
              >
                <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Slide area ── */}
        <div
          className="relative overflow-hidden rounded-2xl touch-pan-y"
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          style={{ cursor: "grab" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="active:cursor-grabbing select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#1E293B]">

                {/* ══ LEFT — Visual panel ══ */}
                <div
                  className="relative min-h-[260px] lg:min-h-[480px] flex flex-col"
                  style={{
                    background: "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(99,102,241,0.06) 100%)",
                  }}
                >
                  {/* Screenshot placeholder */}                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <div className="flex flex-col items-center gap-4">
                      <motion.div
                        key={current}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-24 h-24 rounded-3xl flex items-center justify-center border border-[#1E293B]"
                        style={{
                          background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(99,102,241,0.12))",
                          boxShadow: "0 0 40px rgba(34,211,238,0.08)",
                        }}
                      >
                        <ArrowUpRight size={32} className="text-[#22D3EE]" />
                      </motion.div>
                      <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/30 uppercase tracking-[0.15em]">
                        screenshot placeholder
                      </p>
                    </div> */}
                    <Image src={project.thumbnail} alt={project.name} fill className="object-cover" />
                  </div>

                  {/* Top badges row */}
                  <div className="relative z-4 flex items-start justify-between p-5">
                    {/* Status */}
                  <span
  className={`
    inline-flex items-center gap-1.5
    px-2.5 py-1 rounded-full
    font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em]
    border shadow-lg
    ${status.text}
    ${status.border}
    ${status.bg}
    ${status.pill}
  `}
  style={{
    boxShadow: "0 2px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.2)",
  }}
>
  <motion.span
    className="w-1.5 h-1.5 rounded-full shrink-0"
    style={{ background: status.dot }}
    animate={{ opacity: [1, 0.4, 1] }}
    transition={{ duration: 1.6, repeat: Infinity }}
  />
  {project.status}
</span>

                    {/* Year */}
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/70 bg-[#0F1117]/80 border border-[#30486d] px-3 py-1.5 rounded-full backdrop-blur-sm"
                    style={{
    boxShadow: "0 2px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.2)",
  }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom gradient on visual panel */}
                  <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(15,17,23,0.7), transparent)" }}
                  />

                  {/* Slide index — bottom left */}
                  {/* <div className="relative z-10 mt-auto p-5">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/40">
                      project {String(current + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
                    </span>
                  </div> */}
                </div>

                {/* ══ RIGHT — Info panel ══ */}
                <div className="flex flex-col bg-[#151923] p-7 sm:p-8 border-l border-[#1E293B]">

                  {/* Top section */}
                  <div className="flex-1">
                    {/* Role label */}
                    <p className="font-['JetBrains_Mono'] text-[10px] text-[#22D3EE] uppercase tracking-[0.2em] mb-3">
                      {project.role}
                    </p>

                    {/* Project name */}
                    <h3
                      className="font-['Space_Grotesk'] font-bold text-[#F1F5F9] leading-tight mb-4"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                    >
                      {project.name}
                    </h3>

                    {/* Tagline */}
                    <p className="font-['JetBrains_Mono'] text-xs text-[#22D3EE]/70 mb-4 tracking-wide">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="font-['Inter'] text-[#94A3B8] text-sm leading-[1.8] mb-6">
                      {project.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px w-full bg-[#1E293B] mb-5" />

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6">
                      {project.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="w-5 h-5 flex items-center justify-center rounded-lg shrink-0 mt-0.5 text-[10px]"
                            style={{
                              background: "rgba(34,211,238,0.08)",
                              border: "1px solid rgba(34,211,238,0.15)",
                              color: "#22D3EE",
                            }}
                          >
                            ✓
                          </span>
                          <span className="font-['Inter'] text-sm text-[#94A3B8] leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded-lg bg-[#0F1117] border border-[#1E293B] text-[#94A3B8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom action buttons */}
                  <div className="pt-8 mt-6 border-t border-[#1E293B] flex flex-wrap gap-2.5">

                    {/* View Details — primary */}
                    <Link href={`/projects/${project.slug}`} className="contents">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#07090F] cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #22D3EE, #38BDF8)",
                          boxShadow: "0 0 18px rgba(34,211,238,0.15)",
                        }}
                      >
                        View Details
                        <ArrowUpRight size={13} />
                      </motion.div>
                    </Link>

                    {/* Live Demo */}
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#94A3B8] border border-[#1E293B] hover:border-[#22D3EE]/35 hover:text-[#F1F5F9] transition-all duration-200"
                    >
                      <ExternalLink size={12} className="text-[#22D3EE]" />
                      Live Demo
                    </motion.a>

                    {/* GitHub icon */}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, borderColor: "rgba(34,211,238,0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-[#94A3B8] bg-[#0F1117] border border-[#1E293B] hover:text-[#22D3EE] transition-all duration-200"
                    >
                      <Github size={14} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom bar: dots + progress ── */}
        <div className="mt-6 flex flex-col gap-3">

          {/* Progress bar */}
          <div className="w-full h-px bg-[#1E293B] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #22D3EE, #38BDF8)" }}
              animate={{ width: paused ? `${progress}%` : `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>

          {/* Dots + label */}
          <div className="flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projectsData.map((p, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.2 }}
                  title={p.name}
                  className="rounded-full transition-all duration-400 overflow-hidden"
                  style={{
                    width: i === current ? 28 : 6,
                    height: 6,
                    background: i === current
                      ? "linear-gradient(90deg, #22D3EE, #38BDF8)"
                      : "#1E293B",
                  }}
                />
              ))}
            </div>

            {/* Paused indicator */}
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/40 uppercase tracking-[0.12em]">
              {paused ? "⏸ paused" : "▶ auto-playing"}
            </span>
          </div>
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/mohamedshoman00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <Github size={13} />
            View more on GitHub
            <ArrowUpRight size={11} />
          </a>
        </motion.div>

      </Container>
    </section>
  );
}
