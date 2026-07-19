# Yuvraj Gora — Portfolio

A dark, glassmorphic, animation-driven personal portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion.

## Design direction

- **Palette:** near-black background (`#05060a`) with a blue → purple → cyan gradient family, plus a single sparing neon-lime accent for "available" status indicators.
- **Type:** Space Grotesk for display/headlines, Inter for body copy, JetBrains Mono for tags, stats, and the terminal-styled signature card — a deliberate nod to a developer's actual toolset.
- **Signature element:** the hero's `whoami.sh` terminal card — instead of a generic rotating-text hero, it renders your identity as a live-typed JSON payload, tying the "rotating roles" requirement directly to your identity as a coder.
- **Command palette (Cmd+K / Ctrl+K):** jump to any section, open a project, toggle theme, or download your resume.

## What's included

- Hero with typed rotating roles, animated grid, floating gradient blobs, mouse-reactive light, terminal signature card
- About with a journey timeline and animated counters
- Skills with tabbed categories and animated proficiency bars
- Projects with 3D-tilt cards and dedicated case-study pages (`/projects/:slug`)
- Certificates with filtering and a modal preview
- Experience timeline
- Achievements with animated counters
- GitHub section wired to the live public GitHub API (with graceful fallback data)
- Blog section that's empty-state ready (auto-appears once you add posts)
- Testimonials section (hidden until you add real testimonials)
- Contact form with client-side validation and an animated send state
- Custom cursor, scroll progress bar, Lenis smooth scroll, dark/light theme toggle, 404 page, error boundary
- `prefers-reduced-motion` respected throughout; keyboard focus states everywhere

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lenis (smooth scroll), React Router, React Icons. GSAP is installed and ready if you want to add scroll-triggered timeline animations beyond what Framer Motion covers.

## Project structure

```
src/
  components/
    layout/       Navbar, Footer, ErrorBoundary
    cursor/       CustomCursor
    ui/           MagneticButton, RevealText, ScrollProgress, ThemeToggle,
                  SectionHeading, CommandPalette, ProjectCard, StoryRail,
                  AmbientBackground, ConfirmationBadge
    sections/     Hero, About, Journey, CurrentFocus, Skills, Projects,
                  Experience, IndustryEngagement, Hackathons, Achievements,
                  ProofOfGrowth, GithubSection, Blog, Testimonials, Contact
  pages/          Home, ProjectDetail, NotFound
  hooks/          useSmoothScroll, useTheme, useCountUp, useMousePosition,
                  useGithubStats (live GitHub API + real contribution calendar)
  data/           projects.ts, skills.ts, certificates.ts, experience.ts,
                  industryEngagement.ts, hackathons.ts, events.ts,
                  timeline.ts, currentFocus.ts, blog.ts, testimonials.ts
  constants/      social.ts, github.ts
  App.tsx, main.tsx, index.css
public/
  favicon.svg, site.webmanifest, robots.txt, sitemap.xml, _redirects
  resume.pdf      the real uploaded resume
  certificates/   32 real certificate images, sourced from Yuvraj's uploads
  projects/       add project screenshots here (project-slug.jpg) — none yet
```

Every project, skill, certificate, experience entry, industry engagement, hackathon, event, timeline step, and blog post lives in `src/data/*.ts`. No component needs to change when content is added — just extend the relevant array.

## Verification model

Rather than a single "verified" flag, entries use whichever of these fits:
- **No badge** — backed by an official certificate or the resume itself
- **"User Confirmed"** (cyan badge) — no certificate exists, but Yuvraj confirmed it directly; used for StadiumSense AI and the KSP Datathon, since a project doesn't need a certificate to be legitimate
- **"Needs Confirmation"** (dim badge) — genuinely unconfirmed; used consistently everywhere via `components/ui/ConfirmationBadge.tsx`

## Entries still pending confirmation
- **SEMS** (`data/experience.ts`) — no supporting document found yet.
- **HackLabify** (`data/hackathons.ts`) — no supporting document found yet.
- A handful of certificates found in the uploads but not on the resume (Venture Capital simulation, Communication Skills, Gen AI 101, Skill Nation workshop, Skillo AI Revolution workshop, NPTEL, Samsung Solve for Tomorrow, CampusCrew) — flagged with a note in `data/certificates.ts` in case you don't want all of them public.
- `your-domain.com` placeholders in `sitemap.xml`, `robots.txt`, and the canonical tag — update once deployed.

## Setup — run this locally on Windows (PowerShell)

You'll need Node.js 18+ installed first (https://nodejs.org).

```powershell
cd portfolio
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Before you ship it

1. Add your real links in `src/constants/social.ts` (GitHub, LinkedIn, email) and `src/constants/github.ts` (your GitHub username — this powers the live contribution grid and repo cards).
2. Add `public/resume.pdf` — your actual resume file.
3. Add project screenshots to `public/projects/<slug>.jpg` and reference them in `src/data/projects.ts` if you want images on the cards (currently text-first cards, image-ready).
4. Add certificate scans to `public/certificates/<id>.jpg` — already wired into `src/data/records.ts`.
5. Wire the contact form to a real backend — the form is fully validated and UI-complete, but currently simulates the send. Easiest options: Formspree, Resend, or EmailJS — swap the `setTimeout` in `src/components/sections/Contact.tsx`'s `handleSubmit` for a real `fetch` call.
6. Update `public/robots.txt` and `public/sitemap.xml` with your real deployed domain.
7. Replace the four project entries in `src/data/projects.ts` with your actual repos/links if `FlowFund`, `EcoWise AI`, `CareerGenie`, and `DeadlineGuardian AI` aren't the final names — adding a new project is just one more object in that array; it automatically shows up in the grid.

## Build for production

```powershell
npm run build
```

Output goes to `dist/`. Preview it locally with:

```powershell
npm run preview
```

## Deploying

**Vercel** (recommended — `vercel.json` is already included for SPA routing):
```powershell
npm install -g vercel
vercel
```

**Netlify** (`public/_redirects` is already included for SPA routing):
- Build command: `npm run build`
- Publish directory: `dist`

Both platforms auto-detect Vite projects if you just connect the GitHub repo instead — no extra config needed beyond what's already in this repo.

## Performance & accessibility notes

- Single bundle (~150KB gzipped) — fine for a portfolio this size. If you add heavy libraries (Three.js, Spline) later, lazy-load them with `React.lazy` per section.
- All animations respect `prefers-reduced-motion`.
- Focus states are visible everywhere (`:focus-visible` styled globally).
- Semantic headings throughout (`h1` in hero, `h2` per section, `h3` per card) for screen readers and SEO.
