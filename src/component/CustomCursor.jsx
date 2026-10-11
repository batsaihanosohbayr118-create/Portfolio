import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], [role='option'], label, summary, select";
const FIELD = "input:not([type='hidden']), textarea";

// A gold ring that trails the pointer and swells over anything clickable.
// Mouse-like pointers only; the native cursor stays visible.
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  const [state, setState] = useState({ visible: false, hover: false, field: false, pressed: false });
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 500, damping: 40, mass: 0.6 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setEnabled(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const update = (patch) => setState((prev) => ({ ...prev, ...patch }));

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      update({ visible: true });
    };
    const onOver = (e) => {
      const field = Boolean(e.target.closest?.(FIELD));
      update({ field, hover: !field && Boolean(e.target.closest?.(INTERACTIVE)) });
    };
    const onLeave = () => update({ visible: false });
    const onDown = () => update({ pressed: true });
    const onUp = () => update({ pressed: false });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const { visible, hover, field, pressed } = state;
  const scale = (hover ? 1.8 : field ? 0.5 : 1) * (pressed ? 0.8 : 1);

  return (
    <Motion.div
      aria-hidden="true"
      style={{ x: reduceMotion ? x : springX, y: reduceMotion ? y : springY }}
      className="pointer-events-none fixed left-0 top-0 z-[300]"
    >
      <Motion.div
        animate={{ scale, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`-ml-4 -mt-4 h-8 w-8 rounded-full border transition-colors duration-300 ${
          hover ? "border-[#c9a46e] bg-[#c9a46e]/15" : "border-[#a8875a]/70 bg-transparent"
        }`}
      />
    </Motion.div>
  );
};

export default CustomCursor;
