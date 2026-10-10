import { AnimatePresence, motion as Motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LogoMark from "./LogoMark";
import { navControl } from "./navStyles";

const navIds = ["home", "about", "skills", "projects", "contact"];

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverLight, setIsOverLight] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t, toggleLang } = useLanguage();
  const navItems = navIds.map((id) => ({ id, name: t.nav[id] }));

  // Ink-on-cream while over a cream section (data-nav-tone="light"), dark glass elsewhere.
  useEffect(() => {
    const update = () => {
      const probe = 72; // bottom edge of the navbar
      const lightSections = document.querySelectorAll('[data-nav-tone="light"]');
      setIsOverLight(
        [...lightSections].some((el) => {
          // Layout offsets, not getBoundingClientRect: AOS fade-ins translate sections
          // without firing a scroll event, which would leave the tone stale.
          let top = -window.scrollY;
          for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
          return top <= probe && top + el.offsetHeight > probe;
        })
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  const isLight = isOverLight && !isMenuOpen;

  const langToggle = (
    <button
      onClick={toggleLang}
      aria-label={t.nav.switchLang}
      title={t.nav.switchLang}
      className={`flex h-9 items-center rounded-full p-1 text-sm cursor-pointer transition-colors duration-300 ${
        isLight ? "bg-[#1d1b18]/[0.06]" : "bg-[#f3ece3]/10"
      }`}
    >
      {["mn", "en"].map((code) => (
        <span
          key={code}
          className={`relative flex h-full items-center px-3.5 uppercase leading-none transition-colors duration-300 ${
            lang === code
              ? "font-bold text-[#1d1b18]"
              : isLight
                ? "text-[#1d1b18]/45"
                : "text-[#f3ece3]/50"
          }`}
        >
          {lang === code && (
            <Motion.span
              layoutId="lang-pill"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className={`absolute inset-0 rounded-full shadow-sm ${isLight ? "bg-white" : "bg-[#f3ece3]"}`}
            />
          )}
          <span className="relative">{code}</span>
        </span>
      ))}
    </button>
  );

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <div data-tone={isLight ? "light" : "dark"} className="group/nav fixed top-0 left-0 w-full z-50">
      <Motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full flex items-center justify-between px-5 sm:px-10 lg:px-14 py-3 lg:py-4 transition-colors duration-500 ${
          isLight
            ? "bg-[#f3ece3]/95 text-[#1d1b18] backdrop-blur-md border-b border-[#1d1b18]/10"
            : "bg-[#161412]/85 text-white backdrop-blur-lg border-b border-white/10 shadow-lg"
        }`}
      >
        {/* The monogram is the name's first letter, so the rest follows it directly */}
        <Link to="/" aria-label={t.nav.logo} className="group flex items-end" style={serif}>
          <LogoMark letter={t.nav.logo[0]} className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 -mr-1.5" />
          <span
            aria-hidden="true"
            className="bg-gradient-to-br from-[#d9b97f] via-[#a8875a] to-[#7a5c33] bg-clip-text pb-[0.3rem] sm:pb-[0.35rem] text-2xl sm:text-[1.8rem] font-medium leading-none tracking-wide text-transparent"
          >
            {t.nav.logo.slice(1)}.
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative py-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#a8875a]"
                    : isLight
                      ? "text-[#1d1b18]/70 hover:text-[#1d1b18]"
                      : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}

                {/* Hover underline grows out from the centre (the active item keeps its own indicator) */}
                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-[#a8875a] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                )}

                {isActive && (
                  <Motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-1/2 h-px w-6 -translate-x-1/2 bg-[#a8875a]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          {langToggle}

          <button
            onClick={() => handleNavClick("contact")}
            className={`hidden lg:inline-flex items-center px-6 py-2.5 rounded-full text-[0.75rem] font-semibold uppercase tracking-[0.14em] btn-slide cursor-pointer ${
              isLight
                ? "bg-[#1d1b18] text-[#f3ece3]"
                : "bg-[#f3ece3] text-[#1d1b18]"
            }`}
          >
            {t.nav.contact}
          </button>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`lg:hidden flex items-center justify-center w-9 ${navControl}`}
            aria-label={t.nav.toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-2 lg:hidden overflow-hidden rounded-2xl border border-white/10 bg-[#161412]/95 backdrop-blur-lg shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-3 px-4 rounded-lg text-center text-sm font-semibold uppercase tracking-[0.16em] cursor-pointer ${
                      isActive ? "bg-white/5 text-[#a8875a]" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick("contact")}
                className="w-full mt-2 py-3 px-4 rounded-full text-center text-sm font-semibold uppercase tracking-[0.14em] cursor-pointer bg-[#f3ece3] text-[#1d1b18]"
              >
                {t.nav.contact}
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
