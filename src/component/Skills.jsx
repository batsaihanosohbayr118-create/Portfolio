import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import skills from "../data/skill.json";
import { useLanguage } from "../i18n/LanguageContext";
import { hexToRgba, useAccent } from "../theme/AccentContext";
import SkillIcon from "./SkillIcon";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const categoryOrder = ["frontend", "backend", "database", "mobile", "languages", "tools"];

const categories = categoryOrder
  .map((id) => ({ id, items: skills.filter((skill) => skill.category === id) }))
  .filter(({ items }) => items.length > 0);

const Skills = () => {
  const { t } = useLanguage();
  const { accent } = useAccent();
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeItems = categories.find(({ id }) => id === activeId).items;
  const cardShadow = `0 20px 45px ${hexToRgba(accent.a, 0.18)}`;

  return (
    <section id="skills" style={{ backgroundColor: "#111827" }} className="py-20 relative overflow-hidden">
      <div className="container px-5 mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold text-white">
            {t.skills.titleA}{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--accent-1, #ec4899), var(--accent-2, #8b5cf6))",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.skills.titleB}
            </span>
          </h1>
        </Motion.div>

        {/* Category tabs: one category at a time keeps the section compact */}
        <div role="tablist" className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(({ id, items }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(id)}
                className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <Motion.span
                    layoutId="skills-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                )}
                <span className="relative">
                  {t.skills.categories[id]}
                  <span className="ml-1.5 text-xs opacity-70">{items.length}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <Motion.div
            key={activeId}
            role="tabpanel"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {activeItems.map((skill, index) => (
              <Motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Motion.div
                  whileHover={{ boxShadow: cardShadow }}
                  style={{
                    background: "linear-gradient(to bottom right, #1f2937, #111827)",
                    borderColor: "#374151",
                  }}
                  className="h-full p-3.5 sm:p-5 rounded-2xl border-2 hover:border-pink-500/50 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Motion.div
                      animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.12,
                      }}
                      whileHover={{ rotate: 10, scale: 1.12 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl p-2 sm:p-2.5 flex items-center justify-center bg-gray-700"
                    >
                      <SkillIcon skill={skill} />
                    </Motion.div>

                    <h3 className="min-w-0 text-sm sm:text-lg font-bold leading-tight text-white">{skill.name}</h3>
                  </div>

                  <div className="flex justify-between mb-2 text-xs sm:text-sm">
                    <span className="text-gray-400">{t.skills.level}</span>
                    <span className="font-bold text-pink-500">{skill.level}%</span>
                  </div>

                  <div
                    className="w-full rounded-full h-2 sm:h-2.5 overflow-hidden relative"
                    style={{ backgroundColor: "#374151" }}
                  >
                    <Motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                    >
                      <Motion.span
                        animate={{ x: ["0%", "520%"] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          repeatDelay: 1.2,
                          ease: "easeInOut",
                          delay: index * 0.15,
                        }}
                        className="absolute inset-y-0 -left-8 w-8 bg-white/45 blur-sm"
                      />
                    </Motion.div>
                  </div>
                </Motion.div>
              </Motion.div>
            ))}
          </Motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;