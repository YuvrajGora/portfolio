export type ProjectCategory = "production" | "hackathon" | "academic" | "experiment";
export type ProjectStatus = "Live" | "In Progress" | "Completed" | "Evolving" | "Prototype" | "Archived";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  features: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  year: string;
  color: "blue" | "purple" | "cyan";
  featured?: boolean;
  problem?: string;
  motivation?: string;
  architecture?: string;
  challenges?: string;
  solutions?: string;
  impact?: string;
  lessons?: string;
  futureImprovements?: string;
  confirmPending?: boolean;
}

export const projects: Project[] = [
  {
    slug: "flowfund",
    title: "FlowFund",
    tagline: "Personal expense tracker with real financial clarity",
    description:
      "A personal finance tracker that turns raw transaction data into a clear picture of spending habits — budgets, categories, and recurring costs. My flagship project, and the one I keep coming back to add features to.",
    stack: ["React", "Flask", "Python", "PostgreSQL", "REST APIs", "Chart.js"],
    features: [
      "Category-based budget breakdown with monthly rollovers",
      "Recurring expense detection",
      "Spending trend charts",
    ],
    status: "Live",
    category: "production",
    year: "2026",
    color: "blue",
    featured: true,
    problem:
      "Most expense trackers either oversimplify (a single running total) or overwhelm (full accounting software). I wanted something in between — real budget categories and trends without the learning curve.",
    motivation:
      "I was tracking my own spending in a spreadsheet and kept wanting features a spreadsheet can't really give you — recurring-expense detection, visual trends. Building it myself was faster than hunting for the right app.",
    architecture:
      "React frontend talking to a Flask REST API, with PostgreSQL as the source of truth for transactions and budgets. Chart.js renders spending trends client-side from data the API returns pre-aggregated by category and month, so the frontend isn't doing heavy computation on every render.",
    challenges:
      "Getting recurring-expense detection right without false positives was harder than expected — two unrelated purchases at similar amounts kept getting flagged as \"recurring.\"",
    solutions:
      "Narrowed the detection window to match on amount, merchant pattern, and a recurring day-of-month range together, instead of amount alone — cut false positives significantly.",
    impact:
      "Actively used for my own budgeting — it's the one project on this site I keep opening for a reason other than adding a feature to my portfolio.",
    lessons:
      "Backend logic that looks simple in a spec (\"detect recurring expenses\") often hides a real classification problem once you build it against messy real data.",
    futureImprovements:
      "Bank statement auto-import via a parsing API, multi-currency support, and shared/family budget views.",
  },
  {
    slug: "ecowise-ai",
    title: "EcoWise AI",
    tagline: "AI carbon footprint coach",
    description:
      "An AI-powered coach that estimates a household's carbon footprint from everyday habits and suggests specific, achievable ways to reduce it.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Gemini API"],
    features: [
      "Conversational footprint assessment powered by Gemini",
      "Personalized reduction targets",
      "Visual breakdown by transport, energy, and diet",
    ],
    status: "Completed",
    category: "production",
    year: "2026",
    color: "cyan",
    featured: true,
    problem:
      "Most carbon footprint calculators give you a single abstract number and stop there — no clear next action.",
    motivation:
      "I wanted to try building something conversational on top of the Gemini API instead of a form-and-slider calculator, and carbon footprint tracking felt like a good fit for that back-and-forth format.",
    architecture:
      "A Vite + React + TypeScript frontend calls the Gemini API directly for the conversational assessment, with Tailwind handling the visual breakdown by transport, energy, and diet as the model's response gets parsed into structured categories client-side.",
    challenges:
      "Keeping the AI's suggestions specific and achievable instead of generic (\"use less energy\") took several rounds of prompt iteration.",
    solutions:
      "Added few-shot examples of good vs. vague suggestions directly in the system prompt, and constrained the model to always return a specific action plus an estimated impact.",
    impact:
      "Fully functional end-to-end — a working demonstration of AI-driven behavior coaching rather than a live product with real users tracked yet.",
    lessons:
      "A conversational AI feature is only as good as the constraints you put around it — unconstrained prompts default to vague advice.",
    futureImprovements:
      "Connect to real utility/transport data instead of self-reported habits, and add week-over-week progress tracking.",
  },
  {
    slug: "careergenie",
    title: "CareerGenie",
    tagline: "AI career guidance platform",
    description:
      "A guidance platform mapping a student's skills and interests to realistic career paths, with concrete next steps rather than generic advice.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "MongoDB", "Gemini API"],
    features: [
      "Skill-gap analysis against target roles",
      "AI-generated learning roadmaps",
      "Resume feedback powered by generative AI",
    ],
    status: "Completed",
    category: "production",
    year: "2026",
    color: "purple",
    featured: true,
    problem:
      "Career guidance for students is usually generic — \"learn to code\" — without a concrete path from where someone actually is to a specific role.",
    motivation:
      "As a student figuring out my own direction, I wanted a tool that could turn \"I don't know what to learn next\" into an actual ordered list.",
    architecture:
      "React/TypeScript frontend on Firebase Auth and Firestore for user profiles, with MongoDB storing the larger structured content (role requirements, skill taxonomies) that Firestore wasn't the right fit for. The Gemini API handles skill-gap analysis and roadmap generation server-side before results reach the client.",
    challenges:
      "Mapping a broad, fuzzy self-description of skills to a specific, useful roadmap without the output feeling like a generic checklist.",
    solutions:
      "Constrained the model's output to a strict JSON schema (role, gap, ordered steps) instead of free text, which forced more specific, checkable recommendations.",
    impact:
      "Fully working prototype I use on myself to sanity-check my own learning path — not yet tested with other users' real profiles at scale.",
    lessons: "Structured output from an LLM (a real roadmap, not just prose) needed a much more constrained prompt than I first tried.",
    futureImprovements:
      "Pull in real job postings to ground the roadmap in current market demand instead of general advice.",
  },
  {
    slug: "deadlineguardian-ai",
    title: "DeadlineGuardian AI",
    tagline: "Smart deadline manager (hackathon prototype)",
    description:
      "A prototype exploring AI-driven deadline management — rescheduling tasks intelligently based on workload and priority rather than treating every deadline the same.",
    stack: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    features: [
      "Priority-aware auto-rescheduling",
      "Smart notifications before deadline risk",
      "Workload heatmap across the week",
    ],
    status: "Prototype",
    category: "hackathon",
    year: "2026",
    color: "blue",
    problem:
      "Flat to-do lists treat every deadline as equally urgent, which isn't how real workload pressure actually feels.",
    motivation: "Wanted to explore whether priority-aware scheduling logic could be made to feel automatic instead of something the user configures by hand.",
    challenges: "Defining \"priority\" in a way that's useful without asking the user to manually rank everything defeats the point of automation.",
    lessons: "This is still a prototype — the rescheduling logic works for simple cases but hasn't been stress-tested against a genuinely overloaded week yet.",
    futureImprovements: "Real calendar integration, and a rescheduling algorithm that accounts for task dependencies, not just deadlines.",
  },
  {
    slug: "ai-recruiter",
    github: "https://github.com/YuvrajGora/RedRankAI",
    title: "AI Recruiter",
    tagline: "Intelligent candidate discovery and ranking",
    description:
      "A prototype focused on using AI to surface and rank candidates against role requirements.",
    stack: ["Gemini API", "React", "Google AI Studio"],
    features: ["AI-assisted candidate discovery", "Candidate ranking against role criteria"],
    status: "Prototype",
    category: "experiment",
    year: "2026",
    color: "purple",
    problem: "Manually screening candidates against role requirements doesn't scale past a handful of applicants.",
    motivation: "Wanted to explore whether an LLM could do a first-pass ranking that's actually defensible, not just a black-box score.",
    challenges: "Getting the ranking to explain itself — a bare score isn't useful to a recruiter without the reasoning behind it.",
    lessons: "Still a prototype — hasn't been tested against real, messy resumes at volume.",
    futureImprovements: "Bias-auditing on the ranking logic, and structured explanations for every ranking decision.",
    confirmPending: true,
  },
  {
    slug: "ksp-crime-analytics-dashboard",
    github: "https://github.com/YuvrajGora/ksp-datathon",
    title: "KSP Crime Analytics Dashboard",
    tagline: "AI-driven crime analytics, built during the KSP Datathon",
    description:
      "A multi-page Flask platform developed during the KSP Datathon (Challenge 02): a crime dashboard, geographic heatmap, criminal network visualization, a Random Forest risk predictor, and socio-economic correlation charts — deployed end-to-end solo.",
    stack: ["Python", "Flask", "Random Forest", "Zoho Catalyst", "Render"],
    features: [
      "Interactive crime dashboard and geographic heatmap",
      "Criminal network visualization",
      "Random Forest-based risk prediction",
      "Socio-economic correlation charts",
      "Deployed on both Zoho Catalyst AppSail and Render",
    ],
    status: "Completed",
    category: "hackathon",
    year: "2026",
    color: "cyan",
    featured: true,
    problem:
      "Law enforcement teams need a way to see crime patterns spatially and socio-economically, not just as spreadsheet rows.",
    motivation: "Entered the KSP Datathon because a real-world, high-stakes dataset felt like a genuinely different challenge from a typical class project.",
    architecture:
      "A multi-page Flask application: one route serves the dashboard shell, separate endpoints feed the heatmap (geo-aggregated incident data), the network visualization (relationship edges between entities), and the Random Forest risk predictor (trained offline, loaded at request time for inference). Deployed in parallel on Zoho Catalyst AppSail and Render so a platform-specific failure wouldn't block the submission.",
    challenges:
      "Zoho Catalyst AppSail deployment was mandatory and became its own project: Python version mismatches, numpy/scipy dependency conflicts, Windows-built binaries failing on Linux, import ordering bugs, and ZIP structure errors all had to be resolved before the app would even boot.",
    solutions:
      "Rebuilt the dependency set using Linux-compatible pip install flags, pinned exact Python/numpy/scipy versions to match Catalyst's runtime, and restructured the deployment ZIP to match Catalyst's expected layout.",
    impact: "Fully deployed and functional across two independent hosting platforms — submitted and demoed for KSP Datathon 2026, Challenge 02.",
    lessons:
      "Cross-platform deployment is its own skill separate from writing the app — most of the hard problems here were DevOps, not data science.",
    futureImprovements: "Real-time data ingestion instead of a static dataset, and a proper access-control layer before this could go near production use.",
  },
  {
    slug: "stadiumsense-ai",
    github: "https://github.com/YuvrajGora/smartstadiums",
    title: "StadiumSense AI",
    tagline: "GenAI-powered fan navigation & crowd management",
    description:
      "Built for Challenge 4 of the FIFA World Cup 2026 Smart Stadiums Hackathon — a GenAI-powered app helping fans navigate stadiums and helping organizers manage crowd flow in real time.",
    stack: ["React", "Gemini API", "Node.js"],
    features: [
      "GenAI-powered navigation assistance for fans inside the stadium",
      "Crowd density signals to support organizer decision-making",
      "Iterated across multiple submission rounds during the hackathon",
    ],
    status: "Completed",
    category: "hackathon",
    year: "2026",
    color: "purple",
    problem:
      "Smart stadiums need to help thousands of fans move efficiently while giving organizers visibility into crowd buildup before it becomes a safety issue.",
    motivation: "The FIFA World Cup 2026 Smart Stadiums challenge was a chance to apply GenAI to a real logistics problem instead of a chatbot demo.",
    challenges:
      "Scored below my own target on the judging rubric despite several rounds of iteration — a reminder that hackathon scoring criteria don't always map cleanly to what feels like a well-built solution.",
    lessons: "Learned to read a rubric literally instead of just building what felt technically impressive.",
    futureImprovements: "Real-time crowd density input (rather than simulated), and multi-language support for international fans.",
  },
  {
    slug: "cleanair-clear-streets",
    title: "CleanAir & Clear Streets",
    tagline: "Pollution reporting and hotspot detection web app",
    description:
      "Built in roughly six days for a Google-sponsored national hackathon: a three-page pollution reporting and hotspot detection app using Gemini Vision, Firebase, Leaflet.js, and live AQI data — with zero build tools.",
    stack: ["Gemini Vision API", "Firebase Firestore", "Leaflet.js", "Open-Meteo AQI API", "Chart.js"],
    features: [
      "Photo-based pollution reporting via Gemini Vision",
      "Recurring hotspot escalation using Haversine distance clustering",
      "Live AQI overlay on an interactive map",
    ],
    status: "Completed",
    category: "hackathon",
    year: "2025",
    color: "blue",
    problem: "Residents notice pollution hotspots anecdotally but have no easy way to report them or see recurring patterns.",
    motivation: "A Google-sponsored national hackathon with a ~6 day timeline — wanted to see how much could get built with zero build tools and a hard deadline.",
    challenges:
      "Hit Gemini API quota errors, CDN URL mangling, Firebase permission issues, and had to scrub an accidentally committed API key past GitHub's push protection.",
    lessons: "Zero-build-tool constraints force you to actually understand what a bundler was doing for you.",
    futureImprovements: "Move off zero-build-tools to a proper bundler for maintainability, and add a moderation layer for user-submitted reports.",
  },
  {
    slug: "nexabot-enterprise",
    title: "NexaBot Enterprise",
    tagline: "Static enterprise chatbot demo, built for coursework",
    description:
      "A static HTML/CSS/JavaScript chatbot built for a fictional company (NexaTech Solutions) as an academic exercise — consultation booking, appointment tracking, support tickets, quote generation, job applications, feedback collection, and an admin dashboard, all running on localStorage.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: [
      "Consultation booking and appointment tracking",
      "Support ticket and quote generation flows",
      "Admin dashboard backed by localStorage",
    ],
    status: "Completed",
    category: "academic",
    year: "2026",
    color: "cyan",
    problem: "Small companies often need a functional-looking booking/support system without a real backend to prototype the idea.",
    motivation: "Coursework exercise — wanted to push a \"simple\" static site further than expected, into something with real multi-flow interactivity.",
    challenges:
      "Chrome's file:// origin isolation made localStorage look broken across pages — fixed by serving through VS Code Live Server on localhost instead of opening files directly.",
    lessons: "Browser storage APIs are origin-scoped in ways that aren't obvious until you hit them.",
    futureImprovements: "Swap localStorage for a real backend so data persists across devices, not just one browser.",
  },
  {
    slug: "company-website",
    title: "Company Website",
    tagline: "Responsive multi-page company website with a chatbot interface",
    description:
      "A responsive, multi-page company website with a functional JavaScript chatbot interface, built during the SEMS internship.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: ["Multi-page responsive layout", "Functional chatbot interface"],
    status: "Completed",
    category: "production",
    year: "2026",
    color: "blue",
    problem: "Client-facing brief: build a responsive, multi-page company site with an interactive element beyond static pages.",
    motivation: "Wanted the chatbot interface to feel like part of the site rather than a bolted-on widget.",
  },
  {
    slug: "wordpress-cms-project",
    title: "WordPress CMS Project",
    tagline: "CMS build for learning WordPress development",
    description:
      "Built while learning WordPress development and CMS concepts — a local WordPress site with custom pages and a MySQL-backed content structure.",
    stack: ["WordPress", "XAMPP", "PHP", "MySQL"],
    features: ["Custom page templates", "Local MySQL-backed content structure", "Local environment via XAMPP"],
    status: "Completed",
    category: "academic",
    year: "2026",
    color: "purple",
    problem: "Wanted hands-on understanding of how CMS platforms structure content versus hand-coding every page.",
    motivation: "Learning exercise — building on WordPress directly rather than only reading about how it works.",
    confirmPending: true,
  },
];
