import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import deepseek from "./scenes/deepseek?scene";
import llmModelNames from "./scenes/llm-model-names?scene";
import modelBrandVersion from "./scenes/model-brand-version?scene";
import modelPurposes from "./scenes/model-purposes?scene";
import modeQuantization from "./scenes/model-quantization?scene";
import modelDistillation from "./scenes/model-distillation?scene";
import modelMOE from "./scenes/model-mixture-of-experts?scene";

export default makeProject({
  scenes: [
    begin,
    deepseek,
    llmModelNames,
    modelBrandVersion,
    modelPurposes,
    modeQuantization,
    modelDistillation,
    modelMOE,
  ],
});
