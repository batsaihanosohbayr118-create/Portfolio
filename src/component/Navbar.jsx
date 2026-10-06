import { AnimatePresence, motion as Motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { navControl } from "./navStyles";
import ThemePicker from "./ThemePicker";

const navIds = ["home", "about", "skills", "projects", "contact"];

const gradientButton = "bg-gradient-to-r from-pink-500 to-purple-500";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t, toggleLang } = useLanguage();
  const navItems = navIds.map((id) => ({ id, name: t.nav[id] }));

  const langToggle = (
    <button
      onClick={toggleLang}
      aria-label={t.nav.switchLang}
      title={t.nav.switchLang}
      className={`relative flex items-center p-1 text-xs font-bold ${navControl}`}
    >
      {["mn", "en"].map((code) => (
        <span
          key={code}
          className={`relative z-10 px-2.5 py-1 leading-none uppercase transition-colors ${
            lang === code ? "text-white" : "text-gray-400"
          }`}
        >
          {lang === code && (
            <Motion.span
              layoutId="lang-pill"
              className={`absolute inset-0 -z-10 rounded-full ${gradientButton}`}
            />
          )}
          {code}
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
    <div className="fixed top-0 left-0 w-full z-50">
      <Motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center justify-between bg-gradient-to-br from-gray-700 to-black backdrop-blur-lg px-4 sm:px-6 lg:px-12 py-3 shadow-lg"
      >
        <Motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-white">
              {t.nav.logo}<span className="text-pink-500">.</span>
            </span>
          </Link>
        </Motion.div>

        <div className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative cursor-pointer"
              >
                <Motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`font-medium transition-colors duration-300 ${
                    isActive ? "text-pink-400" : "text-gray-300 hover:text-pink-400"
                  }`}
                >
                  {item.name}
                </Motion.span>

                {isActive && (
                  <Motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${gradientButton}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <ThemePicker />
          {langToggle}

          <Motion.button
            onClick={() => handleNavClick("contact")}
            className={`hidden lg:inline-flex px-6 py-2 font-semibold rounded-full ${gradientButton} text-white shadow-md transition-transform active:scale-95`}
          >
            {t.nav.contact}
          </Motion.button>

          <Motion.button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`lg:hidden flex items-center justify-center w-9 ${navControl}`}
            aria-label={t.nav.toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Motion.button>
        </div>
      </Motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-2 lg:hidden bg-gray-900/95 border-gray-700 backdrop-blur-lg rounded-xl shadow-lg border"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-3 px-4 rounded-lg text-center cursor-pointer ${
                      isActive ? "bg-gray-800" : ""
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isActive ? "text-pink-400" : "text-gray-300"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick("contact")}
                className={`w-full py-3 px-4 text-center font-semibold rounded-lg cursor-pointer ${gradientButton} text-white shadow-md`}
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