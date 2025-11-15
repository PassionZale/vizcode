import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import deepseek from "./scenes/deepseek?scene";
import llmModelNames from "./scenes/llm-model-names?scene";
import nameBasic from "./scenes/name-baisc?scene";
import end from "./scenes/end?scene";

export default makeProject({
  scenes: [begin, deepseek, llmModelNames, nameBasic, end],
});
