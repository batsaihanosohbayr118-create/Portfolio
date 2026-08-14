import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com/batsaihanosohbayr118-create",
    label: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://www.linkedin.com/in/batsaihan-osohbayr-41b37240b",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://x.com/Osgoovz",
    label: "Twitter",
    icon: <FaTwitter />,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, #111827, #0d182e)",
        borderColor: "#243044",
      }}
      className="border-t"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-white">Портфолио</h3>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Full Stack хөгжүүлэгч & UI/UX дизайнер
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white bg-[#374151] text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm flex items-center justify-end gap-1" style={{ color: "#9ca3af" }}>
              © {currentYear} Бүх эрх хуулиар хамгаалагдсан —
              <span className="text-[#f97316]">Хөгжүүлэгч</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
