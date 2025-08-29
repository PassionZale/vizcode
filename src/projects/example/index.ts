import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import code from "./scenes/code?scene";
import funny from "./scenes/funny?scene";

export default makeProject({
  scenes: [funny, example, code],
});
