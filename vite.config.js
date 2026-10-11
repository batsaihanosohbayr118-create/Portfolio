import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Portfolio/",
  plugins: [
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
