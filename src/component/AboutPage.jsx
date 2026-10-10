import { ArrowLeft, ArrowRight, MapPin, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PortfolioImage from "../assets/hero-portrait.webp";
import projects from "../data/project.json";
import { useLanguage } from "../i18n/LanguageContext";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const sparkles = [
  { className: "-left-4 top-[18%] text-xl", delay: "0s" },
  { className: "-right-3 top-[8%] text-sm", delay: "1.2s" },
  { className: "-right-6 top-[46%] text-lg", delay: "2.1s" },
  { className: "-left-2 top-[62%] text-xs", delay: "0.7s" },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const goToContact = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  return (
    <section
      data-nav-tone="light"
      className="relative bg-[#f3ece3] text-[#1d1b18] pt-28 sm:pt-32 pb-20 lg:pb-28 px-5 sm:px-10 lg:px-14"
    >
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1d1b18]/60 hover:text-[#a8875a] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {t.aboutPage.back}
        </Link>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <figure className="lg:col-span-5 flex justify-center pt-12">
            <div className="relative w-60 sm:w-72 lg:w-full max-w-sm aspect-[4/5]">
              <div className="arch-drift absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-[#a8875a]/70" />
              <div className="arch-light arch-glow absolute -inset-3 rounded-t-full blur-2xl" aria-hidden="true" />
              <div className="arch-light relative h-full w-full rounded-t-full p-[2px]">
                <div className="h-full w-full rounded-t-full bg-[radial-gradient(ellipse_at_50%_42%,#c9a46e_0%,#7a5c33_30%,#2a221a_62%,#161412_90%)]" />
              </div>

              {sparkles.map((sparkle) => (
                <span
                  key={sparkle.className}
                  aria-hidden="true"
                  className={`portrait-sparkle absolute z-20 text-[#d9b97f] leading-none ${sparkle.className}`}
                  style={{ animationDelay: sparkle.delay }}
                >
                  ✦
                </span>
              ))}

              {/* Clipped only at the bottom, so the head and shoulders break out of the arch */}
              <div className="absolute inset-0 z-10 [clip-path:inset(-40%_-20%_0_-20%)]">
                <img
                  src={PortfolioImage}
                  alt={t.aboutPage.name}
                  width="713"
                  height="1385"
                  className="portrait-alive absolute left-1/2 -translate-x-1/2 -top-[13%] w-full max-w-none drop-shadow-[0_0_22px_rgba(243,220,174,0.45)]"
                />
              </div>
            </div>
          </figure>

          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium leading-none" style={serif}>
              {t.aboutPage.name}
              <span className="text-[#a8875a]">.</span>
            </h1>
            <span className="mx-auto lg:mx-0 my-8 block h-px w-14 bg-[#a8875a]" />

            <p className="text-base sm:text-lg leading-relaxed text-[#1d1b18]/75 mb-5">{t.aboutPage.p1}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[#1d1b18]/75">{t.aboutPage.p2}</p>

            <ul className="mt-10 border-t border-[#1d1b18]/10 text-left">
              {[
                { icon: <School className="w-4 h-4 shrink-0 text-[#a8875a]" />, text: t.aboutPage.school },
                { icon: <MapPin className="w-4 h-4 shrink-0 text-[#a8875a]" />, text: t.aboutPage.location },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-4 border-b border-[#1d1b18]/10 py-4">
                  {icon}
                  <span className="text-sm text-[#1d1b18]/80">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#161412] text-[#f3ece3] px-6 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-3xl sm:text-4xl font-medium leading-tight" style={serif}>
              {t.aboutPage.projectsDone(projects.length)}
            </p>
            <p className="mt-3 text-sm text-[#f3ece3]/60">{t.aboutPage.cta}</p>
          </div>

          <button
            onClick={goToContact}
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#f3ece3] px-8 py-4 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#1d1b18] btn-slide cursor-pointer"
          >
            {t.aboutPage.contact}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
