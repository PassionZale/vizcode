import path from "node:path";
import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/projects/live/code-journey/index.ts",
        "./src/projects/ai/llm-model-names/index.ts",
      ],
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
