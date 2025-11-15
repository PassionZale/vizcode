import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import deepseek from "./scenes/deepseek?scene";
import nameIntro from "./scenes/name-intro?scene";
import nameBasic from "./scenes/name-baisc?scene";
import end from "./scenes/end?scene";

export default makeProject({
  scenes: [begin, deepseek, nameIntro, nameBasic, end],
});
