import { useEffect, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import About from "./component/About";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Contact from "./component/Contact";
import Footer from "./component/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100
    });

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900'
        : 'bg-linear-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Dark Light mode*/}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      
      <main>
        <Hero darkMode={darkMode}/>
        <About darkMode={darkMode}/>
        <Skills darkMode={darkMode}/>
        <Projects darkMode={darkMode}/>
        <Contact darkMode={darkMode}/>
      </main>

      <Footer darkMode={darkMode}/>
    </div>
  );
};

export default App;