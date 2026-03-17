"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowRight, Download, MapPin, ExternalLink, MessageCircle } from "lucide-react";
import Container from "@/components/layout/Container";
const socials = [
  { icon: Github, href: "https://github.com/mohamedshoman00", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedshoman00", label: "LinkedIn" },
  { icon: Mail, href: "mohamedshoman242@gmail.com", label: "Email" },
  { icon: MessageCircle, href: "https://wa.me/201223330261", label: "WhatsApp" },
];

const stats = [
  { value: "1+", label: "Years" },
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Deployed" },
  // { value: "99+", label: "Coffee Cups" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#07090F]"
    >

      {/* ── Background ── */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          className="absolute -top-60 -left-60 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -right-40 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </motion.div>

      {/* ── Content ── */}
      <Container className="relative z-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-y-16 gap-x-12 xl:gap-x-20 items-center">

          {/* ════════ LEFT ════════ */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-start">

            {/* Label — same as SectionHeader label style */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#22D3EE] uppercase tracking-[0.2em]">
                <MapPin size={11} />
                Cairo, Egypt
                <span className="w-px h-3 bg-[#1E293B] mx-1" />
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-green-400 normal-case tracking-normal">Available for work</span>
              </span>
            </motion.div>

            {/* Name — same font as section titles */}
            <motion.h1
              variants={item}
              className="mt-5 font-['Space_Grotesk'] font-bold text-[#F1F5F9] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
            >
              Mohamed&nbsp;
              {/* <br /> */}
              <span className="relative inline-block mt-1">
                <span
                  style={{
                    background: "linear-gradient(120deg, #F1F5F9 20%, #22D3EE 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Shoman
                </span>
                <motion.span
                  className="absolute left-0 -bottom-1 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #22D3EE, #818CF8)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>

            {/* Role — same mono style as card labels */}
            <motion.p
              variants={item}
              className="mt-5 font-['JetBrains_Mono'] text-sm text-[#22D3EE] tracking-widest uppercase"
            >
              Frontend Developer — React.js & Next.js
            </motion.p>

            {/* Description — same as section body text */}
            <motion.p
              variants={item}
              className="mt-5 font-['Inter'] text-text-secondary text-base sm:text-[17px] leading-[1.8] max-w-[500px]"
            >
              I build fast, accessible, and visually refined web applications.
              Focused on clean architecture, smooth interactions, and products
              that users enjoy using.
            </motion.p>

            {/* CTAs — same button style as all sections */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#07090F] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #38BDF8 100%)",
                  boxShadow: "0 0 28px rgba(34,211,238,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                View My Work
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-['Space_Grotesk'] text-sm font-semibold text-[#94A3B8] border border-[#1E293B] hover:border-[#22D3EE]/40 hover:text-[#F1F5F9] hover:bg-white/[0.02] transition-all duration-200"
              >
                <Download size={14} className="text-[#22D3EE]" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Stats — same card style: bg-[#151923] border border-[#1E293B] rounded-2xl */}
            <motion.div
              variants={item}
              className="mt-10 flex items-stretch  divide-x divide-[#1E293B] bg-[#151923] border border-[#1E293B] rounded-2xl overflow-hidden"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center px-7 py-4">
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#F1F5F9]">
                    {value}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/60 mt-0.5 uppercase tracking-[0.12em]">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Socials — same card style as contact links */}
            <motion.div variants={item} className="mt-8 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, borderColor: "rgba(34,211,238,0.3)" }}
                  whileTap={{ scale: 0.92 }}
                  className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#151923] border border-[#1E293B] transition-all duration-200"
                >
                  <Icon size={14} className="text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors" />
                  <span className="font-['JetBrains_Mono'] text-xs text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors">
                    {label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════ RIGHT — Identity Card ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-[400px]">

              {/* Glow ring — same as About avatar card */}
              <div
                className="absolute -inset-[1px] rounded-[22px] opacity-50"
                style={{
                  background: "linear-gradient(135deg, rgba(34,211,238,0.35) 0%, rgba(99,102,241,0.15) 100%)",
                  filter: "blur(0.5px)",
                }}
              />

              {/* Card — bg-[#151923] border border-[#1E293B] rounded-[22px] */}
              <div
                className="relative w-full rounded-[22px] overflow-hidden border border-white/[0.05]"
                style={{ background: "linear-gradient(160deg, #151923 0%, #0F1117 100%)" }}
              >
                {/* Avatar area */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(160deg, rgba(34,211,238,0.07) 0%, rgba(99,102,241,0.07) 100%)",
                    }}
                  />
                  {/* [REPLACE with <Image src="/your-photo.jpg" alt="..." fill className="object-cover" />] */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center font-['Space_Grotesk'] text-3xl font-bold text-[#22D3EE] border-2 border-[#22D3EE]/25"
                      style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(99,102,241,0.1))" }}
                    >
                      MS
                    </div>
                    <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/40 uppercase tracking-[0.12em]">
                      Welcome to my portfolio
                    </p>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24"
                    style={{ background: "linear-gradient(to top, #151923, transparent)" }}
                  />
                </div>

                {/* Card body */}
                <div className="px-6 pb-6 pt-1">
                  <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#F1F5F9]">
                    Mohamed Shoman
                  </h2>
                  <p className="font-['JetBrains_Mono'] text-[11px] text-[#22D3EE] mt-1 tracking-widest uppercase">
                    Frontend Developer
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#1E293B] my-5" />

                  {/* Info rows — same label/value style as Experience cards */}
                  <div className="space-y-3">
                    {[
                      { key: "Stack", val: "React · Next.js · TS" },
                      { key: "Location", val: "Cairo, Egypt 🇪🇬" },
                      { key: "Focus", val: "Frontend & UI/UX" },
                      { key: "Status", val: "Open to work ✅" },
                    ].map(({ key, val }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]/50 uppercase tracking-[0.12em]">
                          {key}
                        </span>
                        <span className="font-['Inter'] text-xs text-[#94A3B8] font-medium">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#1E293B] mt-5 mb-5" />

                  {/* CTA — same ghost button style */}
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-['Space_Grotesk'] text-xs font-semibold text-[#22D3EE] border border-[#22D3EE]/20 hover:bg-[#22D3EE]/5 transition-all duration-200"
                  >
                    <ExternalLink size={12} />
                    Get in Touch
                  </motion.a>
                </div>
              </div>

              {/* Floating badge top-right — same style as About badge */}
              <motion.div
                className="absolute -top-4 -right-4 flex items-center gap-2 bg-[#151923] border border-[#1E293B] rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/50"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]">status</p>
                  <p className="font-['Space_Grotesk'] text-xs font-bold text-green-400">Hire Me</p>
                </div>
              </motion.div>

              {/* Floating badge bottom-left */}
              <motion.div
                className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-[#151923] border border-[#1E293B] rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/50"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <span className="text-base">⚛️</span>
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#94A3B8]">experience</p>
                  <p className="font-['Space_Grotesk'] text-xs font-bold text-[#F1F5F9]">Since 2023</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.span
          className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          scroll
        </motion.span>
        <div className="relative w-px h-10 bg-[#1E293B] overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#22D3EE] rounded-full"
            style={{ height: "40%" }}
            animate={{ y: ["-100%", "280%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
