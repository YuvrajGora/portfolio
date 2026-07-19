interface ConfirmationBadgeProps {
  status: "needs-confirmation" | "user-confirmed";
  className?: string;
}

const styles = {
  "needs-confirmation": "border-[var(--color-border)] text-[var(--color-text-dim)]",
  "user-confirmed": "border-[var(--color-cyan)]/30 text-[var(--color-cyan)]",
};

const labels = {
  "needs-confirmation": "Needs Confirmation",
  "user-confirmed": "User Confirmed",
};

export default function ConfirmationBadge({ status, className = "" }: ConfirmationBadgeProps) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  );
}
