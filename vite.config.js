import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// REVIEW: No "base" option is configured, but package.json deploys to GitHub Pages via gh-pages. Without base (e.g. base: "/repo-name/"), assets may fail to load on GH Pages.
export default defineConfig({
  plugins: [react()],
});
