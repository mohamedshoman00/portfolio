"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { aboutData } from "@/data/about";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";
import FadeInView from "@/components/motion/FadeInView";
export default function About() {
  return (
    <section id="about" className="py-24 section-alt">
      <Container>
        <SectionHeader
          label="01 — About"
          title="Who I Am"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Avatar ── */}
          <FadeInView direction="right" className="flex justify-center lg:justify-start ">
            <div className="relative w-72 h-72 sm:w-72 sm:h-72 lg:w-96 lg:h-96  rounded-2xl" style={{width:'320px', height:'350px'}}>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-blue-500/10 blur-2xl scale-110" />
              {/* Border frame */}
              <div className="relative w-full h-full rounded-2xl border border-accent/20 overflow-hidden bg-card">
                <Image
                  src='/profile.jpg'  // [REPLACE with your real photo]
                  alt="Mohamed Shoman"
                  fill
                  className="object-center  transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2.5 shadow-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs text-text-secondary font-mono">Currently</p>
                <p className="text-sm font-semibold text-accent">Open to Work ✅</p>
              </motion.div>
            </div>
          </FadeInView>

          {/* ── Right: Bio + Highlights ── */}
          <div className="flex flex-col gap-6">
            {/* Bio paragraphs */}
            {aboutData.bio.map((paragraph, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <p className="text-text-secondary text-base leading-relaxed">
                  {paragraph}
                </p>
              </FadeInView>
            ))}

            {/* Highlights grid */}
            <FadeInView delay={0.25}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {aboutData.highlights.map(({ label, value, icon }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.4)" }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <span className="text-xl mt-0.5">{icon}</span>
                    <div>
                      <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-text-primary mt-0.5">
                        {value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeInView>

            {/* Inline CTA */}
            {/* <FadeInView delay={0.35}>
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-lg bg-accent text-base text-sm font-medium hover:bg-cyan-300 transition-colors"
                >
                  See My Work
                </a>
                <a
                  href="/cv.pdf"  // [REPLACE with real CV path]
                  download
                  className="px-5 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  Download CV
                </a>
              </div>
            </FadeInView> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
