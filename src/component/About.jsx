import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import about from "../assets/contact.webp";
import projects from "../data/project.json";
import skills from "../data/skill.json";
import { useLanguage } from "../i18n/LanguageContext";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

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
      className="relative overflow-hidden bg-[#161412] text-[#f3ece3] px-5 sm:px-10 lg:px-14 py-20 lg:py-28 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        <figure className="lg:col-span-5 flex justify-center" data-aos="fade-up" data-aos-delay="300">
          <div className="relative w-64 sm:w-72 lg:w-full max-w-sm aspect-[4/5]">
            <div className="arch-drift absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-[#a8875a]/70" />
            <div className="arch-light arch-glow absolute -inset-2 rounded-t-full blur-2xl" aria-hidden="true" />
            <div className="arch-light relative h-full w-full rounded-t-full p-[2px]">
              <div className="h-full w-full overflow-hidden rounded-t-full">
                <img
                  src={about}
                  alt="about"
                  className="arch-zoom w-full h-full object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </figure>

        <article className="lg:col-span-7 text-center lg:text-left">
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-none"
            style={serif}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {t.about.title}
          </h2>

          <span className="mx-auto lg:mx-0 my-7 block h-px w-14 bg-[#a8875a]" />

          <p
            className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg leading-relaxed text-[#f3ece3]/70"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {t.about.body}
          </p>

          <div
            ref={statsRef}
            className="mx-auto lg:mx-0 mt-10 grid grid-cols-3 max-w-lg border-y border-[#f3ece3]/10 divide-x divide-[#f3ece3]/10"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {stats.map((stat, i) => (
              <div key={i} className="py-6 flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-medium leading-none lining-nums text-[#c9a46e]" style={serif}>
                  {animateStats ? <CountUp start={0} end={stat.end} duration={stat.duration} /> : 0}+
                </div>
                <div className="mt-3 whitespace-nowrap text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#f3ece3]/55">
                  {t.about.stats[i]}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full border border-[#a8875a] px-7 py-3 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#c9a46e] btn-slide [--slide-fg:#161412]"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {t.about.more}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </article>
      </div>
    </section>
  );
};

export default About;