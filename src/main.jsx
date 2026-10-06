import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import "./index.css";
import { AccentProvider } from "./theme/AccentContext.jsx";
import { applyAccent, readStoredAccent } from "./theme/accent.js";

// Apply the saved accent before the first render so there is no color flash.
applyAccent(readStoredAccent());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Portfolio">
      <LanguageProvider>
        <AccentProvider>
          <App />
        </AccentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);