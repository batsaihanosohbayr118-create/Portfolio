import { motion as Motion } from "framer-motion";
import skills from "../data/skill.json";
import { useLanguage } from "../i18n/LanguageContext";
import SkillIcon from "./SkillIcon";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const categoryOrder = ["frontend", "backend", "database", "mobile", "languages", "tools"];

const MIN_ITEMS_PER_HALF = 8;

const categories = categoryOrder
  .map((id) => ({ id, items: skills.filter((skill) => skill.category === id) }))
  .filter(({ items }) => items.length > 0)
  .map((category) => {
    const reps = Math.ceil(MIN_ITEMS_PER_HALF / category.items.length);
    return { ...category, loop: Array.from({ length: reps }, () => category.items).flat() };
  });

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 text-[#a8875a]" aria-hidden="true">
    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
  </svg>
);

const SkillItem = ({ skill }) => (
  <li className="flex items-center gap-4 sm:gap-5 pr-8 sm:pr-12">
    <span className="flex w-10 h-10 sm:w-12 sm:h-12 shrink-0 items-center justify-center rounded-full bg-[#1d1b18] p-2.5 sm:p-3">
      <SkillIcon skill={skill} />
    </span>
    <span className="whitespace-nowrap text-3xl sm:text-5xl font-medium leading-none" style={serif}>
      {skill.name}
      <sup className="ml-1.5 align-super font-sans text-[0.65rem] sm:text-xs font-semibold tracking-wider text-[#a8875a]">
        {skill.level}%
      </sup>
    </span>
    <span className="pl-4 sm:pl-7">
      <Sparkle />
    </span>
  </li>
);

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      data-nav-tone="light"
      className="relative overflow-hidden bg-[#f3ece3] text-[#1d1b18] py-20 lg:py-28 scroll-mt-16"
    >
      <Motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="px-5 text-center text-5xl sm:text-6xl lg:text-7xl font-medium leading-none"
        style={serif}
      >
        {t.skills.titleA} <em className="text-[#a8875a]">{t.skills.titleB}</em>
      </Motion.h2>
      <span className="mx-auto mt-7 mb-14 lg:mb-20 block h-px w-14 bg-[#a8875a]" />

      <div className="border-t border-[#1d1b18]/10">
        {categories.map(({ id, items, loop }, row) => (
          <div
            key={id}
            className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 border-b border-[#1d1b18]/10 py-6 lg:py-8"
          >
            <h3 className="shrink-0 px-5 sm:px-10 lg:px-14 lg:w-80 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#1d1b18]/60">
              <span className="mr-3 text-[#a8875a]">{String(items.length).padStart(2, "0")}</span>
              {t.skills.categories[id]}
            </h3>

            <div className="project-carousel-mask min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto">
              <div
                className="animate-skills-flow flex w-max"
                style={{
                  "--skills-flow-duration": `${loop.length * 4.5}s`,
                  animationDirection: row % 2 ? "reverse" : "normal",
                }}
              >
                <ul className="flex items-center">
                  {loop.map((skill, i) => (
                    <SkillItem key={`${skill.name}-${i}`} skill={skill} />
                  ))}
                </ul>
                <ul className="flex items-center" aria-hidden="true">
                  {loop.map((skill, i) => (
                    <SkillItem key={`${skill.name}-${i}`} skill={skill} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
