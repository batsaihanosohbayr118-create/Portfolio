import { AnimatePresence, motion as Motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Нүүр", id: "home" },
  { name: "Миний тухай", id: "about" },
  { name: "Ур чадвар", id: "skills" },
  { name: "Төслүүд", id: "projects" },
  { name: "Холбоо барих", id: "contact" },
];

const gradientButton = "bg-gradient-to-r from-orange-500 to-amber-500";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        className="w-full flex items-center justify-between bg-gradient-to-br from-gray-700 to-black backdrop-blur-lg px-6 lg:px-12 py-3 shadow-lg"
      >
        <Motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              Портфолио<span className="text-orange-500">.</span>
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
                    isActive ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
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
            onClick={() => handleNavClick("contact")}
            className={`hidden lg:inline-flex px-6 py-2 font-semibold rounded-full ${gradientButton} text-white shadow-md transition-transform active:scale-95`}
          >
            Холбоо барих
          </Motion.button>

          <Motion.button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg bg-gray-700"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
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
            className="absolute top-full left-0 right-0 mt-2 lg:hidden bg-gray-900/95 border-gray-700 backdrop-blur-lg rounded-xl shadow-lg border"
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
                        isActive ? "text-orange-400" : "text-gray-300"
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
                Холбоо барих
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
