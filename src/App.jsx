import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./component/About";
import AboutPage from "./component/AboutPage";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Navbar from "./component/Navbar";
import Projects from "./component/Projects";
import Skills from "./component/Skills";

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0 });
    }
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
