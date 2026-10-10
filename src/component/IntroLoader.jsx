import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

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
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#161412]"
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label={t.intro.loading}
    >
      <div className="intro-blob pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#a8875a]/15 blur-3xl" />
      <div className="intro-blob intro-blob-alt pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#7a5c33]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,110,0.12),transparent_55%)]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className="intro-particle pointer-events-none absolute bottom-0 rounded-full bg-[#c9a46e]/60"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Progress line running across the middle of the screen, behind the ring */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#f3ece3]/[0.08]" aria-hidden="true">
        <div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-transparent via-[#a8875a] to-[#e6cb94]"
          style={{ width: `${progress}%` }}
        />
        {progress > 0.5 && (
          <div className="absolute top-1/2" style={{ left: `${progress}%` }}>
            <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6cb94]/25 blur-[2px]" />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3ece3] shadow-[0_0_12px_#e6cb94]" />
            <span
              className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm lining-nums tabular-nums text-[#c9a46e]"
              style={serif}
            >
              {Math.round(progress)}
            </span>
          </div>
        )}
      </div>

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
              <stop offset="0%" style={{ stopColor: "#e6cb94" }} />
              <stop offset="50%" style={{ stopColor: "#a8875a" }} />
              <stop offset="100%" style={{ stopColor: "#7a5c33" }} />
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
              style={{ stroke: i / TICK_COUNT < progress / 100 ? "#c9a46e" : "rgba(243,236,227,0.1)", transition: "stroke 0.3s" }}
            />
          ))}

          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(243,236,227,0.06)" strokeWidth="3" />
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
              <circle cx={headX} cy={headY} r="9" style={{ fill: "#e6cb94" }} opacity="0.25" />
              <circle cx={headX} cy={headY} r="4.5" fill="#f3ece3" filter="url(#intro-glow)" />
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
            stroke="rgba(201,164,110,0.3)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
        </Motion.svg>

        <div className="absolute inset-[17%] rounded-full border border-[#a8875a]/20 bg-[#1b1815] shadow-[inset_0_0_40px_rgba(201,164,110,0.08)]" />

        <div className="relative flex flex-col items-center text-center">
          <Motion.span
            className="mb-2 text-[10px] font-medium tracking-[0.45em] text-[#c9a46e] uppercase sm:text-xs"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {t.intro.label}
          </Motion.span>

          {t.intro.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <Motion.span
                className="intro-shimmer block bg-linear-to-r from-[#f3ece3] via-[#c9a46e] to-[#f3ece3] bg-clip-text text-4xl leading-tight font-medium text-transparent sm:text-5xl"
                style={serif}
                initial={{ y: "110%", filter: "blur(8px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </Motion.span>
            </span>
          ))}

          <Motion.span
            className="mt-3 text-lg lining-nums tabular-nums text-[#f3ece3]/60"
            style={serif}
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
