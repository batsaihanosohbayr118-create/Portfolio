import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./component/About";
import Contact from "./component/Contact";
import CustomCursor from "./component/CustomCursor";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import IntroLoader from "./component/IntroLoader";
import Navbar from "./component/Navbar";
import PageTransition from "./component/PageTransition";
import Projects from "./component/Projects";
import Skills from "./component/Skills";

// Sub-pages load on demand so the home page ships less JavaScript
const loadAboutPage = () => import("./component/AboutPage");
const loadProjectPage = () => import("./component/ProjectPage");
const AboutPage = lazy(loadAboutPage);
const ProjectPage = lazy(loadProjectPage);

// Start fetching the next page while the transition curtain is covering the screen
const preloadPage = (pathname) => {
  if (pathname === "/about") loadAboutPage();
  else if (pathname.startsWith("/projects/")) loadProjectPage();
};

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId) return;

    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

// Renders the route for the location PageTransition is currently showing
const RouteView = ({ location }) => {
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    AOS.refresh();
  }, [location.pathname]);

  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const handleIntroFinish = useCallback(() => setIsIntroDone(true), []);

  useEffect(() => {
    if (!isIntroDone) return;
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, [isIntroDone]);

  return (
    <div className="min-h-screen bg-[#161412]">
      <AnimatePresence>
        {!isIntroDone && <IntroLoader key="intro" onFinish={handleIntroFinish} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />

      <main>
        <PageTransition onCover={preloadPage}>{(location) => <RouteView location={location} />}</PageTransition>
      </main>

      <Footer />
    </div>
  );
};

export default App;