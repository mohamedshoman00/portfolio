"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight,
  Maximize2, ArrowUpRight,
  Pause, Play, ZoomIn, ZoomOut,
} from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

/* ─── Config ──────────────────────────────── */
const AUTO_INTERVAL = 5000;

/* ─── Helpers ─────────────────────────────── */
function getAllScreenshots(project: Project): string[] {
  return [project.thumbnail, ...project.images].filter(Boolean);
}

/* ─── Slide variants ──────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.98,
  }),
  center: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.98,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Placeholder ─────────────────────────── */
function Placeholder({ index, name }: { index: number; name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(99,102,241,0.1))",
            border: "1px solid rgba(34,211,238,0.15)",
            boxShadow: "0 0 32px rgba(34,211,238,0.06)",
          }}
        >
          <ArrowUpRight size={22} className="text-[#22D3EE]" />
        </div>
        <div className="text-center">
          <p className="font-['Space_Grotesk'] text-sm font-semibold text-[#F1F5F9]">{name}</p>
          <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/30 uppercase tracking-[0.15em] mt-1">
            screenshot {String(index + 1).padStart(2, "0")} — add real image
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Component ──────────────────────── */
export default function ScreenshotGallery({ project }: { project: Project }) {
  const screenshots = getAllScreenshots(project);
  const hasReal     = screenshots.length > 0;
  const total       = hasReal ? screenshots.length : 4;

  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox,  setLightbox]  = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [zoomed,    setZoomed]    = useState(false);

  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX  = useRef(0);

  /* ── Navigation ── */
  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActive((c) => (c + dir + total) % total);
    setProgress(0);
    setZoomed(false);
  }, [total]);

  const goTo = useCallback((i: number) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
    setProgress(0);
    setZoomed(false);
  }, [active]);

  /* ── Auto-swipe ── */
  const startAuto = useCallback(() => {
    if (timerRef.current)    clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (100 / (AUTO_INTERVAL / 40)), 100));
    }, 40);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((c) => (c + 1) % total);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (timerRef.current)    clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    const shouldStop = hovered || paused || lightbox;
    if (shouldStop) stopAuto();
    else startAuto();
    return stopAuto;
  }, [hovered, paused, lightbox, active, startAuto, stopAuto]);

  /* ── Lightbox keyboard ── */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else setLightbox(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, zoomed, go]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* ── Drag ── */
  const onDragStart = (e: React.PointerEvent) => { dragStartX.current = e.clientX; };
  const onDragEnd   = (e: React.PointerEvent) => {
    const diff = e.clientX - dragStartX.current;
    if (diff < -40) go(1);
    else if (diff > 40) go(-1);
  };

  const isAuto = !hovered && !paused && !lightbox;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Section Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-['JetBrains_Mono'] text-xs text-[#22D3EE] uppercase tracking-[0.2em] mb-1">
              Gallery
            </p>
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#F1F5F9]">
              Project Screenshots
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto indicator */}
            <motion.span
              key={isAuto ? "auto" : "manual"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#94A3B8]/40"
            >
              {isAuto ? (
                <>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  auto
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]/40" />
                  paused
                </>
              )}
            </motion.span>

            {/* Play/Pause */}
            <motion.button
              onClick={() => setPaused((p) => !p)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              title={paused ? "Resume" : "Pause"}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
            >
              {paused
                ? <Play size={11} className="translate-x-[1px]" />
                : <Pause size={11} />
              }
            </motion.button>

            {/* Counter */}
            <span className="font-['JetBrains_Mono'] text-xs text-[#94A3B8]/50 w-10 text-center">
              <span className="text-[#F1F5F9] font-bold">
                {String(active + 1).padStart(2, "0")}
              </span>
              /{String(total).padStart(2, "0")}
            </span>

            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <motion.button
                onClick={() => go(-1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
              >
                <ChevronLeft size={14} />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
              >
                <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Main Viewer ── */}
        <div className="relative">
          <div
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#1E293B] group cursor-grab active:cursor-grabbing"
            style={{
              background: "linear-gradient(160deg, rgba(34,211,238,0.04), rgba(99,102,241,0.05))",
              boxShadow: "0 0 0 1px rgba(34,211,238,0.03)",
            }}
            onPointerDown={onDragStart}
            onPointerUp={onDragEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 select-none"
              >
                {hasReal ? (
                  <Image
                    src={screenshots[active]}
                    alt={`${project.name} screenshot ${active + 1}`}
                    fill
                    className=" object-center object-fill"
                    priority={active === 0}
                    draggable={false}
                  />
                ) : (
                  <Placeholder index={active} name={project.name} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Featured badge */}
            {project.featured && active === 0 && (
              <div className="absolute top-4 left-4 z-4">
                <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#22D3EE] border border-[#22D3EE]/25 bg-[#22D3EE]/5 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Featured
                </span>
              </div>
            )}

            {/* Fullscreen button */}
            <div className="absolute top-4 right-4 z-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                onClick={() => setLightbox(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#07090F]/80 border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 backdrop-blur-sm transition-colors duration-200"
              >
                <Maximize2 size={13} />
              </motion.button>
            </div>

            {/* Side arrows */}
            {total > 1 && (
              <>
                <div
                  className="absolute z-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ left: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  <motion.button
                    onClick={() => go(-1)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#07090F]/80 cursor-pointer border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 backdrop-blur-sm transition-colors duration-200"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>
                </div>
                <div
                  className="absolute z-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ right: 12, top: "50%", transform: "translateY(-50%)" }}
                >
                  <motion.button
                    onClick={() => go(1)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#07090F]/80 cursor-pointer border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 backdrop-blur-sm transition-colors duration-200"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </>
            )}

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-[1]"
              style={{ background: "linear-gradient(to top, rgba(7,9,15,0.4), transparent)" }}
            />

            {/* Index pill */}
            {/* <div className="absolute bottom-3 right-4 z-4">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/50 bg-[#07090F]/70 border border-[#1E293B] px-2.5 py-1 rounded-full backdrop-blur-sm">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div> */}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-px w-full bg-[#1E293B] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #22D3EE, #38BDF8)" }}
              animate={{ width: isAuto ? `${progress}%` : `${((active + 1) / total) * 100}%` }}
              transition={{ duration: isAuto ? 0.04 : 0.4, ease: "linear" }}
            />
          </div>
        </div>

        {/* ── Thumbnail Strip ── */}
        {total > 1 && (
          <div
            className="mt-4 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(total, 6)}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: total }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative aspect-video rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  border: `2px solid ${i === active ? "rgba(34,211,238,0.55)" : "rgba(30,41,59,1)"}`,
                  background: "linear-gradient(160deg, rgba(34,211,238,0.03), rgba(99,102,241,0.03))",
                }}
              >
                {hasReal ? (
                  <Image
                    src={screenshots[i]}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-fill object-center"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-['JetBrains_Mono'] text-[9px] text-[#94A3B8]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                {i === active && (
                  <motion.div
                    layoutId="thumb-highlight"
                    className="absolute inset-0"
                    style={{ background: "rgba(34,211,238,0.1)" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {i !== active && (
                  <div className="absolute inset-0 bg-[#07090F]/40" />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* ── Mobile dots ── */}
        {total > 1 && (
          <div className="mt-6 flex sm:hidden items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === active ? 24 : 6,
                  height: 6,
                  background: i === active
                    ? "linear-gradient(90deg, #22D3EE, #38BDF8)"
                    : "#1E293B",
                }}
              />
            ))}
          </div>
        )}
      </div>

  {/* ══════════════════════════════
    LIGHTBOX
══════════════════════════════ */}
<AnimatePresence>
  {lightbox && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(4,6,11,0.97)", backdropFilter: "blur(16px)" }}
      onClick={() => zoomed ? setZoomed(false) : setLightbox(false)}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.93, opacity: 0, y: 16 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        // ✅ max-h-[100vh] + overflow-y-auto يمنع التمدد خارج الشاشة
        className="relative w-full max-w-5xl flex flex-col gap-3 max-h-[calc(100vh-2rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-0.5 sticky top-0 z-10">
          <div className="flex items-center gap-3">

            {/* macOS dots */}
            <div className="mt-6  flex  items-center gap-1.5">
              <motion.button
                onClick={() => setLightbox(false)}
                whileHover={{ scale: 1.15 }}
                className="w-3 h-3 rounded-full bg-[#FF5F57]"
              />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <motion.button
                onClick={() => setZoomed((z) => !z)}
                whileHover={{ scale: 1.15 }}
                className="w-3 h-3 rounded-full bg-[#28C840]"
              />
            </div>

            <div className="w-px h-4 bg-[#1E293B]" />

            <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#F1F5F9] truncate max-w-[160px] sm:max-w-none">
              {project.name}
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/40 hidden sm:block">
              ·&nbsp;screenshot&nbsp;
              <span className="text-[#22D3EE]">{String(active + 1).padStart(2, "0")}</span>
              &nbsp;/&nbsp;{String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Zoom toggle */}
            <motion.button
              onClick={() => setZoomed((z) => !z)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              title={zoomed ? "Zoom out" : "Zoom in"}
              className={`
                w-8 h-8 flex items-center justify-center rounded-xl border transition-all duration-200
                ${zoomed
                  ? "bg-[#22D3EE]/10 border-[#22D3EE]/40 text-[#22D3EE]"
                  : "bg-[#151923] border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30"
                }
              `}
            >
              {zoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
            </motion.button>

            {/* Close */}
            <motion.button
              onClick={() => setLightbox(false)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#151923] border border-[#1E293B] text-[#94A3B8] hover:text-[#FF5F57] hover:border-[#FF5F57]/30 transition-all duration-200"
            >
              <X size={13} />
            </motion.button>
          </div>
        </div>

        {/* ── Image ── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#1E293B]"
          style={{
            // ✅ max-h بيمنع التمدد + aspect-ratio بدون !important
            aspectRatio: "16/9",
            maxHeight: "80vh",
            background: "linear-gradient(160deg, rgba(34,211,238,0.04), rgba(99,102,241,0.05))",
            boxShadow: "0 0 0 1px rgba(34,211,238,0.06), 0 40px 80px rgba(0,0,0,0.7)",
            cursor: zoomed ? "zoom-out" : "zoom-in",
          }}
          onClick={() => setZoomed((z) => !z)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`lb-${active}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: zoomed ? 1.65 : 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {hasReal ? (
                  <Image
                    src={screenshots[active]}
                    alt={`${project.name} screenshot ${active + 1}`}
                    fill
                    className=" object-fill object-center"
                    draggable={false}
                  />
                ) : (
                  <Placeholder index={active} name={project.name} />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Zoom badge */}
          <AnimatePresence>
            {zoomed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -6 }}
                animate={{ opacity: 1, scale: 1,   y: 0  }}
                exit={{   opacity: 0, scale: 0.8, y: -6  }}
                className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#07090F]/80 border border-[#22D3EE]/25 backdrop-blur-sm"
              >
                <ZoomIn size={10} className="text-[#22D3EE]" />
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#22D3EE] uppercase tracking-[0.12em]">
                  zoomed · click to reset
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Side arrows */}
          {total > 1 && !zoomed && (
            <>
              <div
                className="absolute z-10"
                style={{ left: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <motion.button
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#07090F]/80 border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </motion.button>
              </div>
              <div
                className="absolute z-10"
                style={{ right: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <motion.button
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#07090F]/80 border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </>
          )}

          {/* Index pill */}
          {/* <div className="absolute bottom-3 right-4 z-10">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/60 bg-[#07090F]/80 border border-[#1E293B] px-2.5 py-1 rounded-full backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div> */}
        </div>

        {/* ── Bottom controls ── */}
        <AnimatePresence>
          {!zoomed && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-2"
            >
              {total > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: total }).map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => goTo(i)}
                      whileHover={{ scale: 1.2 }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:  i === active ? 28 : 6,
                        height: 6,
                        background: i === active
                          ? "linear-gradient(90deg, #22D3EE, #38BDF8)"
                          : "rgba(30,41,59,1)",
                      }}
                    />
                  ))}
                </div>
              )}
              <p className="text-center font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/20 uppercase tracking-[0.15em]">
                esc · click outside to close&nbsp;·&nbsp;← → navigate&nbsp;·&nbsp;click image to zoom
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
