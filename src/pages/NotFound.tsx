import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[var(--font-display)] text-8xl font-bold text-gradient"
      >
        404
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-[var(--color-text-muted)] max-w-md"
      >
        This page doesn't exist — maybe it got refactored out.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)]"
        >
          <FiArrowLeft size={14} /> Back home
        </Link>
      </motion.div>
    </main>
  );
}
