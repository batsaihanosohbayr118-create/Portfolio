import { motion as Motion } from "framer-motion";
import skills from "../data/skill.json";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
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

const getCardShadow = (darkMode) =>
  darkMode
    ? "0 20px 45px rgba(249, 115, 22, 0.18)"
    : "0 20px 45px rgba(249, 115, 22, 0.22)";

const Skills = ({ darkMode }) => {
  return (
    <section
      id="skills"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-20 relative overflow-hidden"
    >
      <div className="container px-5 mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1
            className="text-4xl font-bold"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Skills
            </span>
          </h1>
        </Motion.div>

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap -m-4"
        >
          {skills.map((skill, index) => (
            <Motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="p-4 lg:w-1/4 md:w-1/2 w-full"
            >
              <Motion.div
                whileHover={{ boxShadow: getCardShadow(darkMode) }}
                style={{
                  background: darkMode
                    ? "linear-gradient(to bottom right, #1f2937, #111827)"
                    : "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                }}
                className="h-full p-6 rounded-2xl border-2 hover:border-orange-500/50 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <Motion.div
                    animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.12,
                    }}
                    whileHover={{ rotate: 10, scale: 1.12 }}
                    className="w-16 h-16 rounded-xl p-3 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </Motion.div>

                  <h3
                    className="text-2xl font-bold ml-4"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    {skill.name}
                  </h3>
                </div>

                <div className="flex justify-between mb-2">
                  <span style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}>
                    Proficiency
                  </span>
                  <span className="font-bold text-orange-500">{skill.level}%</span>
                </div>

                <div
                  className="w-full rounded-full h-3 overflow-hidden relative"
                  style={{ backgroundColor: darkMode ? "#374151" : "#e5e7eb" }}
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
      </div>
    </section>
  );
};

export default Skills;
