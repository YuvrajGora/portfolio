export interface Skill {
  name: string;
  level: number; // rough self-assessment, not a certification claim
  usedIn: string[]; // project slugs from data/projects.ts
  selfRating?: "Familiar"; // matches resume's own qualifier — shown as-is, not inflated
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

// Base list cross-checked against the uploaded resume's Technical Skills
// section (July 2026). Skills the resume marks "(Familiar)" keep that label
// rather than being shown as equally strong as the rest.
export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    skills: [
      { name: "Python", level: 80, usedIn: ["flowfund", "ksp-crime-analytics-dashboard"] },
      { name: "C", level: 55, usedIn: [] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "HTML", level: 88, usedIn: ["company-website", "nexabot-enterprise"] },
      { name: "CSS", level: 85, usedIn: ["company-website", "nexabot-enterprise"] },
      { name: "JavaScript", level: 78, usedIn: ["nexabot-enterprise", "company-website"] },
      { name: "React", level: 62, usedIn: ["flowfund", "careergenie", "ecowise-ai", "ai-recruiter", "stadiumsense-ai"], selfRating: "Familiar" },
      { name: "TypeScript", level: 60, usedIn: ["ecowise-ai", "careergenie"] },
      { name: "Tailwind CSS", level: 65, usedIn: ["ecowise-ai", "careergenie"] },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Flask", level: 72, usedIn: ["flowfund", "ksp-crime-analytics-dashboard"] },
      { name: "Node.js", level: 55, usedIn: ["deadlineguardian-ai", "stadiumsense-ai"] },
      { name: "Express", level: 52, usedIn: ["deadlineguardian-ai"] },
      { name: "PHP", level: 50, usedIn: ["wordpress-cms-project"] },
      { name: "REST APIs", level: 70, usedIn: ["flowfund", "deadlineguardian-ai"] },
    ],
  },
  {
    id: "database",
    title: "Databases & Cloud",
    skills: [
      { name: "MongoDB", level: 60, usedIn: ["careergenie", "deadlineguardian-ai"], selfRating: "Familiar" },
      { name: "Firebase", level: 60, usedIn: ["careergenie"], selfRating: "Familiar" },
      { name: "PostgreSQL", level: 60, usedIn: ["flowfund"] },
      { name: "MySQL", level: 50, usedIn: ["wordpress-cms-project"] },
      { name: "Google Cloud Run", level: 55, usedIn: [] },
      { name: "Vercel", level: 75, usedIn: ["ecowise-ai", "cleanair-clear-streets"] },
      { name: "Zoho Catalyst", level: 55, usedIn: ["ksp-crime-analytics-dashboard"] },
    ],
  },
  {
    id: "ai",
    title: "AI & Data",
    skills: [
      { name: "Gemini API", level: 78, usedIn: ["ecowise-ai", "careergenie", "stadiumsense-ai", "ai-recruiter"] },
      { name: "Google AI Studio", level: 70, usedIn: ["ai-recruiter"] },
      { name: "Prompt Engineering", level: 62, usedIn: ["ecowise-ai", "careergenie", "ai-recruiter"], selfRating: "Familiar" },
      { name: "Pandas", level: 55, usedIn: [], selfRating: "Familiar" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", level: 82, usedIn: ["flowfund", "ecowise-ai", "careergenie", "deadlineguardian-ai"] },
      { name: "GitHub", level: 85, usedIn: ["flowfund", "ecowise-ai", "careergenie", "deadlineguardian-ai"] },
      { name: "Visual Studio Code", level: 90, usedIn: [] },
      { name: "XAMPP", level: 50, usedIn: ["wordpress-cms-project"] },
      { name: "WordPress", level: 50, usedIn: ["wordpress-cms-project"] },
    ],
  },
];
