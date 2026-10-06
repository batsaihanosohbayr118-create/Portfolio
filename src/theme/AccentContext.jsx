import { createContext, useContext, useEffect, useState } from "react";
import { applyAccent, readStoredAccent, storeAccent } from "./accent";

const AccentContext = createContext(null);

export const AccentProvider = ({ children }) => {
  const [accent, setAccent] = useState(readStoredAccent);

  useEffect(() => {
    applyAccent(accent);
    storeAccent(accent);
  }, [accent]);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccent = () => useContext(AccentContext);

// "#ec4899", 0.18 -> "rgba(236, 72, 153, 0.18)". For values Framer Motion animates,
// which can't interpolate CSS variables.
// eslint-disable-next-line react-refresh/only-export-components
export const hexToRgba = (hex, alpha) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};
