import { AnimatePresence, motion as Motion } from "framer-motion";
import { Check, Palette, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useAccent } from "../theme/AccentContext";
import { navControl } from "./navStyles";
import { ACCENT_PRESETS, DEFAULT_ACCENT } from "../theme/accent";

const ThemePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accent, setAccent } = useAccent();
  const { t } = useLanguage();
  const rootRef = useRef(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const setCustom = (key, value) => setAccent({ ...accent, id: "custom", [key]: value });

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.theme.open}
        aria-expanded={isOpen}
        title={t.theme.open}
        className={`flex items-center justify-center w-9 ${navControl}`}
      >
        <Palette className="w-4.5 h-4.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-16 mx-auto max-w-xs origin-top sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:mx-0 sm:w-64 sm:max-w-none sm:origin-top-right rounded-2xl border border-white/10 bg-gray-900/95 p-4 shadow-2xl backdrop-blur-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
              {t.theme.title}
            </p>

            <div className="grid grid-cols-6 gap-2 mb-4">
              {ACCENT_PRESETS.map((preset) => {
                const isActive = accent.id === preset.id;
                const name = t.theme.presets[preset.id];
                return (
                  <button
                    key={preset.id}
                    onClick={() => setAccent(preset)}
                    aria-label={name}
                    aria-pressed={isActive}
                    title={name}
                    className={`relative aspect-square rounded-full transition-transform hover:scale-110 cursor-pointer ring-offset-2 ring-offset-gray-900 ${
                      isActive ? "ring-2 ring-white" : ""
                    }`}
                    style={{ background: `linear-gradient(135deg, ${preset.a}, ${preset.b})` }}
                  >
                    {isActive && <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
              {t.theme.custom}
            </p>
            <div className="flex items-center gap-3 mb-4">
              {[
                { key: "a", label: t.theme.first },
                { key: "b", label: t.theme.second },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  title={label}
                  className="relative w-9 h-9 shrink-0 overflow-hidden rounded-full border border-white/20 cursor-pointer"
                  style={{ background: accent[key] }}
                >
                  <input
                    type="color"
                    value={accent[key]}
                    onChange={(event) => setCustom(key, event.target.value)}
                    aria-label={label}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              ))}
              <div
                className="h-2 flex-1 rounded-full"
                style={{ background: `linear-gradient(to right, ${accent.a}, ${accent.b})` }}
              />
            </div>

            <button
              onClick={() => setAccent(DEFAULT_ACCENT)}
              disabled={accent.id === DEFAULT_ACCENT.id}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.theme.reset}
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
