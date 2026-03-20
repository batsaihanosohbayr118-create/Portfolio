import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const lightColors = {
    navBg: "bg-gradient-to-br from-orange-200 to-white",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-800",
    textHover: "text-orange-500",
    textActive: "text-orange-600",
    indicator: "bg-gradient-to-r from-orange-500 to-amber-500",
    button: "bg-gradient-to-r from-orange-500 to-amber-500",
  };

  const darkColors = {
    navBg: "bg-gradient-to-br from-gray-700 to-black",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    textHover: "text-orange-400",
    textActive: "text-orange-400",
    indicator: "bg-gradient-to-r from-orange-500 to-amber-500",
    button: "bg-gradient-to-r from-orange-500 to-amber-500",
  };

  const colors = darkMode ? darkColors : lightColors;

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full flex items-center justify-between ${colors.navBg} backdrop-blur-lg px-6 lg:px-12 py-3 shadow-lg`}
      >
        {/* Logo */}
        <motion.a href="/" whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
          <span className={`text-xl font-bold ${colors.textPrimary}`}>
            Portfolio<span className="text-orange-500">.</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <a key={item.id} onClick={() => handleNavClick(item.id)} className="relative cursor-pointer">
              <motion.span
                className={`font-medium transition-colors duration-300 ${
                  activeSection === item.id ? colors.textActive : `${colors.textSecondary} hover:${colors.textHover}`
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.span>

              {activeSection === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${colors.indicator}`}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </motion.button>

          {/* Contact Button (Desktop) */}
          <motion.button
            onClick={() => handleNavClick("contact")}
            className={`hidden lg:inline-flex px-6 py-2 font-semibold rounded-full ${colors.button} text-white shadow-md transition-transform active:scale-95`}
          >
            Contact me
          </motion.button>

          {/* Menu Button (Mobile) */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            {isMenuOpen ? <X className={`w-5 h-5 ${colors.textPrimary}`} /> : <Menu className={`w-5 h-5 ${colors.textPrimary}`} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-full left-0 right-0 mt-2 lg:hidden ${darkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-lg rounded-xl shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-4 rounded-lg text-center cursor-pointer ${
                    activeSection === item.id ? (darkMode ? "bg-gray-800" : "bg-orange-50") : ""
                  }`}
                >
                  <span className={`font-medium ${activeSection === item.id ? colors.textActive : colors.textSecondary}`}>
                    {item.name}
                  </span>
                </div>
              ))}

              <div
                onClick={() => handleNavClick("contact")}
                className={`py-3 px-4 text-center font-semibold rounded-lg cursor-pointer ${colors.button} text-white shadow-md`}
              >
                Contact me
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
