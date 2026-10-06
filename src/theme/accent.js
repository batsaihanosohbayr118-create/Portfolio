// Site accent colors. Tailwind v4 exposes its palette as CSS variables, so
// index.css re-derives the pink/purple/indigo shades from --accent-1/--accent-2
// whenever <html data-accent> is set. Without the attribute the original
// Tailwind colors are used untouched.

const STORAGE_KEY = "portfolio-accent";

export const DEFAULT_ACCENT = { id: "default", a: "#ec4899", b: "#a855f7" };

export const ACCENT_PRESETS = [
  DEFAULT_ACCENT,
  { id: "ocean", a: "#0ea5e9", b: "#6366f1" },
  { id: "emerald", a: "#10b981", b: "#06b6d4" },
  { id: "sunset", a: "#f97316", b: "#ef4444" },
  { id: "gold", a: "#eab308", b: "#f97316" },
  { id: "violet", a: "#8b5cf6", b: "#3b82f6" },
];

const isHex = (value) => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

export const applyAccent = (accent) => {
  const root = document.documentElement;
  if (!accent || accent.id === DEFAULT_ACCENT.id) {
    delete root.dataset.accent;
    root.style.removeProperty("--accent-1");
    root.style.removeProperty("--accent-2");
    return;
  }
  root.dataset.accent = accent.id;
  root.style.setProperty("--accent-1", accent.a);
  root.style.setProperty("--accent-2", accent.b);
};

export const readStoredAccent = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && isHex(stored.a) && isHex(stored.b) && typeof stored.id === "string") {
      return stored;
    }
  } catch {
    // Missing or malformed value: fall back to the default colors.
  }
  return DEFAULT_ACCENT;
};

export const storeAccent = (accent) => {
  try {
    if (accent.id === DEFAULT_ACCENT.id) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(accent));
  } catch {
    // Storage may be unavailable (private mode); the choice just won't persist.
  }
};
