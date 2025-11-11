import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import scene_2014 from "./scenes/2014?scene";
import scene_2015 from "./scenes/2015?scene";
import scene_2016_2023 from "./scenes/2016_2023?scene";
import end from "./scenes/end?scene";
import reposCamara from "./scenes/repos-camara?scene";
import audio from "./assets/audio.mp3";

export default makeProject({
  audio: audio,
  scenes: [begin, scene_2014, scene_2015, scene_2016_2023, reposCamara, end],
});
