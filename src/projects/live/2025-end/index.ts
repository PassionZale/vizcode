import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import scene_1 from "./scenes/scene_1?scene";
import scene_2 from "./scenes/scene_2?scene";
import scene_3 from "./scenes/scene_3?scene";
import scene_4 from "./scenes/scene_4?scene";
import audio from "./assets/audio.mp3";

export default makeProject({
  scenes: [begin, scene_1, scene_2, scene_3, scene_4],
  audio,
});
