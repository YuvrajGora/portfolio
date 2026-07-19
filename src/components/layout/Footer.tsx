import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import MagneticButton from "../ui/MagneticButton";
import { socialLinks } from "../../constants/social";

const iconMap = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail };

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] mt-32">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-[var(--font-display)] text-xl font-semibold">
            Yuvraj Gora<span className="text-[var(--color-cyan)]">.</span>
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Yuvraj Gora. Built solo, shipped with care.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor-hover
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-cyan)]/40 transition-colors"
              >
                <Icon size={16} />
              </a>
            );
          })}
          <MagneticButton
            as="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-purple)] text-white"
          >
            <FiArrowUp size={16} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
