import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import about from "../assets/contact.webp";
import projects from "../data/project.json";
import skills from "../data/skill.json";
import { useLanguage } from "../i18n/LanguageContext";

const stats = [
  { end: 2, duration: 2 },
  { end: skills.length, duration: 2.5 },
  { end: projects.length, duration: 3 },
];

const About = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const statsRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const statsElement = statsRef.current;
    if (!statsElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="overflow-hidden flex items-center justify-center px-4 sm:px-6 py-16 lg:py-20 scroll-mt-24"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <figure className="flex justify-center relative order-2 lg:order-1">
          <div className="relative w-75 h-75 lg:w-96 lg:h-96">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-80 blur-md"
              data-aos="zoom-in"
              data-aos-delay="600"
            />
            <img
              src={about}
              alt="about"
              className="relative w-full h-full object-cover object-bottom rounded-[1.75rem] ring-4 ring-white/90 shadow-2xl shadow-pink-500/40 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </figure>

        <article className="text-center lg:text-left relative order-1 lg:order-2">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t.about.title}
          </h1>

          <p
            className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 leading-relaxed p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm text-gray-300 bg-pink-900/10"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {t.about.body}
          </p>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 w-full max-w-md mb-6 sm:mb-8"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-400">
                  {animateStats ? (
                    <CountUp start={0} end={stat.end} duration={stat.duration} />
                  ) : (
                    0
                  )}
                  +
                </div>
                <div className="whitespace-nowrap text-gray-300">
                  {t.about.stats[i]}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="w-full sm:w-auto border-2 border-pink-500 inline-flex items-center justify-center py-2 px-4 sm:px-6 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent-1,#ec4899)_70%,transparent)] rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform text-white bg-pink-500/10"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {t.about.more}
          </Link>
        </article>
      </div>
    </section>
  );
};

export default About;