import { useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef } from "react";
import HeroImage from "../assets/hero-portrait.webp";
import { useLanguage } from "../i18n/LanguageContext";

const socialIcons = [
  {
    icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "GitHub",
    link: "https://github.com/batsaihanosohbayr118-create",
    className: "bg-[#1d1b18]",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/batsaihan-osohbayr-41b37240b",
    className: "bg-[#0a66c2]",
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Email",
    link: "mailto:batsaihanosohbayr118@gmail.com",
    className: "bg-[#b08d5c]",
  },
];

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const Badge = () => (
  <div className="relative h-32 w-32 text-[#a8875a]" aria-hidden="true">
    <svg viewBox="0 0 120 120" className="h-full w-full motion-safe:animate-[spin_28s_linear_infinite]">
      <defs>
        <path id="hero-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text className="fill-current text-[8.5px] uppercase">
        {/* textLength = circle circumference (2π·46 ≈ 289) minus a small gap before the start */}
        <textPath href="#hero-badge-circle" textLength="281" lengthAdjust="spacing">
          Usukhbayar ✦ Fullstack Developer ✦
        </textPath>
      </text>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center text-5xl" style={serif}>
      U
    </span>
  </div>
);

const NAME_BASELINE = 141;
const TOSS_SPEED = 380; // upward launch speed, SVG units/s
const GRAVITY = 1800;
const BOUNCE = 0.35; // share of speed kept on each landing

// Hovered letters of the wordmark get tossed up and bounce back onto the baseline.
// Animates the <text> y/rotate lists so the whole name stays one gradient-filled text.
const useLetterToss = (textRef, enabled) => {
  const letters = useRef([]);
  const frame = useRef(0);
  const hovered = useRef(-1);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const step = (last) => (now) => {
    const text = textRef.current;
    if (!text) return;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    let moving = false;
    for (const l of letters.current) {
      l.vy += GRAVITY * dt;
      l.y += l.vy * dt;
      if (l.y >= 0 && l.vy > 0) {
        l.y = 0;
        l.vy = Math.abs(l.vy) < 60 ? 0 : -l.vy * BOUNCE;
      }
      // Rotation springs back to upright
      l.vr += (-140 * l.r - 12 * l.vr) * dt;
      l.r += l.vr * dt;
      if (l.vy !== 0 || l.y !== 0 || Math.abs(l.r) > 0.05 || Math.abs(l.vr) > 0.5) moving = true;
      else l.r = l.vr = 0;
    }
    if (moving) {
      text.setAttribute("y", letters.current.map((l) => (NAME_BASELINE + l.y).toFixed(2)).join(" "));
      text.setAttribute("rotate", letters.current.map((l) => l.r.toFixed(2)).join(" "));
      frame.current = requestAnimationFrame(step(now));
    } else {
      text.setAttribute("y", NAME_BASELINE);
      text.removeAttribute("rotate");
      frame.current = 0;
    }
  };

  const toss = (index) => {
    const l = letters.current[index];
    if (l.y < -8) return; // still in the air
    l.vy = -TOSS_SPEED * (0.85 + Math.random() * 0.3);
    l.vr = (Math.random() < 0.5 ? -1 : 1) * (160 + Math.random() * 120);
    if (!frame.current) frame.current = requestAnimationFrame(step(performance.now()));
  };

  const onPointer = (e) => {
    const text = textRef.current;
    if (!enabled || !text) return;
    const count = text.getNumberOfChars();
    if (letters.current.length !== count) {
      letters.current = Array.from({ length: count }, () => ({ y: 0, vy: 0, r: 0, vr: 0 }));
    }
    const { x } = new DOMPoint(e.clientX, e.clientY).matrixTransform(text.ownerSVGElement.getScreenCTM().inverse());
    let index = -1;
    for (let i = 0; i < count; i++) {
      const box = text.getExtentOfChar(i);
      if (x >= box.x && x < box.x + box.width) {
        index = i;
        break;
      }
    }
    // Toss once per letter entered (a tap always tosses)
    if (index === hovered.current && e.type === "pointermove") return;
    hovered.current = index;
    if (index >= 0) toss(index);
  };

  return {
    onPointerMove: onPointer,
    onPointerDown: onPointer,
    onPointerLeave: () => (hovered.current = -1),
  };
};

