import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";
import { assetPath } from "../utils/assetPath";

const DEFAULT_CODE_URL = "https://github.com/batsaihanosohbayr118-create";

const cardVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.96 },
  show: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: Math.min(index, 6) * 0.08,
      ease: "easeOut",
    },
  }),
};

// The most-used tags become filter chips.
const FILTER_COUNT = 6;
const filterTags = Object.entries(
  projects.flatMap((p) => p.tags).reduce((counts, tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, FILTER_COUNT)
  .map(([tag]) => tag);

const Projects = () => {
  const { lang, t } = useLanguage();
  const [activeTag, setActiveTag] = useState(null);

  const visibleProjects = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;
  const shouldAnimate = !activeTag && visibleProjects.length > 3;
  const carouselProjects = shouldAnimate
    ? [...visibleProjects, ...visibleProjects]
    : visibleProjects;
  const animationDuration = `${Math.max(visibleProjects.length * 4.5, 28)}s`;

  const renderProjectCard = (project, index) => {
    const title = localized(project, "title", lang);
    const codeUrl = project.codeUrl || project.githubUrl || DEFAULT_CODE_URL;
    const demoUrl = project.demoUrl || project.liveUrl || assetPath(project.image);

    return (
      <Motion.div
        key={`${project.id}-${index}`}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{
          y: -10,
          scale: 1.02,
          boxShadow: "0 22px 45px rgba(236, 72, 153, 0.18)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        style={{
          background: "#1f2937",
          borderColor: "#374151",
        }}
        className="group relative w-[300px] shrink-0 overflow-hidden rounded-xl border shadow-sm transition-all hover:border-pink-500/50 sm:w-[360px] lg:w-[390px]"
      >
        <Motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-pink-500 to-purple-400"
        />

        <div className="h-48 overflow-hidden relative">
          <Motion.img
            src={assetPath(project.image)}
            alt={title}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-2" style={{ color: "white" }}>
            {title}
          </h3>

          <p className="text-sm mb-4" style={{ color: "#d1d5db" }}>
            {localized(project, "description", lang)}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                }}
                className="px-3 py-1 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/projects/${project.id}`}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400 transition-colors hover:text-pink-300"
          >
            {t.projects.details}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex flex-col sm:flex-row gap-3">
            <Motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-all font-semibold"
              style={{ color: "white" }}
            >
              <FaGithub /> {t.projects.code}
            </Motion.a>

            <Motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white text-sm rounded-lg transition-all font-semibold"
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              }}
            >
              <FaExternalLinkAlt /> {t.projects.demo}
            </Motion.a>
          </div>
        </div>
      </Motion.div>
    );
  };

  return (
    <section
      id="projects"
      style={{ backgroundColor: "#111827" }}
      className="relative pt-10 pb-20 transition-colors duration-300 scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Motion.h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "white" }}
          >
            {t.projects.titleA}{" "}
            <span
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.projects.titleB}
            </span>
          </Motion.h2>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {[null, ...filterTags].map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag ?? "all"}
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? "text-white" : "bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <Motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{tag ?? t.projects.all}</span>
              </button>
            );
          })}
        </div>

        {visibleProjects.length === 0 && (
          <p className="text-center text-gray-400">{t.projects.empty}</p>
        )}

        <div className="project-carousel-mask -mx-4 overflow-hidden px-4 py-3">
          <Motion.div
            key={activeTag ?? "all"}
            className={`flex gap-6 ${
              shouldAnimate
                ? "project-marquee-track w-max animate-project-flow"
                : "mx-auto flex-wrap justify-center"
            }`}
            style={
              shouldAnimate
                ? { "--project-flow-duration": animationDuration }
                : undefined
            }
          >
            {carouselProjects.map(renderProjectCard)}
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;