export interface FocusArea {
  id: string;
  title: string;
  description: string;
}

// This is meant to be a living snapshot — update it whenever what you're
// actually spending time on changes. Kept intentionally short.
export const currentFocus: FocusArea[] = [
  { id: "ai-apps", title: "AI-powered applications", description: "Going deeper with the Gemini API across FlowFund and future projects." },
  { id: "full-stack", title: "Modern full-stack projects", description: "React on the frontend, Flask/Node on the backend, real databases underneath." },
  { id: "cloud-deploy", title: "Cloud deployment", description: "Comfortable with Vercel and Render; working through the rough edges of Zoho Catalyst." },
  { id: "hackathons", title: "Hackathons", description: "Competing solo, one build at a time." },
];
