import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      data-cursor-hover
      className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] hover:border-[var(--color-cyan)]/40"
    >
      {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}
