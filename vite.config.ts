import path from "node:path";
import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import { discoverProjects } from "./scripts/discover-projects";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: discoverProjects(),
    }),
    ffmpeg(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@": path.resolve(__dirname, "./"),
    },
  },
});
