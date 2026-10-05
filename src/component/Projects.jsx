import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";
import { assetPath } from "../utils/assetPath";

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

const Projects = () => {
  const { lang, t } = useLanguage();
  const shouldAnimate = projects.length > 3;
  const carouselProjects = shouldAnimate ? [...projects, ...projects] : projects;
  const animationDuration = `${Math.max(projects.length * 4.5, 28)}s`;

  const renderProjectCard = (project, index) => {
    const title = localized(project, "title", lang);

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
        className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:border-pink-500/50 sm:w-[360px] lg:w-[390px]"
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

        <div className="flex flex-1 flex-col p-5">
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
            className="mt-auto self-end inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400 transition-colors hover:text-pink-300"
          >
            {t.projects.details}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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

        <div className="project-carousel-mask -mx-4 overflow-hidden px-4 py-3">
          <Motion.div
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