"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Github,
  ArrowUpRight, ChevronRight,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { projectsData } from "@/data/projects";
import Container from "@/components/layout/Container";
import ScreenshotGallery from "../ui/ScreenshotGallery";

/* ─── Status style — same as Projects section ── */
const statusStyle: Record<string, { dot: string; cls: string }> = {
  Live: { dot: "#4ADE80", cls: "text-green-400 border-green-400/20 bg-green-400/5" },
  "In Progress": { dot: "#FACC15", cls: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5" },
  Archived: { dot: "#94A3B8", cls: "text-[#94A3B8] border-[#1E293B] bg-transparent" },
};

/* ─── Shared animation variants — same as all sections ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectDetailClient({ project }: { project: Project }) {
  const status = statusStyle[project.status];

  return (
    <main className="min-h-screen bg-[#07090F]">

      {/* ══════════════════════════════
          STICKY NAV
      ══════════════════════════════ */}
      <div className="sticky top-0 z-10 bg-[#07090F]/90 backdrop-blur-xl border-b border-[#1E293B]">
        <Container className="h-14 flex items-center justify-between">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Link href="/#projects">
              <motion.span
                whileHover={{ x: -2 }}
                className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs text-[#94A3B8] hover:text-[#22D3EE] transition-colors cursor-pointer"
              >
                <ArrowLeft size={12} />
                Projects
              </motion.span>
            </Link>
            <ChevronRight size={11} className="text-[#1E293B]" />
            <span className="font-['JetBrains_Mono'] text-xs text-[#F1F5F9] truncate max-w-[160px] sm:max-w-none">
              {project.name}
            </span>
          </div>

          {/* Status badge */}
          <span
            className={`
              hidden sm:inline-flex items-center gap-1.5
              font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em]
              px-2.5 py-1 rounded-full border ${status.cls}
            `}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: status.dot }}
              animate={project.status === "Live" ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {project.status}
          </span>
        </Container>
      </div>

      {/* ══════════════════════════════
          HERO — bg-[#0F1117] like even sections
      ══════════════════════════════ */}
      <section className="py-22 bg-[#0F1117] border-b border-[#1E293B]">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="py-4"
          >
            {/* Label — exact same style as SectionHeader label */}
            <motion.p
              variants={fadeUp}
              className="font-['JetBrains_Mono'] text-xs text-[#22D3EE] uppercase tracking-[0.2em] mb-4 pt-2"
            >
              {project.role}
            </motion.p>

            {/* Title — exact same font as section titles */}
            <motion.h1
              variants={fadeUp}
              className="font-['Space_Grotesk'] font-bold text-[#F1F5F9] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              {project.name}
            </motion.h1>

            {/* Description — same as section subtitles */}
            <motion.p
              variants={fadeUp}
              className="mt-5 font-['Inter'] text-[#94A3B8] text-text-secondary sm:text-[17px] leading-[1.8] max-w-2xl"
            >
              {project.longDescription}
            </motion.p>

            {/* CTA buttons — same as all sections */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#07090F] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #22D3EE, #38BDF8)",
                  boxShadow: "0 0 28px rgba(34,211,238,0.2)",
                }}
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                <ExternalLink size={13} />
                Live Demo
                <ArrowUpRight size={12} />
              </motion.a>

              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#94A3B8] border border-[#1E293B] hover:border-[#22D3EE]/40 hover:text-[#F1F5F9] hover:bg-white/[0.02] transition-all duration-200"
              >
                <Github size={13} className="text-[#22D3EE]" />
                View Source
              </motion.a>
            </motion.div>

            {/* Meta row — same card bg as all sections */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-3 mb-4"
            >
              {[
                { label: "Year", value: project.year },
                { label: "Role", value: project.role },
                { label: "Status", value: project.status },
                { label: "Stack", value: `${project.stack.length} technologies` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col px-4 py-3 rounded-xl bg-[#151923] border border-[#1E293B]"
                >
                  <span className="font-['JetBrains_Mono'] text-[9px] text-[#94A3B8]/50 uppercase tracking-[0.12em]">
                    {label}
                  </span>
                  <span className="font-['Inter'] text-sm text-[#F1F5F9] font-medium mt-0.5 whitespace-nowrap">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════════════════════
          SCREENSHOT — bg-[#07090F]
      ══════════════════════════════ */}
      <section className="py-16 bg-[#07090F]">
        <Container>
          <ScreenshotGallery project={project} />
        </Container>
      </section>

      {/* ══════════════════════════════
          CONTENT GRID — bg-[#0F1117]
      ══════════════════════════════ */}
      <section className="py-16 bg-[#0F1117]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-6 items-start">

            {/* ──────────── LEFT ──────────── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >

              {/* Features card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#151923] border border-[#1E293B] rounded-2xl p-6 sm:p-7 hover:border-[#22D3EE]/20 transition-colors duration-300"
              >
                <h2 className="font-['Space_Grotesk'] text-text-secondary font-bold text-[#F1F5F9] mb-5">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.45 }}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#0F1117] border border-[#1E293B]"
                    >
                      <span
                        className="w-5 h-5 flex items-center justify-center rounded-lg shrink-0 mt-0.5 font-bold text-[10px]"
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stack card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#151923] border border-[#1E293B] rounded-2xl p-6 sm:p-7 hover:border-[#22D3EE]/20 transition-colors duration-300"
              >
                <h2 className="font-['Space_Grotesk'] text-text-secondary font-bold text-[#F1F5F9] mb-5">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.3)" }}
                      className="font-['JetBrains_Mono'] text-xs px-3.5 py-2 rounded-xl bg-[#0F1117] border border-[#1E293B] text-[#94A3B8] cursor-default transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>


            </motion.div>

            {/* ──────────── RIGHT — Sticky sidebar ──────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 lg:sticky lg:top-[72px]"
            >

              {/* Links card */}
              <div className="bg-[#151923] border border-[#1E293B] rounded-2xl overflow-hidden hover:border-[#22D3EE]/20 transition-colors duration-300">
                <div className="px-5 py-4 border-b border-[#1E293B]">
                  <p className="font-['Space_Grotesk'] text-sm font-semibold text-[#F1F5F9]">
                    Links
                  </p>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  {[
                    { icon: ExternalLink, label: "Live Demo", href: project.liveUrl },
                    { icon: Github, label: "GitHub Repo", href: project.githubUrl },
                  ].map(({ icon: Icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#0F1117] group transition-colors duration-200"
                    >
                      <div
                        className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(99,102,241,0.08))",
                          border: "1px solid rgba(34,211,238,0.12)",
                        }}
                      >
                        <Icon size={13} className="text-[#22D3EE]" />
                      </div>
                      <span className="font-['Inter'] text-sm text-[#94A3B8] group-hover:text-[#F1F5F9] transition-colors flex-1">
                        {label}
                      </span>
                      <ArrowUpRight size={11} className="text-[#1E293B] group-hover:text-[#22D3EE] transition-colors shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Project info card */}
              <div className="bg-[#151923] border border-[#1E293B] rounded-2xl overflow-hidden hover:border-[#22D3EE]/20 transition-colors duration-300">
                <div className="px-5 py-4 border-b border-[#1E293B]">
                  <p className="font-['Space_Grotesk'] text-sm font-semibold text-[#F1F5F9]">
                    Project Info
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { label: "Year", value: project.year },
                    { label: "Role", value: project.role },
                    { label: "Status", value: project.status },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/50 uppercase tracking-[0.12em]">
                        {label}
                      </span>
                      <span className="font-['Inter'] text-sm text-[#94A3B8] font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy link button */}
              <CopyLinkButton />
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ══════════════════════════════
          OTHER PROJECTS — bg-[#07090F]
          Same card style as Projects section
      ══════════════════════════════ */}
      <section className="py-16 bg-[#07090F] border-t border-[#1E293B]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header — same SectionHeader style */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-['JetBrains_Mono'] text-xs text-[#22D3EE] uppercase tracking-[0.2em] mb-2">
                  Continue Exploring
                </p>
                <h3
                  className="font-['Space_Grotesk'] font-bold text-[#F1F5F9]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                >
                  Other Projects
                </h3>
              </div>
              <Link href="/#projects">
                <motion.span
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center gap-1 font-['JetBrains_Mono'] text-xs text-[#22D3EE] hover:opacity-70 transition-opacity cursor-pointer mb-1"
                >
                  View all <ArrowUpRight size={11} />
                </motion.span>
              </Link>
            </div>

            {/* Cards — exact same as Projects section cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projectsData
                .filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p, i) => (
                  <Link key={p.id} href={`/projects/${p.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{
                        y: -6,
                        boxShadow: "0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(34,211,238,0.1)",
                      }}
                      className="group relative flex flex-col bg-[#151923] border border-[#1E293B] rounded-2xl p-6 transition-colors duration-300 hover:border-[#22D3EE]/25 cursor-pointer h-full"
                    >
                      {/* Featured badge */}
                      {p.featured && (
                        <span className="absolute top-4 right-4 font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#22D3EE] border border-[#22D3EE]/25 bg-[#22D3EE]/5 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-[#1E293B] group-hover:border-[#22D3EE]/25 transition-colors duration-300"
                        style={{
                          background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(99,102,241,0.08))",
                        }}
                      >
                        <ArrowUpRight size={16} className="text-[#22D3EE]" />
                      </div>

                      {/* Role */}
                      <p className="font-['JetBrains_Mono'] text-[10px] text-[#22D3EE] uppercase tracking-[0.15em] mb-2">
                        {p.role}
                      </p>

                      {/* Name */}
                      <h4 className="font-['Space_Grotesk'] text-text-secondary font-semibold text-[#F1F5F9] group-hover:text-[#22D3EE] transition-colors duration-200 mb-2 leading-tight">
                        {p.name}
                      </h4>

                      {/* Tagline */}
                      <p className="font-['Inter'] text-sm text-[#94A3B8] leading-relaxed flex-1">
                        {p.tagline}
                      </p>

                      {/* Stack + divider */}
                      <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#1E293B]">
                        {p.stack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded-lg bg-[#0F1117] border border-[#1E293B] text-[#94A3B8]"
                          >
                            {t}
                          </span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 text-[#94A3B8]/40">
                            +{p.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1E293B] py-6 bg-[#07090F]">
        <Container className="flex items-center justify-between gap-3">
          <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/30 uppercase tracking-[0.15em]">
            Mohamed Shoman · {new Date().getFullYear()}
          </p>
          <Link href="/">
            <motion.span
              whileHover={{ x: -2 }}
              className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/40 hover:text-[#22D3EE] transition-colors cursor-pointer uppercase tracking-[0.15em]"
            >
              ← Home
            </motion.span>
          </Link>
        </Container>
      </footer>

    </main>
  );
}

/* ─── Copy Link Button ─────────────────────── */
function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

 const handleCopy = async () => {
  if (typeof window === "undefined") return;

  try {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    // Fallback لو clipboard API مش متاحة
    const input = document.createElement("input");
    input.value = window.location.href;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};


  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-['JetBrains_Mono'] text-xs transition-all duration-300"
      style={
        copied
          ? { background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ADE80" }
          : { background: "#151923", border: "1px solid #1E293B", color: "#94A3B8" }
      }
    >
      {copied ? "✓ Copied!" : "⎘ Copy Link"}
    </motion.button>
  );
}
