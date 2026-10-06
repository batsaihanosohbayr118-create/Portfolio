import { motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaApple, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
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

const pad = (n) => String(n).padStart(2, "0");

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
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
  const hasPoints = features.some((feature) => feature.points?.length);
  const notes = [
    { label: t.projectPage.highlights, items: localized(project, "highlights", lang) ?? [] },
    { label: t.projectPage.challenges, items: localized(project, "challenges", lang) ?? [] },
  ].filter(({ items }) => items.length > 0);
  const screenshots = project.screenshots ?? [];
  const media = [
    ...(project.video ? [{ type: "video", src: project.video }] : []),
    ...screenshots.map((src) => ({ type: "image", src })),
  ];
  const role = localized(project, "role", lang);
  const timeline = localized(project, "timeline", lang);
  const problem = localized(project, "problem", lang);
  const solution = localized(project, "solution", lang);
  const host = hostOf(project.demoUrl) ?? hostOf(project.codeUrl);

  return (
    <section className="relative overflow-hidden pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-[40%] -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={backToProjects}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur hover:border-pink-500/50 hover:text-white transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {t.projectPage.back}
        </button>

        <Motion.div key={project.id} initial="hidden" animate="show">
          {/* Preview (left) + info (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-center mb-16">
            <Motion.div variants={fadeUp} custom={0.1} className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-pink-500/25 via-purple-500/15 to-indigo-500/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                  {host && (
                    <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-4 py-1 text-xs font-mono text-gray-400">
                      {host}
                    </span>
                  )}
                </div>
                <img
                  src={assetPath(project.image)}
                  alt={title}
                  className="block w-full object-cover object-top aspect-video bg-gray-800"
                />
              </div>
            </Motion.div>

            <Motion.div variants={fadeUp} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-3 text-xs font-mono text-pink-400 mb-3">
                <span className="h-px w-8 bg-gradient-to-r from-pink-500 to-purple-500" />
                {pad(index + 1)} / {pad(projects.length)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                {title}
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">.</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {localized(project, "overview", lang) ?? localized(project, "description", lang)}
              </p>

              {(role || timeline) && (
                <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                  {[
                    { label: t.projectPage.role, value: role },
                    { label: t.projectPage.timeline, value: timeline },
                  ]
                    .filter(({ value }) => value)
                    .map(({ label, value }) => (
                      <div key={label}>
                        <dt className="inline text-gray-400">{label}: </dt>
                        <dd className="inline text-gray-200">{value}</dd>
                      </div>
                    ))}
                </dl>
              )}

              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
                {t.projectPage.stack}
              </h2>
              <div className="flex flex-wrap gap-2 mb-7">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full font-medium text-pink-200 border border-pink-500/30 bg-pink-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 transition-all hover:shadow-[0_0_25px_color-mix(in_srgb,var(--accent-1,#ec4899)_50%,transparent)]"
                  >
                    {t.projectPage.demo}
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    <FaApple className="w-4 h-4" />
                    {t.projectPage.appStore}
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    <FaGithub />
                    {t.projectPage.code}
                  </a>
                )}
              </div>
            </Motion.div>
          </div>

          {/* Problem / solution */}
          {(problem || solution) && (
            <Motion.div
              variants={fadeUp}
              custom={0.25}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
            >
              {[
                { label: t.projectPage.problem, text: problem },
                { label: t.projectPage.solution, text: solution },
              ]
                .filter(({ text }) => text)
                .map(({ label, text }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400 mb-3">
                      {label}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{text}</p>
                  </div>
                ))}
            </Motion.div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <Motion.div variants={fadeUp} custom={0.3}>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
                {t.projectPage.features}
              </h2>
              <ul
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${hasPoints ? "" : "lg:grid-cols-3"}`}
              >
                {features.map((feature, i) => {
                  // A feature is either a plain string or a { title, body, points? } object.
                  const heading = typeof feature === "string" ? null : feature.title;
                  const body = typeof feature === "string" ? feature : feature.body;
                  const points = feature.points ?? [];
                  return (
                    <li
                      key={heading ?? body}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-pink-500/40 hover:bg-white/[0.05]"
                    >
                      <span className="block font-mono text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
                        {pad(i + 1)}
                      </span>
                      {heading && <h3 className="font-semibold text-white mb-1">{heading}</h3>}
                      <p className="text-sm text-gray-200 leading-relaxed">{body}</p>
                      {points.length > 0 && (
                        <ul className="mt-4 pt-4 border-t border-white/10 space-y-2">
                          {points.map((point) => (
                            <li key={point} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pink-400" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Motion.div>
          )}

          {/* Mobile screenshots */}
          {media.length > 0 && (
            <Motion.div variants={fadeUp} custom={0.35} className="mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {t.projectPage.screenshots}
              </h2>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {media.map(({ type, src }, i) => (
                  <div key={src} className="relative w-[46%] sm:w-[30%] max-w-[260px]">
                    <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-indigo-500/20 blur-2xl" />
                    <div className="relative overflow-hidden rounded-[32px] border-[6px] border-gray-800 bg-gray-900 shadow-2xl ring-1 ring-white/10">
                      {type === "video" ? (
                        <video
                          src={assetPath(src)}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="block w-full aspect-[591/1280] object-cover bg-black"
                        />
                      ) : (
                        <img
                          src={assetPath(src)}
                          alt={`${title} — ${t.projectPage.screenshots} ${i + 1}`}
                          loading="lazy"
                          className="block w-full aspect-[591/1280] object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* Technical highlights, challenges & solutions */}
          {notes.map(({ label, items }) => (
            <Motion.div key={label} variants={fadeUp} custom={0.4} className="mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
                {label}
              </h2>
              <ul className="space-y-4">
                {items.map(({ title: heading, body }) => (
                  <li
                    key={heading}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 pl-6 transition-all duration-300 md:hover:translate-x-1 md:hover:border-pink-500/40 md:hover:shadow-[0_8px_30px_-12px_color-mix(in_srgb,var(--accent-1,#ec4899)_45%,transparent)]"
                  >
                    {/* Accent bar: thin at rest, widens and brightens on hover */}
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-pink-500/70 to-purple-500/70 transition-all duration-300 md:group-hover:w-1 md:group-hover:from-pink-500 md:group-hover:to-purple-500" />
                    {/* Soft pink wash sweeping in from the accent side */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
                    <h3 className="relative font-semibold text-white mb-1 transition-colors duration-300 md:group-hover:text-pink-300">
                      {heading}
                    </h3>
                    <p className="relative text-sm text-gray-300 leading-relaxed transition-colors duration-300 md:group-hover:text-gray-200">
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Prev / next */}
        <nav className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2">
          {[
            { project: prev, label: t.projectPage.prev, isNext: false },
            { project: next, label: t.projectPage.next, isNext: true },
          ].map(({ project: target, label, isNext }) => (
            <Link
              key={label}
              to={`/projects/${target.id}`}
              aria-label={`${label}: ${localized(target, "title", lang)}`}
              title={localized(target, "title", lang)}
              className={`group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-pink-500/50 hover:bg-white/[0.05] hover:text-pink-400 ${
                isNext ? "justify-self-end" : ""
              }`}
            >
              {isNext ? (
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
              ) : (
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ProjectPage;
