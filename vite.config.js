import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const base = "/Portfolio/";

// Vite only serves the app under "/Portfolio/"; send "/" and "/Portfolio" there too
const redirectToBase = () => {
  const redirect = (req, res, next) => {
    if (req.url === "/" || req.url === base.slice(0, -1)) {
      res.writeHead(302, { Location: base });
      res.end();
      return;
    }
    next();
  };
  return {
    name: "redirect-to-base",
    configureServer(server) {
      server.middlewares.use(redirect);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
    },
  };
};

export default defineConfig({
  base,
  server: { open: base },
  plugins: [
    redirectToBase(),
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Libraries change rarely, so they get their own long-cached chunks
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
