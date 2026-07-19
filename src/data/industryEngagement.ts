export interface IndustryEngagement {
  id: string;
  organization: string;
  activity: string;
  date: string;
  description: string;
  verified: boolean;
  note?: string;
}

// Xebia-affiliated activities that are real and documented, but are
// training/masterclass/volunteering rather than a formal internship —
// there's no offer letter or internship completion certificate, and the
// resume itself has no Experience/Internship section. Kept as their own
// category rather than filed under "Experience" so nothing overstates
// what these actually were.
export const industryEngagements: IndustryEngagement[] = [
  {
    id: "xebia-google-cloud-fundamentals",
    organization: "Xebia",
    activity: "Google Cloud Fundamentals: Core Infrastructure — Training",
    date: "Jun 21, 2026",
    description: "Completed a Google Cloud infrastructure training program run through Xebia.",
    verified: true,
  },
  {
    id: "xebia-copilot-masterclass",
    organization: "Xebia",
    activity: "\"From Prompt to Productivity\" — Microsoft Copilot Masterclass",
    date: "Feb 16, 2026",
    description: "Attended a masterclass on using Microsoft Copilot across everyday platforms.",
    verified: true,
  },
  {
    id: "xebia-tech-treasure-hunt",
    organization: "Xebia",
    activity: "Tech Treasure Hunt – Athena AI — Volunteer",
    date: "Apr 2026",
    description: "Volunteered to help organize the event (received an appreciation certificate for organizing support, not for competing).",
    verified: true,
  },
];
