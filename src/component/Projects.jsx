import { motion as Motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import projects from "../data/project.json";

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

const shouldAnimate = projects.length > 3;
const carouselProjects = shouldAnimate ? [...projects, ...projects] : projects;
const animationDuration = `${Math.max(projects.length * 4.5, 28)}s`;

const Projects = () => {
  const renderProjectCard = (project, index) => {
    const codeUrl = project.codeUrl || project.githubUrl || DEFAULT_CODE_URL;
    const demoUrl = project.demoUrl || project.liveUrl || project.image;

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
          boxShadow: "0 22px 45px rgba(249, 115, 22, 0.18)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        style={{
          background: "#1f2937",
          borderColor: "#374151",
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
          <h3 className="text-xl font-bold mb-2" style={{ color: "white" }}>
            {project.title}
          </h3>

          <p className="text-sm mb-4" style={{ color: "#d1d5db" }}>
            {project.description}
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
              <FaGithub /> Код
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
              <FaExternalLinkAlt /> Жишээ
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
        <div className="text-center mb-10">
          <Motion.h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "white" }}
          >
            Миний{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Төслүүд
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
