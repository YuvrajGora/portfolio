import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Journey from "../components/sections/Journey";
import CurrentFocus from "../components/sections/CurrentFocus";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import IndustryEngagement from "../components/sections/IndustryEngagement";
import Hackathons from "../components/sections/Hackathons";
import Achievements from "../components/sections/Achievements";
import ProofOfGrowth from "../components/sections/ProofOfGrowth";
import GithubSection from "../components/sections/GithubSection";
import Blog from "../components/sections/Blog";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

// Order follows the approved story arc: who I am -> how I got here -> what
// I'm building now -> what I can do -> what I've built -> where I've worked
// -> how I test myself -> proof -> the code itself -> how I think -> contact.
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <CurrentFocus />
      <Skills />
      <Projects />
      <Experience />
      <IndustryEngagement />
      <Hackathons />
      <Achievements />
      <ProofOfGrowth />
      <GithubSection />
      <Blog />
      <Testimonials />
      <Contact />
    </>
  );
}
