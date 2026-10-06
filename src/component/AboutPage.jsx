import { ArrowLeft, Mail, MapPin, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PortfolioImage from "../assets/portfolio.jpg";
import projects from "../data/project.json";
import skills from "../data/skill.json";
import { useLanguage } from "../i18n/LanguageContext";
import SkillIcon from "./SkillIcon";

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const goToContact = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.aboutPage.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start mb-16">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-full lg:h-auto lg:aspect-square mx-auto lg:mx-0">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-80 blur-md" />
            <img
              src={PortfolioImage}
              alt={t.aboutPage.name}
              className="relative w-full h-full rounded-full object-cover ring-4 ring-white/90 shadow-2xl shadow-pink-500/40"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              {t.aboutPage.name}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
              {t.aboutPage.p1}
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {t.aboutPage.p2}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-pink-400" />
                {t.aboutPage.school}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                {t.aboutPage.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {t.aboutPage.skillsA}{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
              {t.aboutPage.skillsB}
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-xl border-2 p-4"
                style={{ background: "#1f2937", borderColor: "#374151" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <SkillIcon skill={skill} className="w-8 h-8" />
                    <span className="text-white font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-pink-400 font-bold text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="w-full rounded-full h-2 overflow-hidden"
                  style={{ backgroundColor: "#374151" }}
                >
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 p-6 sm:p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6" style={{ background: "linear-gradient(to right, #1f2937, #111827)", borderColor: "#374151" }}>
          <div className="mb-4 sm:mb-0">
            <p className="text-white font-semibold text-lg mb-1">
              {t.aboutPage.projectsDone(projects.length)}
            </p>
            <p className="text-gray-300 text-sm">
              {t.aboutPage.cta}
            </p>
          </div>

          <button
            onClick={goToContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <Mail className="w-5 h-5" />
            {t.aboutPage.contact}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;