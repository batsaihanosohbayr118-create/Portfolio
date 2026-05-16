import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import about from "../assets/about.png";

const stats = [
  { label: "Education", end: 3, duration: 2 },
  { label: "My Skills", end: 5, duration: 2.5 },
  { label: "Projects", end: 10, duration: 3 },
];

const About = ({ darkMode }) => {
  const [animateStats, setAnimateStats] = useState(false);
  const statsRef = useRef(null);

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
              className="absolute -inset-4 lg:-inset-20 bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#f59e0b] rotate-12 star-shape z-0"
              data-aos="zoom-in"
              data-aos-delay="600"
            />
            <img
              src={about}
              alt="about"
              className="absolute inset-0 w-full h-full object-cover z-10 transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </figure>

        <article className="text-center lg:text-left relative order-1 lg:order-2">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            About Me
          </h1>

          <p
            className={`text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 leading-relaxed p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm ${
              darkMode ? "text-gray-300 bg-orange-900/10" : "text-gray-700 bg-orange-900/5"
            }`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Hello, my name is Osokhbayr. I'm a responsible and motivated
            individual who values discipline and continuous self-development. I'm
            punctual, detail-oriented, and committed to delivering high-quality
            work. I'm always eager to learn new skills and take on new challenges
            in order to create long-term value.
          </p>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 w-full max-w-md mb-6 sm:mb-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center flex flex-col items-center"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400">
                  {animateStats ? (
                    <CountUp start={0} end={stat.end} duration={stat.duration} />
                  ) : (
                    0
                  )}
                  +
                </div>
                <div
                  className={`whitespace-nowrap ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <button
            className={`w-full sm:w-auto border-2 border-orange-500 inline-flex items-center justify-center py-2 px-4 sm:px-6 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)] rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform ${
              darkMode ? "text-white bg-orange-500/10" : "text-gray-800 bg-white/90"
            }`}
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Learn More
          </button>
        </article>
      </div>
    </section>
  );
};

export default About;
