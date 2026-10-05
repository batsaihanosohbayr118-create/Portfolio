import { motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";
import { assetPath } from "../utils/assetPath";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const index = projects.findIndex((p) => String(p.id) === id);
  const project = projects[index];

  const backToProjects = () => navigate("/", { state: { scrollTo: "projects" } });

  if (!project) {
    return (
      <section className="min-h-[60vh] pt-32 pb-20 px-4 text-center">
        <p className="text-gray-300 mb-6">{t.projectPage.notFound}</p>
        <button
          onClick={backToProjects}
          className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.projectPage.back}
        </button>
      </section>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const title = localized(project, "title", lang);
  const features = localized(project, "features", lang) ?? [];

  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={backToProjects}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.projectPage.back}
        </button>

        <Motion.div key={project.id} initial="hidden" animate="show">
          <Motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
          >
            {title}
          </Motion.h1>

          <Motion.div
            variants={fadeUp}
            custom={0.1}
            className="relative mb-10 rounded-2xl p-[2px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-2xl shadow-pink-500/20"
          >
            <img
              src={assetPath(project.image)}
              alt={title}
              className="w-full rounded-[14px] object-cover aspect-video bg-gray-800"
            />
          </Motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            <Motion.div variants={fadeUp} custom={0.2}>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                {localized(project, "description", lang)}
              </p>

              {features.length > 0 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    {t.projectPage.features}
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-pink-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Motion.div>

            <Motion.aside
              variants={fadeUp}
              custom={0.3}
              className="h-fit rounded-2xl border-2 p-6 lg:sticky lg:top-24"
              style={{ background: "linear-gradient(to bottom right, #1f2937, #111827)", borderColor: "#374151" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {t.projectPage.stack}
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full font-medium bg-gray-700 text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 transition-all hover:shadow-[0_0_25px_rgb(236,72,153,0.5)]"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    {t.projectPage.demo}
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub />
                    {t.projectPage.code}
                  </a>
                )}
              </div>
            </Motion.aside>
          </div>
        </Motion.div>

        <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { project: prev, label: t.projectPage.prev, isNext: false },
            { project: next, label: t.projectPage.next, isNext: true },
          ].map(({ project: target, label, isNext }) => (
            <Link
              key={label}
              to={`/projects/${target.id}`}
              className={`group rounded-xl border-2 p-5 text-center transition-colors hover:border-pink-500/60 ${isNext ? "sm:text-right" : "sm:text-left"}`}
              style={{ background: "#1f2937", borderColor: "#374151" }}
            >
              <span
                className={`flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-1 justify-center ${
                  isNext ? "sm:justify-end" : "sm:justify-start"
                }`}
              >
                {!isNext && <ArrowLeft className="w-3.5 h-3.5" />}
                {label}
                {isNext && <ArrowRight className="w-3.5 h-3.5" />}
              </span>
              <span className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                {localized(target, "title", lang)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ProjectPage;
