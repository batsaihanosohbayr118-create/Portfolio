import { motion as Motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };
const ease = [0.76, 0, 0.24, 1];

const curtain = {
  idle: { y: "100%", transition: { duration: 0 } },
  cover: { y: "0%", transition: { duration: 0.6, ease } },
  reveal: { y: "-100%", transition: { duration: 0.7, ease, delay: 0.2 } },
};

const caption = {
  idle: { opacity: 0, y: 30 },
  cover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.25 } },
  reveal: { opacity: 0, y: -30, transition: { duration: 0.35, ease: "easeIn" } },
};

// On a path change a dark curtain rises over the page, the new route swaps in
// behind it (scrolled to top), then the curtain lifts away. Renders
// children(displayLocation) so the old page stays until it is covered.
const PageTransition = ({ children, onCover }) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { lang, t } = useLanguage();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("idle");

  const pathChanged = location.pathname !== displayLocation.pathname;
  if (!pathChanged && location !== displayLocation) setDisplayLocation(location);
  if (pathChanged && reduceMotion) setDisplayLocation(location);
  if (pathChanged && !reduceMotion && phase === "idle") setPhase("cover");

  useEffect(() => {
    if (phase === "cover") onCover?.(location.pathname);
  }, [phase, location.pathname, onCover]);

  const handleComplete = (done) => {
    if (done === "cover") {
      setDisplayLocation(location);
      setPhase("reveal");
    } else if (done === "reveal") {
      setPhase("idle");
    }
  };

  const projectId = location.pathname.match(/^\/projects\/(.+)/)?.[1];
  const project = projectId && projects.find((p) => String(p.id) === projectId);
  const label = project
    ? localized(project, "title", lang)
    : location.pathname === "/about"
      ? t.nav.about
      : t.nav.home;

  return (
    <>
      {children(displayLocation)}

      <Motion.div
        aria-hidden="true"
        initial="idle"
        animate={phase}
        variants={curtain}
        onAnimationComplete={handleComplete}
        className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-[#161412] text-[#f3ece3]"
      >
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a8875a] to-transparent" />
        <Motion.div variants={caption} className="flex flex-col items-center gap-5 px-6 text-center">
          <span className="h-px w-14 bg-[#a8875a]" />
          <span className="text-5xl sm:text-7xl font-medium leading-none" style={serif}>
            {label}
            <span className="text-[#c9a46e]">.</span>
          </span>
        </Motion.div>
      </Motion.div>
    </>
  );
};

export default PageTransition;
