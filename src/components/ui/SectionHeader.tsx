import FadeInView from "@/components/motion/FadeInView";

interface SectionHeaderProps {
  label: string;   // small top label e.g. "02 — Skills"
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <FadeInView>
        <span className="font-mono text-sm text-accent tracking-widest uppercase">
          {label}
        </span>
      </FadeInView>
      <FadeInView delay={0.1}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-2">
          {title}
        </h2>
      </FadeInView>
      {subtitle && (
        <FadeInView delay={0.2}>
          <p className="text-text-secondary mt-3 max-w-xl text-base">{subtitle}</p>
        </FadeInView>
      )}
    </div>
  );
}
