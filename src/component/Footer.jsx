import { motion as Motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LogoMark from "./LogoMark";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const footerNavIds = ["home", "about", "projects", "contact"];

const socialLinks = [
  {
    href: "https://www.instagram.com/osgoo_b",
    label: "Instagram",
    icon: <FaInstagram className="w-3.5 h-3.5" />,
  },
  {
    href: "https://www.facebook.com/osgoo.b",
    label: "Facebook",
    icon: <FaFacebookF className="w-3.5 h-3.5" />,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="bg-[#161412] text-[#f3ece3] px-5 sm:px-10 lg:px-14 pt-16 lg:pt-24 pb-10 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-10 pb-10 text-center lg:text-left">
          <div>
            {/* Same monogram + gradient name as the navbar logo, scaled up */}
            <Link
              to="/"
              aria-label={t.nav.logo}
              className="group inline-flex items-end text-4xl sm:text-5xl"
              style={serif}
            >
              <LogoMark letter={t.nav.logo[0]} className="w-[1.55em] h-[1.55em] shrink-0 -mr-[0.2em]" />
              <span
                aria-hidden="true"
                className="bg-gradient-to-br from-[#d9b97f] via-[#a8875a] to-[#7a5c33] bg-clip-text pb-[0.19em] font-medium leading-none tracking-wide text-transparent"
              >
                {t.nav.logo.slice(1)}.
              </span>
            </Link>
            <p className="mt-3 whitespace-nowrap text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.2em] text-[#f3ece3]">
              {t.footer.roles.join("  ·  ")}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 sm:gap-x-10 gap-y-3">
              {footerNavIds.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(id)}
                    className="text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.2em] text-[#f3ece3]/90 transition-colors hover:text-[#c9a46e] cursor-pointer"
                  >
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex justify-center lg:justify-end gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[#a8875a]/80 text-[#c9a46e] transition-colors duration-300 hover:bg-[#a8875a] hover:text-[#161412]"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider: draws in from the centre, then a gold glint keeps travelling along it */}
        <Motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-px overflow-hidden bg-gradient-to-r from-[#a8875a]/10 via-[#a8875a]/70 to-[#a8875a]/10"
        >
          <span className="footer-glint absolute inset-y-0 -left-1/4 w-1/4 bg-gradient-to-r from-transparent via-[#f3dcae] to-transparent" />
        </Motion.div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs tracking-wide text-[#f3ece3]/60">
            © {currentYear} {t.nav.logo}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.25em] text-[#f3ece3]/60">
            {t.footer.crafted}
            <span className="text-[#c9a46e] text-sm leading-none" aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
