import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";
import { assetPath } from "../utils/assetPath";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const MAX_TAGS = 4;
const tagClass = "text-[0.62rem] font-semibold uppercase tracking-[0.16em]";

const Projects = () => {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState(0);

  const activeProject = projects[active];
  const step = (delta) => setActive((current) => (current + delta + projects.length) % projects.length);

  return (
    <section
      id="projects"
      className="relative bg-[#161412] text-[#f3ece3] px-5 sm:px-10 lg:px-14 py-20 lg:py-28 scroll-mt-16"
    >
      <Motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-5xl sm:text-6xl lg:text-7xl font-medium leading-none"
        style={serif}
      >
        {t.projects.titleA} <em className="text-[#c9a46e]">{t.projects.titleB}</em>
      </Motion.h2>
      <span className="mx-auto mt-7 mb-14 lg:mb-20 block h-px w-14 bg-[#a8875a]" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 items-start">
        <ol className="border-t border-[#f3ece3]/10">
          {projects.map((project, index) => {
            const isActive = index === active;

            return (
              <Motion.li
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05 }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative"
              >
                <Link
                  to={`/projects/${project.id}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`group relative grid grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[3rem_minmax(0,1fr)_12rem_auto] items-center gap-4 sm:gap-6 px-2 sm:px-4 py-6 border-b transition-colors duration-500 ${
                    isActive
                      ? "lg:border-[#a8875a]/70 lg:bg-[linear-gradient(90deg,rgba(168,135,90,0.14),rgba(168,135,90,0.04)_60%,transparent)] lg:shadow-[0_0_40px_-12px_rgba(201,164,110,0.45)] border-[#f3ece3]/10"
                      : "border-[#f3ece3]/10"
                  }`}
                >
                  {/* Gold top edge + bridge to the preview card for the active row */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-px left-0 hidden lg:block h-px w-full bg-[#a8875a]/70 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 -right-10 hidden lg:block h-px w-10 bg-gradient-to-r from-[#a8875a] to-[#a8875a]/0 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span className="hidden sm:block text-xl lining-nums text-[#a8875a]" style={serif}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={assetPath(project.image)}
                    alt=""
                    className="sm:hidden w-20 aspect-[4/3] rounded-md object-cover object-top"
                  />

                  <div className="min-w-0">
                    <h3
                      className={`text-2xl sm:text-4xl font-medium leading-tight transition-colors duration-300 ${
                        isActive ? "lg:text-[#f3ece3]" : "lg:text-[#f3ece3]/80"
                      }`}
                      style={serif}
                    >
                      {localized(project, "title", lang)}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-[#f3ece3]/50">
                      {localized(project, "description", lang)}
                    </p>
                  </div>

                  <ul className={`hidden md:flex flex-wrap gap-x-4 gap-y-1.5 text-[#f3ece3]/55 ${tagClass}`}>
                    {project.tags.slice(0, MAX_TAGS).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <span
                    className={`flex w-10 h-10 sm:w-11 sm:h-11 shrink-0 items-center justify-center rounded-full border text-[#c9a46e] transition-colors duration-300 group-hover:bg-[#a8875a] group-hover:text-[#161412] ${
                      isActive ? "border-[#a8875a]" : "border-[#a8875a]/40"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    <span className="sr-only">{t.projects.details}</span>
                  </span>
                </Link>
              </Motion.li>
            );
          })}
        </ol>

        {/* Preview card follows the hovered row and stays in view while the list scrolls */}
        <aside className="hidden lg:block sticky top-28 overflow-hidden rounded-xl border border-[#a8875a]/60 bg-[#1d1a17] shadow-[0_0_50px_-15px_rgba(201,164,110,0.35)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0f0e0c]">
            <AnimatePresence initial={false}>
              <Motion.img
                key={activeProject.id}
                src={assetPath(activeProject.image)}
                alt=""
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1d1a17]/80 to-transparent" />

            <div className="absolute right-3 bottom-3 flex items-center gap-2 text-xs lining-nums text-[#f3ece3]/80">
              <span className="mr-1">
                {active + 1} / {projects.length}
              </span>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t.projectPage.prev}
                className="flex w-7 h-7 items-center justify-center rounded-full border border-[#a8875a]/60 bg-[#161412]/60 text-[#c9a46e] transition-colors hover:bg-[#a8875a] hover:text-[#161412] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t.projectPage.next}
                className="flex w-7 h-7 items-center justify-center rounded-full border border-[#a8875a]/60 bg-[#161412]/60 text-[#c9a46e] transition-colors hover:bg-[#a8875a] hover:text-[#161412] cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <Motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-6"
            >
              <h3 className="text-3xl font-medium leading-tight" style={serif}>
                {localized(activeProject, "title", lang)}
              </h3>
              <ul className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[#f3ece3]/55 ${tagClass}`}>
                {activeProject.tags.slice(0, MAX_TAGS).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#f3ece3]/65">
                {localized(activeProject, "description", lang)}
              </p>

              <div className="mt-6 flex items-center gap-6">
                <Link
                  to={`/projects/${activeProject.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#a8875a] px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#c9a46e] transition-colors hover:bg-[#a8875a] hover:text-[#161412]"
                >
                  {t.projects.view}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                </Link>
                {activeProject.codeUrl && (
                  <a
                    href={activeProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#f3ece3]/75 transition-colors hover:text-[#c9a46e]"
                  >
                    {t.projectPage.code}
                    <FaGithub className="w-4 h-4 text-[#c9a46e]" />
                  </a>
                )}
              </div>
            </Motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
};

export default Projects;
