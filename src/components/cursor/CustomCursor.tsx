import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const dotX = useSpring(x, { damping: 40, stiffness: 700 });
  const dotY = useSpring(y, { damping: 40, stiffness: 700 });
  const ringX = useSpring(x, springConfig);
  const ringY = useSpring(y, springConfig);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsFinePointer(fine);
    if (!fine) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea"
      );
      setIsHoveringLink(!!interactive);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[var(--color-text)]"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        style={{
          width: isHoveringLink ? 56 : 32,
          height: isHoveringLink ? 56 : 32,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "color-mix(in srgb, var(--color-cyan) 60%, transparent)",
          background: isHoveringLink
            ? "color-mix(in srgb, var(--color-cyan) 10%, transparent)"
            : "transparent",
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease",
        }}
      />
    </div>
  );
}
