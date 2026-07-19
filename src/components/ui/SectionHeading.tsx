import RevealText from "./RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      <RevealText as="span" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-cyan)]">
        {eyebrow}
      </RevealText>
      <RevealText
        as="h2"
        delay={0.08}
        className="mt-4 font-[var(--font-display)] text-4xl sm:text-5xl font-semibold tracking-tight"
      >
        {title}
      </RevealText>
      {description && (
        <RevealText
          as="p"
          delay={0.16}
          className="mt-4 text-[var(--color-text-muted)] text-lg leading-relaxed"
        >
          {description}
        </RevealText>
      )}
    </div>
  );
}
