import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const DURATION = 2600;
const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 118;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TICK_COUNT = 72;

const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
  const angle = (i / TICK_COUNT) * 2 * Math.PI - Math.PI / 2;
  const inner = i % 6 === 0 ? 130 : 134;
  return {
    x1: CENTER + inner * Math.cos(angle),
    y1: CENTER + inner * Math.sin(angle),
    x2: CENTER + 140 * Math.cos(angle),
    y2: CENTER + 140 * Math.sin(angle),
  };
});

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + (i % 3),
  delay: (i * 0.35) % 4,
  duration: 6 + (i % 5),
}));

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const IntroLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 600 : DURATION;
    const start = performance.now();
    let frame;
    let finishTimer;

    const waitForPage = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(easeOutCubic(t) * 100);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      waitForPage.then(() => {
        finishTimer = setTimeout(onFinish, 450);
      });
    };

    frame = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  const headAngle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
  const headX = CENTER + RADIUS * Math.cos(headAngle);
  const headY = CENTER + RADIUS * Math.sin(headAngle);
  const isDone = progress >= 99.5;

  return (
    <Motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label={t.intro.loading}
    >
      <div className="intro-blob pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="intro-blob intro-blob-alt pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_55%)]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className="intro-particle pointer-events-none absolute bottom-0 rounded-full bg-pink-300/60"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <Motion.div
        className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[360px] sm:w-[360px]"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: isDone ? 1.04 : 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="intro-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--accent-1, #ec4899)" }} />
              <stop offset="50%" style={{ stopColor: "var(--accent-2, #a855f7)" }} />
              <stop offset="100%" style={{ stopColor: "var(--accent-3, #6366f1)" }} />
            </linearGradient>
            <filter id="intro-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ticks.map((t, i) => (
            <line
              key={i}
              {...t}
              strokeWidth={i % 6 === 0 ? 2 : 1.25}
              strokeLinecap="round"
              style={{ stroke: i / TICK_COUNT < progress / 100 ? "var(--accent-1-400, #f472b6)" : "rgba(255,255,255,0.12)", transition: "stroke 0.3s" }}
            />
          ))}

          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#intro-ring)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            filter="url(#intro-glow)"
          />
          {progress > 0.5 && (
            <>
              <circle cx={headX} cy={headY} r="9" style={{ fill: "var(--accent-1-300, #f9a8d4)" }} opacity="0.25" />
              <circle cx={headX} cy={headY} r="4.5" fill="#fff" filter="url(#intro-glow)" />
            </>
          )}
        </svg>

        <Motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r="152"
            fill="none"
            stroke="url(#intro-ring)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="120 835"
            opacity="0.8"
          />
        </Motion.svg>
        <Motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r="146"
            fill="none"
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
        </Motion.svg>

        <div className="absolute inset-[17%] rounded-full border border-white/10 bg-white/[0.03] shadow-[inset_0_0_40px_color-mix(in_srgb,var(--accent-1,#ec4899)_12%,transparent)] backdrop-blur-sm" />

        <div className="relative flex flex-col items-center text-center">
          <Motion.span
            className="mb-2 text-[10px] font-medium tracking-[0.45em] text-gray-400 uppercase sm:text-xs"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {t.intro.label}
          </Motion.span>

          {t.intro.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <Motion.span
                className="intro-shimmer block bg-linear-to-r from-pink-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl"
                initial={{ y: "110%", filter: "blur(8px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </Motion.span>
            </span>
          ))}

          <Motion.span
            className="mt-3 font-mono text-xs text-gray-400 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {Math.round(progress)}%
          </Motion.span>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default IntroLoader;
