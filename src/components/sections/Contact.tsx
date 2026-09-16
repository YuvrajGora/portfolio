import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import RevealText from "../ui/RevealText";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";
import { contactEmail, location, socialLinks } from "../../constants/social";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

try {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: "79d96416-4dca-4ca5-8412-ca1987ca5859",
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    }),
  });

  const result = await response.json();

  if (result.success) {
    setStatus("sent");
    setForm(initialForm);
    setTimeout(() => setStatus("idle"), 3000);
  } else {
    console.error("Web3Forms error:", result);
    setStatus("error");
  }
} catch (error) {
  console.error("Contact form error:", error);
  setStatus("error");
}

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something."
          description="Open to internships, collaborations, and interesting problems. Reach out — I reply fast."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <RevealText className="space-y-5">
            <a
              href={`mailto:${contactEmail}`}
              data-cursor-hover
              className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-[var(--color-cyan)]/30 transition-colors"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-cyan)]">
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Email</p>
                <p className="font-medium">{contactEmail}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 glass rounded-2xl p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-surface-hover)] text-[var(--color-cyan)]">
                <FiMapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Location</p>
                <p className="font-medium">{location}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {socialLinks
                .filter((s) => s.icon !== "mail")
                .map((s) => {
                  const Icon = s.icon === "github" ? FiGithub : FiLinkedin;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-cyan)]/40 hover:text-[var(--color-cyan)] transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
            </div>
          </RevealText>

          <RevealText delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Name"
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => handleChange("name", v)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => handleChange("email", v)}
                />
              </div>
              <Field
                label="Subject"
                value={form.subject}
                error={errors.subject}
                onChange={(v) => handleChange("subject", v)}
              />
              <div>
                <label className="text-sm text-[var(--color-text-muted)]">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-cyan)]/50 transition-colors resize-none"
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <MagneticButton
                as="button"
                type="submit"
                className="relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-black bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-purple)] to-[var(--color-cyan)] overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" || status === "error" ? (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <FiSend size={14} /> Send Message
                    </motion.span>
                  ) : status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <FiLoader size={14} className="animate-spin" /> Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck size={14} /> Message Sent
                    </motion.span>
                  )}
                </AnimatePresence>
              </MagneticButton>
              {status === "error" && (
                <p className="text-xs text-red-400">Something went wrong — try again.</p>
              )}
            </form>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm text-[var(--color-text-muted)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-cyan)]/50 transition-colors"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
