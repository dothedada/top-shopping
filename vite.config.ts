import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      template: "./src/index.html",
    }),
    react(),
  ],
});
