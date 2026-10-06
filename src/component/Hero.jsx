import { Eye, Mail } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import CV from "../assets/CV.pdf";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.png";
import Instagram from "../assets/instagram.svg";
import PortfolioImage from "../assets/portfolio.jpg";
import Tiktok from "../assets/tiktok.png";
import { useLanguage } from "../i18n/LanguageContext";

const CVPreviewModal = lazy(() => import("./CVPreviewModal"));

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

const Hero = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const { t } = useLanguage();

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewCV = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      window.open(CV, "_blank", "noopener,noreferrer");
      return;
    }
    setIsCvOpen(true);
  };

  return (
    <div className="relative overflow-visible flex flex-col">
      <div className="pointer-events-none absolute z-[70] -top-20 -left-20 h-64 w-64 bg-pink-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse hidden sm:block" />

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
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                </a>
              ))}
            </div>

            <h1
              className="title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold text-white"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {t.hero.title}
            </h1>

            <p
              className="mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg text-gray-300"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {t.hero.body}
            </p>

            <div
              className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <button
                onClick={handleViewCV}
                className="inline-flex items-center justify-center text-white bg-gradient-to-r from-pink-500 to-purple-500 py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent-1,#ec4899)_70%,transparent)]"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t.hero.viewCv}
              </button>

              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent-1,#ec4899)_70%,transparent)] text-white border-2 border-pink-500 hover:bg-pink-600"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t.hero.contact}
              </button>
            </div>
          </div>

          <div
            className="lg:w-1/2 w-full max-w-md lg:max-w-lg mt-8 lg:mt-0 flex justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-[300px] sm:w-[350px] lg:w-[400px]">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-80 blur-md" />
              <img
                src={PortfolioImage}
                alt="portfolio"
                className="relative w-full h-full rounded-full object-cover ring-4 ring-white/90 shadow-2xl shadow-pink-500/40 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

      </section>

      {isCvOpen && (
        <Suspense fallback={null}>
          <CVPreviewModal
            isOpen={isCvOpen}
            onClose={() => setIsCvOpen(false)}
            cvUrl={CV}
            fileName="Osohbayr-CV.pdf"
          />
        </Suspense>
      )}
    </div>
  );
};

export default Hero;