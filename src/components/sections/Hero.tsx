import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiMail } from "react-icons/fi";
import MagneticButton from "../ui/MagneticButton";
import { useMousePosition } from "../../hooks/useMousePosition";
import { hackathons } from "../../data/hackathons";

const verifiedHackathonCount = hackathons.filter((h) => h.verified).length;

const roles = [
  "Full Stack Developer",
  "AI Builder",
  "Problem Solver",
  "Hackathon Enthusiast",
  "Software Engineer",
];

function useTypedRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return text;
}

export default function Hero() {
  const typedRole = useTypedRole();
  const { x, y } = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Floating gradient blobs */}
      <div
        className="absolute -top-24 left-[8%] h-72 w-72 sm:h-96 sm:w-96 rounded-full opacity-40 blur-3xl animate-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-[6%] h-80 w-80 sm:h-[26rem] sm:w-[26rem] rounded-full opacity-30 blur-3xl animate-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-purple), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-25 blur-3xl animate-blob pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)", animationDelay: "-3s" }}
      />

      {/* Mouse-reactive light */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 grid lg:grid-cols-[1.3fr_1fr] gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm text-[var(--color-cyan)] flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-neon)]" />
            </span>
            Open to internships — India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-[var(--font-display)] font-semibold tracking-tight text-[13vw] leading-[0.95] sm:text-7xl lg:text-[5.5rem]"
          >
            Hi, I'm
            <br />
            <span className="text-gradient">Yuvraj Gora</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 h-8 font-mono text-lg sm:text-xl text-[var(--color-text-muted)]"
          >
            <span className="text-[var(--color-text)]">{typedRole}</span>
            <span className="ml-1 inline-block w-[2px] h-5 bg-[var(--color-cyan)] align-middle animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-[var(--color-text-muted)] text-lg leading-relaxed"
          >
            I build modern web applications, AI-powered tools, and real-world
            software solutions — passionate about creating impactful products
            while constantly learning new technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full px-6 py-3 text-sm font-medium text-black bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium glass"
            >
              My Journey
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/resume.pdf"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium glass"
            >
              <FiDownload size={14} /> Download Resume
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <FiMail size={14} /> Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        {/* Signature element: live terminal identity card */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30 animate-float">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 font-mono text-xs text-[var(--color-text-dim)]">whoami.sh</span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7">
              <p><span className="text-[var(--color-cyan)]">$</span> whoami</p>
              <p className="text-[var(--color-text-muted)]">yuvraj_gora</p>
              <p className="mt-2"><span className="text-[var(--color-cyan)]">$</span> cat status.json</p>
              <p className="text-[var(--color-text-muted)]">{"{"}</p>
              <p className="pl-4">"role": <span className="text-[var(--color-purple)]">"CSE Student"</span>,</p>
              <p className="pl-4">"builds": <span className="text-[var(--color-purple)]">"full-stack + AI"</span>,</p>
              <p className="pl-4">"hackathons": <span className="text-[var(--color-blue)]">{verifiedHackathonCount}</span>,</p>
              <p className="pl-4">"team": <span className="text-[var(--color-purple)]">"The Solo Rider"</span>,</p>
              <p className="pl-4">"status": <span className="text-[var(--color-neon)]">"shipping"</span></p>
              <p>{"}"}</p>
              <p className="mt-2 flex items-center gap-1">
                <span className="text-[var(--color-cyan)]">$</span>
                <span className="inline-block w-2 h-4 bg-[var(--color-text)] animate-pulse" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-dim)]"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <FiArrowDown className="animate-bounce" size={14} />
      </motion.button>
    </section>
  );
}
