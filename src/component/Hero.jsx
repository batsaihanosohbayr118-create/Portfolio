import { useReducedMotion } from "framer-motion";
import { Eye, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { lazy, Suspense, useState } from "react";
import CV from "../assets/CV.pdf";
import HeroImage from "../assets/hero-portrait.webp";
import { useLanguage } from "../i18n/LanguageContext";

const CVPreviewModal = lazy(() => import("./CVPreviewModal"));

const socialIcons = [
  {
    icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "GitHub",
    link: "https://github.com/batsaihanosohbayr118-create",
    className: "bg-[#1d1b18]",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/batsaihan-osohbayr-41b37240b",
    className: "bg-[#0a66c2]",
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Email",
    link: "mailto:batsaihanosohbayr118@gmail.com",
    className: "bg-[#b08d5c]",
  },
];

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const Badge = () => (
  <div className="relative h-32 w-32 text-[#a8875a]" aria-hidden="true">
    <svg viewBox="0 0 120 120" className="h-full w-full motion-safe:animate-[spin_28s_linear_infinite]">
      <defs>
        <path id="hero-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text className="fill-current text-[8.5px] uppercase">
        {/* textLength = circle circumference (2π·46 ≈ 289) minus a small gap before the start */}
        <textPath href="#hero-badge-circle" textLength="281" lengthAdjust="spacing">
          Usukhbayar ✦ Fullstack Developer ✦
        </textPath>
      </text>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center text-5xl" style={serif}>
      U
    </span>
  </div>
);

const Hero = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

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
    <div className="relative flex flex-col">
      <section
        id="home"
        data-nav-tone="light"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font relative"
      >
        <div
          className="relative overflow-hidden text-[#1d1b18] pt-16 lg:pt-20 lg:h-svh lg:min-h-[680px]"
          style={{
            background:
              "radial-gradient(120% 80% at 15% 20%, #f8f3ec 0%, transparent 60%), radial-gradient(90% 70% at 85% 75%, #f6efe6 0%, transparent 55%), linear-gradient(135deg, #efe6da 0%, #f3ece3 45%, #e9dfd2 100%)",
          }}
        >
          {/* Wordmark */}
          <div className="relative z-0 px-3 sm:px-8 lg:px-12 mt-6 sm:mt-8">
            <svg viewBox="0 0 1000 150" className="relative block w-full mx-auto max-w-[175svh]" aria-hidden="true">
              <clipPath id="hero-name-clip">
                <rect width="1000" height="150" />
              </clipPath>
              {/* Ink fill with a gold band that sweeps across the name, then rests */}
              <linearGradient
                id="hero-name-shimmer"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                gradientTransform="translate(-700 0)"
              >
                <stop offset="0" stopColor="#1d1b18" />
                <stop offset="0.4" stopColor="#1d1b18" />
                <stop offset="0.47" stopColor="#a8875a" />
                <stop offset="0.5" stopColor="#e2c48f" />
                <stop offset="0.53" stopColor="#a8875a" />
                <stop offset="0.6" stopColor="#1d1b18" />
                <stop offset="1" stopColor="#1d1b18" />
                {!reduceMotion && (
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-700 0; 700 0; 700 0"
                    keyTimes="0; 0.55; 1"
                    calcMode="spline"
                    keySplines="0.45 0 0.25 1; 0 0 1 1"
                    dur="6s"
                    begin="2.6s"
                    repeatCount="indefinite"
                  />
                )}
              </linearGradient>
              <g clipPath="url(#hero-name-clip)">
                <text
                  className="hero-name"
                  x="0"
                  y="141"
                  textLength="1000"
                  lengthAdjust="spacingAndGlyphs"
                  fontSize="214"
                  fontWeight="500"
                  fill={reduceMotion ? "currentColor" : "url(#hero-name-shimmer)"}
                  style={serif}
                >
                  {t.aboutPage.name.toUpperCase()}
                </text>
              </g>
            </svg>
            <img
              src={HeroImage}
              alt="Usukhbayar"
              width="713"
              height="1385"
              fetchPriority="high"
              className="hero-portrait hidden lg:block pointer-events-none absolute z-10 left-[59%] -translate-x-1/2 top-[38%] h-[115svh] w-auto max-w-none drop-shadow-[0_25px_35px_rgba(60,40,20,0.18)]"
            />
          </div>

          {/* Portrait: stands in front of the wordmark, cropped by the card edge */}
          <div className="relative z-10 -mt-[12vw] h-[440px] sm:h-[600px] lg:hidden pointer-events-none">
            <img
              src={HeroImage}
              alt=""
              width="713"
              height="1385"
              className="hero-portrait absolute left-1/2 -translate-x-1/2 top-0 h-[180%] w-auto max-w-none drop-shadow-[0_25px_35px_rgba(60,40,20,0.18)]"
            />
          </div>

          {/* Copy */}
          <div className="relative z-20 -mt-24 lg:mt-6 xl:mt-10 px-6 sm:px-10 lg:px-14 pt-16 lg:pt-0 pb-10 lg:pb-0 lg:max-w-[38%] xl:max-w-[35%] bg-gradient-to-b from-transparent via-[#f1e9de] via-25% to-[#f1e9de] lg:bg-none">
            {/* Title stays for screen readers and search engines; socials take its place visually */}
            <h1 className="sr-only">{t.hero.title}</h1>

            <div className="flex items-center gap-4 sm:gap-5" data-aos="fade-up" data-aos-delay="500">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target={social.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex w-10 h-10 sm:w-11 sm:h-11 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 hover:scale-110 ${social.className}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <span className="my-5 xl:my-6 block h-px w-14 bg-[#a8875a]" />

            <p
              className="max-w-sm text-sm sm:text-[0.95rem] leading-relaxed text-[#3d3934]"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {t.hero.body}
            </p>

            <div
              className="mt-7 xl:mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <button
                onClick={handleViewCV}
                className="inline-flex items-center justify-center rounded-full bg-[#1d1b18] px-5 py-3 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#f3ece3] btn-slide"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t.hero.viewCv}
              </button>

              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center rounded-full border border-[#a8875a] px-5 py-3 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#8a6c40] btn-slide"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t.hero.contact}
              </button>
            </div>
          </div>

          <div className="absolute right-14 bottom-12 z-20 hidden lg:block">
            <Badge />
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
