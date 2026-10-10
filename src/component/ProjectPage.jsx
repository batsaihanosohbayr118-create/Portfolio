import { motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaApple, FaGithub } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import projects from "../data/project.json";
import { localized, useLanguage } from "../i18n/LanguageContext";
import { assetPath } from "../utils/assetPath";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const label = "text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em]";
const sectionTitle = "text-4xl sm:text-5xl font-medium leading-none";
const darkOutlineButton = `group inline-flex items-center gap-2 rounded-full border border-[#a8875a]/60 px-6 py-3 ${label} tracking-[0.14em] text-[#f3ece3]/85 transition-colors hover:border-[#a8875a] hover:text-[#c9a46e]`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15 },
  variants: fadeUp,
};

const pad = (n) => String(n).padStart(2, "0");

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const SectionHeading = ({ children }) => (
  <div className="mb-10">
    <h2 className={sectionTitle} style={serif}>
      {children}
    </h2>
    <span className="mt-6 block h-px w-14 bg-[#a8875a]" />
  </div>
);

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const index = projects.findIndex((p) => String(p.id) === id);
  const project = projects[index];

  const backToProjects = () => navigate("/", { state: { scrollTo: "projects" } });

  if (!project) {
    return (
      <section data-nav-tone="light" className="min-h-[70vh] bg-[#f3ece3] text-[#1d1b18] pt-36 pb-20 px-5 text-center">
        <p className="text-3xl font-medium mb-8" style={serif}>
          {t.projectPage.notFound}
        </p>
        <button
          onClick={backToProjects}
          className={`inline-flex items-center gap-2 ${label} text-[#a8875a] hover:text-[#1d1b18] cursor-pointer`}
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
  const description = localized(project, "description", lang);
  const overview = localized(project, "overview", lang);
  const features = localized(project, "features", lang) ?? [];
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
  // Each half of the marquee must be wider than the screen for a seamless loop.
  const tagLoop = Array.from({ length: Math.ceil(16 / project.tags.length) }, () => project.tags).flat();
  const meta = [
    { term: t.projectPage.role, value: role },
    { term: t.projectPage.timeline, value: timeline },
  ].filter(({ value }) => value);

  return (
    <article key={project.id}>
      {/* Dark hero */}
      <header className="relative overflow-hidden bg-[#161412] text-[#f3ece3] pt-28 sm:pt-32 pb-16 lg:pb-20 px-5 sm:px-10 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,135,90,0.22),transparent)]"
        />

        <Motion.div initial="hidden" animate="show" className="relative max-w-6xl mx-auto">
          <button
            onClick={backToProjects}
            className={`group inline-flex items-center gap-2 ${label} text-[#f3ece3]/55 hover:text-[#c9a46e] transition-colors mb-12 sm:mb-16 cursor-pointer`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {t.projectPage.back}
          </button>

          <Motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="text-2xl lining-nums text-[#c9a46e]" style={serif}>
              {pad(index + 1)} <span className="text-[#f3ece3]/30">/ {pad(projects.length)}</span>
            </span>
            <span className="h-px w-16 bg-[#a8875a]/60" />
          </Motion.div>

          <Motion.h1
            variants={fadeUp}
            custom={0.05}
            className="text-6xl sm:text-7xl lg:text-8xl font-medium leading-[0.95]"
            style={serif}
          >
            {title}
            <span className="text-[#c9a46e]">.</span>
          </Motion.h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Preview */}
            <Motion.div
              variants={fadeUp}
              custom={0.1}
              className="group lg:col-span-5 [perspective:1400px]"
            >
              {/* Spins a full turn around its vertical axis on hover (and back on leave) */}
              <div className="overflow-hidden rounded-xl border border-[#a8875a]/50 bg-[#1d1a17] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),0_0_50px_-20px_rgba(201,164,110,0.45)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:[transform:rotateY(360deg)] motion-reduce:transition-none">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#f3ece3]/25" />
                  <span className="w-2 h-2 rounded-full bg-[#f3ece3]/25" />
                  <span className="w-2 h-2 rounded-full bg-[#f3ece3]/25" />
                  {host && (
                    <span className="mx-auto max-w-[60%] truncate rounded-full bg-[#f3ece3]/[0.06] px-3 py-0.5 text-[0.65rem] tracking-wider text-[#f3ece3]/55">
                      {host}
                    </span>
                  )}
                </div>
                <img
                  src={assetPath(project.image)}
                  alt={title}
                  className="block w-full h-auto bg-[#1d1b18]"
                />
              </div>
            </Motion.div>

            <div className="lg:col-span-7">
              <Motion.p
                variants={fadeUp}
                custom={0.15}
                className="text-lg sm:text-xl leading-relaxed text-[#f3ece3]/70"
                style={serif}
              >
                {description}
              </Motion.p>

              <Motion.div variants={fadeUp} custom={0.2} className="mt-8 flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 rounded-full bg-[#c9a46e] px-6 py-3 ${label} tracking-[0.14em] text-[#161412] transition-colors hover:bg-[#d9b97f]`}
                  >
                    {t.projectPage.demo}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </a>
                )}
                {project.appStoreUrl && (
                  <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className={darkOutlineButton}>
                    <FaApple className="w-4 h-4 text-[#c9a46e]" />
                    {t.projectPage.appStore}
                  </a>
                )}
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={darkOutlineButton}>
                    <FaGithub className="w-4 h-4 text-[#c9a46e]" />
                    {t.projectPage.code}
                  </a>
                )}
              </Motion.div>
            </div>
          </div>

          {/* Stack marquee: flows right to left, pauses on hover */}
          <Motion.div
            variants={fadeUp}
            custom={0.25}
            className="mt-12 border-t border-[#f3ece3]/10 pt-6 project-carousel-mask overflow-hidden motion-reduce:overflow-x-auto"
          >
            <div
              className="animate-skills-flow flex w-max"
              style={{ "--skills-flow-duration": `${tagLoop.length * 3}s` }}
            >
              {[false, true].map((isCopy) => (
                <ul
                  key={String(isCopy)}
                  aria-label={isCopy ? undefined : t.projectPage.stack}
                  aria-hidden={isCopy || undefined}
                  className="flex shrink-0 items-center gap-2 pr-2"
                >
                  {tagLoop.map((tag, i) => (
                    <li
                      key={`${tag}-${i}`}
                      className="shrink-0 whitespace-nowrap rounded-full border border-[#a8875a]/35 bg-[#a8875a]/[0.06] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f3ece3]/75 transition-colors hover:border-[#a8875a] hover:text-[#c9a46e]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </Motion.div>
        </Motion.div>
      </header>

      <div data-nav-tone="light" className="bg-[#f3ece3] text-[#1d1b18] px-5 sm:px-10 lg:px-14 pt-20 lg:pt-28 pb-20 lg:pb-28">
        {/* First section sits flush with the top padding whichever one it is */}
        <div className="max-w-6xl mx-auto [&>*:first-child]:mt-0">
          {/* Overview + meta (only when the project has an overview) */}
          {overview && (
            <Motion.section {...inView} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeading>{t.projectPage.overview}</SectionHeading>
                {meta.length > 0 && (
                  <dl className="border-t border-[#1d1b18]/10">
                    {meta.map(({ term, value }) => (
                      <div key={term} className="border-b border-[#1d1b18]/10 py-4">
                        <dt className={`${label} text-[#1d1b18]/45 mb-1.5`}>{term}</dt>
                        <dd className="text-sm leading-relaxed">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
              <p className="lg:col-span-8 text-xl sm:text-2xl leading-relaxed text-[#1d1b18]/80" style={serif}>
                {overview}
              </p>
            </Motion.section>
          )}

          {/* Problem / solution */}
          {(problem || solution) && (
            <Motion.div {...inView} className="mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { heading: t.projectPage.problem, text: problem, dark: false },
                { heading: t.projectPage.solution, text: solution, dark: true },
              ]
                .filter(({ text }) => text)
                .map(({ heading, text, dark }) => (
                  <div
                    key={heading}
                    className={`group relative overflow-hidden rounded-2xl border p-8 sm:p-10 transition-all duration-500 ease-out hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                      dark
                        ? "border-transparent bg-[#161412] text-[#f3ece3] shadow-[0_0_50px_-20px_rgba(201,164,110,0.5)] hover:border-[#a8875a]/70 hover:shadow-[0_30px_60px_-20px_rgba(201,164,110,0.65)]"
                        : "border-[#1d1b18]/10 bg-[#efe6da] hover:border-[#a8875a]/60 hover:bg-[#f5ede2] hover:shadow-[0_30px_60px_-25px_rgba(168,135,90,0.55)]"
                    }`}
                  >
                    {/* Gold top line draws in from the left */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#d9b97f] to-[#a8875a] transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    {/* Light sheen sweeps across once */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100 ${
                        dark ? "via-[#c9a46e]/15" : "via-white/60"
                      }`}
                    />
                    {/* Soft corner glow */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,110,0.35),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />

                    <h2
                      className={`relative ${label} ${dark ? "text-[#c9a46e]" : "text-[#a8875a]"} mb-5 transition-[letter-spacing] duration-500 group-hover:tracking-[0.32em]`}
                    >
                      {heading}
                    </h2>
                    <p className={`relative text-base sm:text-lg leading-relaxed ${dark ? "text-[#f3ece3]/80" : "text-[#1d1b18]/80"}`}>
                      {text}
                    </p>
                  </div>
                ))}
            </Motion.div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <Motion.section {...inView} className="mt-20 lg:mt-28">
              <SectionHeading>{t.projectPage.features}</SectionHeading>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((feature, i) => {
                  // A feature is either a plain string or a { title, body, points? } object.
                  const heading = typeof feature === "string" ? null : feature.title;
                  const body = typeof feature === "string" ? feature : feature.body;
                  const points = feature.points ?? [];
                  return (
                    <li
                      key={heading ?? body}
                      className="group relative overflow-hidden rounded-2xl border border-[#1d1b18]/10 bg-[#f8f3ec] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#a8875a]/60 hover:shadow-[0_25px_50px_-25px_rgba(168,135,90,0.55)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#d9b97f] to-[#a8875a] transition-transform duration-500 group-hover:scale-x-100"
                      />
                      <span className="block text-3xl leading-none lining-nums text-[#a8875a]" style={serif}>
                        {pad(i + 1)}
                      </span>
                      {heading && (
                        <h3 className="mt-5 text-2xl font-medium leading-tight" style={serif}>
                          {heading}
                        </h3>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-[#1d1b18]/70">{body}</p>
                      {points.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#1d1b18]/60">
                              <span className="mt-2.5 h-px w-3 shrink-0 bg-[#a8875a]" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Motion.section>
          )}

          {/* Mobile screenshots */}
          {media.length > 0 && (
            <Motion.section {...inView} className="mt-20 lg:mt-28">
              <SectionHeading>{t.projectPage.screenshots}</SectionHeading>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 rounded-3xl bg-[#161412] px-6 py-12 sm:py-16">
                {media.map(({ type, src }, i) => (
                  <div
                    key={src}
                    className="w-[46%] sm:w-[30%] max-w-[260px] overflow-hidden rounded-[32px] border-[6px] border-[#2a251f] bg-[#161412] shadow-[0_0_50px_-15px_rgba(201,164,110,0.45)]"
                  >
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
                ))}
              </div>
            </Motion.section>
          )}

          {/* Technical highlights, challenges & solutions */}
          {notes.map(({ label: heading, items }) => (
            <Motion.section key={heading} {...inView} className="mt-20 lg:mt-28">
              <SectionHeading>{heading}</SectionHeading>
              <ul className="border-t border-[#1d1b18]/10">
                {items.map(({ title: itemTitle, body }, i) => (
                  <li
                    key={itemTitle}
                    className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[3rem_4fr_8fr] gap-x-4 md:gap-x-10 gap-y-2 border-b border-[#1d1b18]/10 px-3 sm:px-5 py-7"
                  >
                    {/* Gold wash fills in from the left, gold underline draws over the border */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#a8875a]/15 via-[#a8875a]/[0.06] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-[#a8875a] to-[#d9b97f] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-[#a8875a] transition-all duration-500 group-hover:h-2/3"
                    />

                    <span
                      className="relative origin-left text-xl leading-none lining-nums text-[#a8875a] pt-1 transition-transform duration-500 group-hover:scale-125"
                      style={serif}
                    >
                      {pad(i + 1)}
                    </span>
                    <h3
                      className="relative text-2xl font-medium leading-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#8a6c40]"
                      style={serif}
                    >
                      {itemTitle}
                    </h3>
                    <p className="relative col-start-2 md:col-start-3 text-sm sm:text-base leading-relaxed text-[#1d1b18]/70 transition-colors duration-500 group-hover:text-[#1d1b18]/90">
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
            </Motion.section>
          ))}

          {/* Prev / next */}
          <nav className="mt-24 lg:mt-32 flex items-center justify-between gap-6 border-t border-[#1d1b18]/15 pt-8">
            {[
              { project: prev, direction: t.projectPage.prev, isNext: false },
              { project: next, direction: t.projectPage.next, isNext: true },
            ].map(({ project: target, direction, isNext }) => (
              <Link
                key={direction}
                to={`/projects/${target.id}`}
                aria-label={`${direction}: ${localized(target, "title", lang)}`}
                className={`group inline-flex items-center gap-4 ${isNext ? "flex-row-reverse" : ""}`}
              >
                <span className="flex w-11 h-11 sm:w-12 sm:h-12 shrink-0 items-center justify-center rounded-full border border-[#a8875a]/60 text-[#a8875a] transition-colors duration-300 group-hover:bg-[#a8875a] group-hover:text-[#f3ece3]">
                  {isNext ? (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  ) : (
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  )}
                </span>
                <span className={`${label} text-[#1d1b18]/70 transition-colors group-hover:text-[#a8875a]`}>
                  {direction}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </article>
  );
};

export default ProjectPage;
