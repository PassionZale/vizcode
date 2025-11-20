import { makeProject } from "@motion-canvas/core";
import scene from "./scene?scene";
import audio from "./assets/audio.wav";

export default makeProject({
  scenes: [scene],
  audio: audio,
});
