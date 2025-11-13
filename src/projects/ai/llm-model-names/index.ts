import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import end from "./scenes/end?scene"

export default makeProject({
  scenes: [begin, end],
});
