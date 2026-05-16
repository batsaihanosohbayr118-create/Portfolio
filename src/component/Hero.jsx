import { DownloadIcon, Mail } from "lucide-react";
import CV from "../assets/CV.png";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.png";
import Hi from "../assets/hi.png";
import Instagram from "../assets/instagram.svg";
import PortfolioImage from "../assets/portfolio.png";
import Tiktok from "../assets/tiktok.png";

const socialIcons = [
  { icon: Instagram, alt: "Instagram", link: "https://www.instagram.com/osgoo_b" },
  { icon: Tiktok, alt: "Tiktok", link: "https://www.tiktok.com/@osgoo_b" },
  {
    icon: Github,
    alt: "Github",
    link: "https://github.com/batsaihanosohbayr118-create",
  },
  { icon: Facebook, alt: "Facebook", link: "https://www.facebook.com/osgoo.b" },
];

const themes = {
  dark: {
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    buttonSecondary: "text-white border-2 border-orange-500 hover:bg-orange-600",
    decorativeCircle: "bg-orange-500 opacity-10",
  },
  light: {
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    buttonSecondary:
      "text-gray-800 border-2 border-orange-500 hover:bg-orange-500 hover:text-white",
    decorativeCircle: "bg-orange-400 opacity-20",
  },
};

const Hero = ({ darkMode }) => {
  const theme = darkMode ? themes.dark : themes.light;

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-visible flex flex-col">
      <div
        className={`pointer-events-none absolute z-[70] -top-20 -left-20 h-64 w-64 ${theme.decorativeCircle} rounded-full mix-blend-multiply filter blur-3xl animate-pulse hidden sm:block`}
      />

      <section
        id="home"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 lg:pt-24 lg:pb-16"
      >
        <div className="container mx-auto flex px-4 sm:px-8 lg:px-14 flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
            <div className="relative z-[60] flex justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-7 w-full">
              {socialIcons.map((social, index) => (
                <a
                  key={social.alt}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos-delay={`${400 + index * 100}`}
                  className="relative z-[60] transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className={`w-8 h-8 sm:w-10 sm:h-10 object-contain ${
                      darkMode ? "" : "filter brightness-75"
                    }`}
                  />
                </a>
              ))}
            </div>

            <h1
              className={`title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold ${theme.textPrimary}`}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Hi, I'm Developer
            </h1>

            <p
              className={`mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg ${theme.textSecondary}`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              My name is Osokhbayr. I am responsible and punctual, and I value
              continuous self-development. I adapt quickly to new environments and
              work effectively both independently and as part of a team.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <a
                href={CV}
                download
                className="inline-flex items-center justify-center text-white bg-gradient-to-r from-orange-500 to-amber-500 py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)]"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download CV
              </a>

              <button
                onClick={handleScrollToContact}
                className={`inline-flex items-center justify-center py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)] ${theme.buttonSecondary}`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </button>
            </div>
          </div>

          <div
            className="lg:w-1/2 w-full max-w-md lg:max-w-lg mt-8 lg:mt-0 flex justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-[300px] sm:w-[350px] lg:w-[400px]">
              <img
                src={PortfolioImage}
                alt="portfolio"
                className="w-full h-full rounded-full object-cover transform hover:scale-105 transition-transform duration-500"
              />

              <img
                src={Hi}
                alt="hi"
                className="absolute -top-4 left-6 sm:left-16 w-16 h-16 sm:w-20 sm:h-20 object-contain animate-bounce opacity-90"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Hero;
