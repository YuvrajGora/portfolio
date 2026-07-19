export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  technologies: string[];
  highlights: string[];
  whatILearned: string;
  verified: boolean;
  verificationSource?: "certificate" | "resume" | "user-confirmed";
  note?: string;
}

// Xebia is back here as a real internship — Yuvraj confirmed this directly
// (~3 weeks), though no offer letter or completion certificate exists yet.
// The three Xebia-affiliated certificates (cloud training, Copilot
// masterclass, volunteering) are documented separately in
// data/industryEngagement.ts and may or may not all fall within this
// internship window — that overlap hasn't been confirmed either way.
export const experience: ExperienceEntry[] = [
  {
    id: "sems-internship",
    company: "SEMS",
    role: "",
    duration: "Jun 1 – Jul 31, 2026",
    technologies: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Built a multi-page responsive company website",
      "Developed a JavaScript chatbot interface",
      "Worked within an internship environment",
      "Learned project organization and client-oriented development",
    ],
    whatILearned: "",
    verified: true,
    verificationSource: "user-confirmed",
    note: "Dates confirmed directly by Yuvraj (Jun 1 – Jul 31, 2026); no certificate on file yet. Exact role title still pending.",
  },
  {
    id: "xebia-internship",
    company: "Xebia",
    role: "",
    duration: "~3 weeks",
    technologies: ["Google Cloud"],
    highlights: [
      "Completed a Google Cloud Fundamentals: Core Infrastructure training",
      "Attended a Microsoft Copilot masterclass",
      "Volunteered to help organize the Tech Treasure Hunt – Athena AI event",
    ],
    whatILearned: "",
    verified: true,
    verificationSource: "user-confirmed",
    note: "Confirmed directly by Yuvraj as a separate ~3-week internship; no offer letter or completion certificate on file yet. Exact role and dates still pending.",
  },
];
