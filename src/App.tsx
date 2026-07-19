import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/cursor/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import StoryRail from "./components/ui/StoryRail";
import AmbientBackground from "./components/ui/AmbientBackground";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Home from "./pages/Home";

// Route-level code splitting — Home is the primary landing experience and
// stays in the main bundle; the less-visited routes load on demand.
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return <div className="min-h-screen" aria-hidden="true" />;
}

function App() {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Yuvraj Gora — Full Stack Developer & AI Builder";
    }
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="cursor-none-desktop">
        <AmbientBackground />
        <CustomCursor />
        <ScrollProgress />
        {location.pathname === "/" && <StoryRail />}
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