const Hero = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const nameRef = useRef(null);
  const letterToss = useLetterToss(nameRef, !reduceMotion);

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col">
      <section
        id="home"
        data-nav-tone="light"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font relative"
      >
        <div
          className="relative overflow-hidden text-[#1d1b18] pt-16 lg:pt-20 lg:h-svh lg:min-h-[680px]"
          style={{
            background:
              "radial-gradient(120% 80% at 15% 20%, #f8f3ec 0%, transparent 60%), radial-gradient(90% 70% at 85% 75%, #f6efe6 0%, transparent 55%), linear-gradient(135deg, #efe6da 0%, #f3ece3 45%, #e9dfd2 100%)",
          }}
        >
          {/* Wordmark */}
          <div className="relative z-0 px-3 sm:px-8 lg:px-12 mt-6 sm:mt-8">
            <svg
              viewBox="0 0 1000 150"
              className="relative block w-full mx-auto max-w-[175svh] overflow-visible"
              aria-hidden="true"
              {...letterToss}
            >
              {/* Clips the rise-in reveal at the bottom; open above so tossed letters can fly */}
              <clipPath id="hero-name-clip">
                <rect y="-150" width="1000" height="300" />
              </clipPath>
              {/* Ink fill with a gold band that sweeps across the name, then rests */}
              <linearGradient
                id="hero-name-shimmer"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                gradientTransform="translate(-700 0)"
              >
                <stop offset="0" stopColor="#1d1b18" />
                <stop offset="0.4" stopColor="#1d1b18" />
                <stop offset="0.47" stopColor="#a8875a" />
                <stop offset="0.5" stopColor="#e2c48f" />
                <stop offset="0.53" stopColor="#a8875a" />
                <stop offset="0.6" stopColor="#1d1b18" />
                <stop offset="1" stopColor="#1d1b18" />
                {!reduceMotion && (
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-700 0; 700 0; 700 0"
                    keyTimes="0; 0.55; 1"
                    calcMode="spline"
                    keySplines="0.45 0 0.25 1; 0 0 1 1"
                    dur="6s"
                    begin="2.6s"
                    repeatCount="indefinite"
                  />
                )}
              </linearGradient>
              <g clipPath="url(#hero-name-clip)">
                <text
                  ref={nameRef}
                  className="hero-name"
                  x="0"
                  y={NAME_BASELINE}
                  textLength="1000"
                  lengthAdjust="spacingAndGlyphs"
                  fontSize="214"
                  fontWeight="500"
                  fill={reduceMotion ? "currentColor" : "url(#hero-name-shimmer)"}
                  style={serif}
                >
                  {t.aboutPage.name.toUpperCase()}
                </text>
              </g>
            </svg>
            <img
              src={HeroImage}
              alt="Usukhbayar"
              width="713"
              height="1385"
              fetchPriority="high"
              className="hero-portrait hidden lg:block pointer-events-none absolute z-10 left-[59%] -translate-x-1/2 top-[38%] h-[115svh] w-auto max-w-none drop-shadow-[0_25px_35px_rgba(60,40,20,0.18)]"
            />
          </div>

          {/* Portrait: stands in front of the wordmark, cropped by the card edge */}
          <div className="relative z-10 -mt-[12vw] h-[440px] sm:h-[600px] lg:hidden pointer-events-none">
            <img
              src={HeroImage}
              alt=""
              width="713"
              height="1385"
              className="hero-portrait absolute left-1/2 -translate-x-1/2 top-0 h-[180%] w-auto max-w-none drop-shadow-[0_25px_35px_rgba(60,40,20,0.18)]"
            />
          </div>

          {/* Copy */}
          <div className="relative z-20 -mt-24 lg:mt-6 xl:mt-10 px-6 sm:px-10 lg:px-14 pt-16 lg:pt-0 pb-10 lg:pb-0 lg:max-w-[38%] xl:max-w-[35%] bg-gradient-to-b from-transparent via-[#f1e9de] via-25% to-[#f1e9de] lg:bg-none">
            {/* Title stays for screen readers and search engines; socials take its place visually */}
            <h1 className="sr-only">{t.hero.title}</h1>

            <div className="flex items-center gap-4 sm:gap-5" data-aos="fade-up" data-aos-delay="500">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target={social.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex w-10 h-10 sm:w-11 sm:h-11 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 hover:scale-110 ${social.className}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <span className="my-5 xl:my-6 block h-px w-14 bg-[#a8875a]" />

            <p
              className="max-w-sm text-sm sm:text-[0.95rem] leading-relaxed text-[#3d3934]"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {t.hero.body}
            </p>

            <div
              className="mt-7 xl:mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <button
                onClick={handleScrollToProjects}
                className="group inline-flex items-center justify-center rounded-full bg-[#1d1b18] px-5 py-3 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#f3ece3] btn-slide"
              >
                {t.hero.viewProjects}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center rounded-full border border-[#a8875a] px-5 py-3 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[#8a6c40] btn-slide"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t.hero.contact}
              </button>
            </div>
          </div>

          <div className="absolute right-14 bottom-12 z-20 hidden lg:block">
            <Badge />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;
