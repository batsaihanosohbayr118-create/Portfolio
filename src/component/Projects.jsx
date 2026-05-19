import { motion as Motion } from "framer-motion";
import { useState } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import projects from "../data/project.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DEFAULT_CODE_URL = "https://github.com/batsaihanosohbayr118-create";

const cardVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.96 },
  show: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: (index % projects.length) * 0.08,
      ease: "easeOut",
    },
  }),
};

const getProjectTags = () =>
  projects.reduce((tags, project) => {
    project.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });

    return tags;
  }, ["All", "Favourites"]);

const Projects = ({ darkMode }) => {
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useLocalStorage("favourite", []);

  const allTags = getProjectTags();

  const filteredProjects =
    filter === "All"
      ? projects
      : filter === "Favourites"
        ? projects.filter((project) => favorites.includes(project.id))
        : projects.filter((project) => project.tags.includes(filter));

  const shouldAnimate = filteredProjects.length > 3;
  const carouselProjects = shouldAnimate
    ? [...filteredProjects, ...filteredProjects]
    : filteredProjects;
  const animationDuration = `${Math.max(filteredProjects.length * 4.5, 28)}s`;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (tag) => {
    setFilter(tag);
  };

  const renderProjectCard = (project, index) => {
    const isFavorite = favorites.includes(project.id);
    const codeUrl = project.codeUrl || project.githubUrl || DEFAULT_CODE_URL;
    const demoUrl = project.demoUrl || project.liveUrl || project.image;

    return (
      <Motion.div
        key={`${project.id}-${index}`}
        custom={index}
        variants={cardVariants}
        whileHover={{
          y: -10,
          scale: 1.02,
          boxShadow: darkMode
            ? "0 22px 45px rgba(249, 115, 22, 0.18)"
            : "0 22px 45px rgba(249, 115, 22, 0.22)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        style={{
          background: darkMode ? "#1f2937" : "#ffffff",
          borderColor: darkMode ? "#374151" : "#e5e7eb",
        }}
        className="group relative w-[300px] shrink-0 overflow-hidden rounded-xl border shadow-sm transition-all hover:border-orange-500/50 sm:w-[360px] lg:w-[390px]"
      >
        <Motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-orange-500 to-amber-400"
        />

        <Motion.button
          whileHover={{ scale: 1.18, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(project.id)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md transition-all"
          aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </Motion.button>

        <div className="h-48 overflow-hidden relative">
          <Motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="p-5">
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            {project.title}
          </h3>

          <p
            className="text-sm mb-4"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                  color: darkMode ? "#d1d5db" : "#4b5563",
                }}
                className="px-3 py-1 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-all font-semibold"
              style={{ color: darkMode ? "white" : "#374151" }}
            >
              <FaGithub /> Code
            </Motion.a>

            <Motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white text-sm rounded-lg transition-all font-semibold"
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
              }}
            >
              <FaExternalLinkAlt /> Demo
            </Motion.a>
          </div>
        </div>
      </Motion.div>
    );
  };

  return (
    <section
      id="projects"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="relative py-20 transition-colors duration-300 scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Motion.h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Projects
            </span>
          </Motion.h2>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-wrap justify-center gap-2 mt-6 mb-8"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                style={{
                  background:
                    filter === tag
                      ? "linear-gradient(to right, #f97316, #f59e0b)"
                      : darkMode
                        ? "#374151"
                        : "#e5e7eb",
                  color:
                    filter === tag ? "white" : darkMode ? "#d1d5db" : "#4b5563",
                }}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-sm active:scale-95"
              >
                {tag === "Favourites" ? `Favourites (${favorites.length})` : tag}
              </button>
            ))}
          </div>
        </div>

        <div className="project-carousel-mask -mx-4 overflow-hidden px-4 py-3">
          {filteredProjects.length > 0 ? (
            <Motion.div
              key={filter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.16 }}
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
          ) : (
            <p
              className="py-12 text-center text-sm"
              style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
            >
              No projects found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
