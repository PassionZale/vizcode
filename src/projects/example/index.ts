import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import funny from "./scenes/funny?scene";
import code1 from "./scenes/code?scene";
import code2 from "./scenes/code2?scene";
import follow from "./scenes/follow?scene";

export default makeProject({
  scenes: [code1, follow, code2],
});
