import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import scene_1 from "./scenes/scene_1?scene";

export default makeProject({
  scenes: [begin, scene_1],
});
