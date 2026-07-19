export interface EventEntry {
  id: string;
  name: string;
  organizer: string;
  date: string;
  whyIAttended: string;
  whatILearned: string;
  verified: boolean;
  note?: string;
}

export const events: EventEntry[] = [
  {
    id: "microsoft-build-localhost",
    name: "Microsoft Build //localhost:Gurugram",
    organizer: "Microsoft",
    date: "Jun 30, 2026",
    whyIAttended: "Attended to see how Microsoft's local developer community talks about building with their tools.",
    whatILearned: "",
    verified: true,
  },
  {
    id: "innovatex-2026",
    name: "InnovateX 2026 — Startup Idea Pitch Fest",
    organizer: "IILM University (IIE Cell)",
    date: "Jan 28, 2026",
    whyIAttended: "Pitched a startup idea as part of the IIE Cell's pitch fest.",
    whatILearned: "",
    verified: true,
  },
  {
    id: "engineers-day-2025",
    name: "Engineer's Day Celebration 2025",
    organizer: "IILM University",
    date: "Sep 15, 2025",
    whyIAttended: "\"Walk to Waste: Engineering for a Circular Economy\" themed celebration at IILM.",
    whatILearned: "",
    verified: true,
  },
  {
    id: "latex-workshop",
    name: "Smart Scientific Writing: Learning LaTeX with AI Assistance",
    organizer: "IILM University",
    date: "Apr 13, 2026",
    whyIAttended: "Confirmed on the resume as a workshop I participated in.",
    whatILearned: "",
    verified: true,
  },
];
