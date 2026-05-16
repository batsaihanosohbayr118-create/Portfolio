import { AnimatePresence, motion as Motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const colorThemes = {
  dark: {
    navBg: "bg-gradient-to-br from-gray-700 to-black",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    textHover: "hover:text-orange-400",
    textActive: "text-orange-400",
    activeBg: "bg-gray-800",
  },
  light: {
    navBg: "bg-gradient-to-br from-orange-200 to-white",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-800",
    textHover: "hover:text-orange-500",
    textActive: "text-orange-600",
    activeBg: "bg-orange-50",
  },
};

const gradientButton = "bg-gradient-to-r from-orange-500 to-amber-500";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colors = darkMode ? colorThemes.dark : colorThemes.light;

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full flex items-center justify-between ${colors.navBg} backdrop-blur-lg px-6 lg:px-12 py-3 shadow-lg`}
      >
        <Motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <span className={`text-xl font-bold ${colors.textPrimary}`}>
            Portfolio<span className="text-orange-500">.</span>
          </span>
        </Motion.a>

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
                    isActive
                      ? colors.textActive
                      : `${colors.textSecondary} ${colors.textHover}`
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

        <div className="flex items-center space-x-2 lg:space-x-4">
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </Motion.button>

          <Motion.button
            onClick={() => handleNavClick("contact")}
            className={`hidden lg:inline-flex px-6 py-2 font-semibold rounded-full ${gradientButton} text-white shadow-md transition-transform active:scale-95`}
          >
            Contact me
          </Motion.button>

          <Motion.button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className={`w-5 h-5 ${colors.textPrimary}`} />
            ) : (
              <Menu className={`w-5 h-5 ${colors.textPrimary}`} />
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
            className={`absolute top-full left-0 right-0 mt-2 lg:hidden ${
              darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
            } backdrop-blur-lg rounded-xl shadow-lg border`}
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-3 px-4 rounded-lg text-center cursor-pointer ${
                      isActive ? colors.activeBg : ""
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isActive ? colors.textActive : colors.textSecondary
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
                Contact me
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
