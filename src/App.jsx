import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./component/About";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import IntroLoader from "./component/IntroLoader";
import Navbar from "./component/Navbar";
import Projects from "./component/Projects";
import Skills from "./component/Skills";

// Sub-pages load on demand so the home page ships less JavaScript
const AboutPage = lazy(() => import("./component/AboutPage"));
const ProjectPage = lazy(() => import("./component/ProjectPage"));

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

const App = () => {
  const location = useLocation();
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

  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0 });
    }
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#161412]">
      <AnimatePresence>
        {!isIntroDone && <IntroLoader key="intro" onFinish={handleIntroFinish} />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;